using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Util;
using Google.Apis.YouTube.v3;
using YTPlaylistOrganizerCore.Models;
using YTPlaylistOrganizerCore.Services.Interfaces;

namespace YTPlaylistOrganizerCore.Services
{
    public class YoutubeApiService: IYoutubeApiService
    {
        private readonly IGoogleAuthService _googleAuthService;

        public YoutubeApiService(IGoogleAuthService googleAuthService)
        {
            _googleAuthService = googleAuthService;
        }
        
        private async Task<YouTubeService> GetApiInstance(string userId, string authCode)
        {
            var accessToken = await _googleAuthService.GetUserAccessToken(userId, authCode);
            var cred = GoogleCredential.FromAccessToken(accessToken);

            var service = new YouTubeService(new BaseClientService.Initializer
            {
                HttpClientInitializer = cred
            });
            return service;
        }
        
        public async Task<IEnumerable<VideoData>> GetLikedVideos(string userId, string authCode, int maxResults)
        {
            var service = await GetApiInstance(userId, authCode);
            
            var videos = new List<VideoData>();

            var nextPageToken = "";
            while (nextPageToken != null)
            {
                var videoRequest =
                    service.Videos.List(new Repeatable<string>(new List<string> {"snippet", "contentDetails"}));
                videoRequest.MyRating = VideosResource.ListRequest.MyRatingEnum.Like;
                // videoRequest.MaxResults = 10;
                videoRequest.MaxResults = maxResults;
                videoRequest.PageToken = nextPageToken;

                var videoResponse = await videoRequest.ExecuteAsync();

                videos.AddRange(videoResponse.Items.Select(video =>
                    new VideoData
                    {
                        Name = video.Snippet.Title, ImageUrl = video.Snippet.Thumbnails.Default__.Url, Id = video.Id
                    }
                ));

                nextPageToken = videoResponse.NextPageToken;
                break;
            }

            return videos;
        }
    }
}