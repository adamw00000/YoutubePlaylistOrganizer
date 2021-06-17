using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Requests;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Util;
using Google.Apis.YouTube.v3;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using YTPlaylistOrganizerCore.Data;
using YTPlaylistOrganizerCore.Services.Interfaces;

namespace YTPlaylistOrganizerCore.Services
{
    public class GoogleAuthService: IGoogleAuthService
    {
        private readonly GoogleClientSecrets _secrets;
        private readonly IDataProtector _protector;
        private readonly ApplicationDbContext _context;

        private const string TokenServerUrl = "https://oauth2.googleapis.com/token";

        public GoogleAuthService(IDataProtectionProvider provider, ApplicationDbContext context)
        {
            _context = context;
            _protector = provider.CreateProtector(GetType().FullName!);
            
            using var reader = new FileStream("client_secret.json", FileMode.Open);
            _secrets = GoogleClientSecrets.Load(reader);
        }

        private async Task<UserData> GetUserData(string userId)
        {
            var userData = await _context.UserGoogleAuthData
                .Where(u => u.UserId == userId)
                .FirstOrDefaultAsync();
            return userData;
        }
        
        public async Task<string> GetUserAccessToken(string userId, string authCode)
        {
            var userData = await GetUserData(userId);

            if (userData != null && authCode == userData.AuthCode)
            {
                if (userData.AccessTokenExpirationDate.AddMinutes(-1) < DateTime.UtcNow)
                {
                    return await RefreshAccessToken(userId);
                }
                
                return _protector.Unprotect(userData.AccessToken);
            }
            
            var tokenResponse = await RequestTokenFromAuthCode(authCode);

            Debug.Assert(tokenResponse.ExpiresInSeconds != null, "tokenResponse.ExpiresInSeconds != null");
            
            var expirationDate = tokenResponse.IssuedUtc.AddSeconds(tokenResponse.ExpiresInSeconds.Value);
            var encryptedAccessToken = _protector.Protect(tokenResponse.AccessToken);
            var encryptedRefreshToken = _protector.Protect(tokenResponse.RefreshToken);
            await UpdateUserCredentials(userData, userId, authCode, encryptedAccessToken, 
                encryptedRefreshToken, expirationDate);

            return tokenResponse.AccessToken;
        }

        private async Task UpdateUserCredentials(UserData userData, string userId, string authCode,
            string encryptedAccessToken, string encryptedRefreshToken, DateTime expirationDate)
        {
            if (userData == null)
            {
                await _context.UserGoogleAuthData.AddAsync(new UserData()
                {
                    UserId = userId,
                    AuthCode = authCode,
                    AccessToken = encryptedAccessToken,
                    AccessTokenExpirationDate = expirationDate,
                    RefreshToken = encryptedRefreshToken,
                });
            }
            else
            {
                userData.AuthCode = authCode;
                userData.AccessToken = encryptedAccessToken;
                userData.AccessTokenExpirationDate = expirationDate;
                userData.RefreshToken = encryptedRefreshToken;

                _context.Update(userData);
            }

            await _context.SaveChangesAsync();
        }

        private async Task<TokenResponse> RequestTokenFromAuthCode(string authCode)
        {
            var tokenRequest = new AuthorizationCodeTokenRequest
            {
                Code = authCode,
                Scope = YouTubeService.Scope.Youtube,
                ClientId = _secrets.Secrets.ClientId,
                ClientSecret = _secrets.Secrets.ClientSecret,
                RedirectUri = "postmessage",
            };

            var tokenResponse = await tokenRequest.ExecuteAsync(new HttpClient(),
                TokenServerUrl,
                CancellationToken.None,
                SystemClock.Default);
            return tokenResponse;
        }

        private async Task<string> RefreshAccessToken(string userId)
        {
            var userData = await GetUserData(userId);
            if (userData == null)
            {
                return null;
            }

            var refreshResponse = await SendRefreshRequest(userData);

            Debug.Assert(refreshResponse.ExpiresInSeconds != null, "refreshResponse.ExpiresInSeconds != null");
            
            var expirationDate = refreshResponse.IssuedUtc.AddSeconds(refreshResponse.ExpiresInSeconds.Value);
            var encryptedAccessToken = _protector.Protect(refreshResponse.AccessToken);
            await UpdateUserCredentials(userData, userId, userData.AuthCode,
                encryptedAccessToken, userData.RefreshToken, expirationDate);
            
            return refreshResponse.AccessToken;
        }

        private async Task<TokenResponse> SendRefreshRequest(UserData userData)
        {
            var refreshRequest = new RefreshTokenRequest()
            {
                Scope = YouTubeService.Scope.Youtube,
                ClientId = _secrets.Secrets.ClientId,
                ClientSecret = _secrets.Secrets.ClientSecret,
                RefreshToken = _protector.Unprotect(userData.RefreshToken),
            };

            var refreshResponse = await refreshRequest.ExecuteAsync(new HttpClient(),
                TokenServerUrl,
                CancellationToken.None,
                SystemClock.Default);
            return refreshResponse;
        }
    }
}