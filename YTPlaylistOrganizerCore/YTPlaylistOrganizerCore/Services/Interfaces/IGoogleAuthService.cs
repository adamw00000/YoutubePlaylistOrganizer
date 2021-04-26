using System.Threading.Tasks;

namespace YTPlaylistOrganizerCore.Services.Interfaces
{
    public interface IGoogleAuthService
    {
        Task<string> GetUserAccessToken(string userId, string authCode);
    }
}