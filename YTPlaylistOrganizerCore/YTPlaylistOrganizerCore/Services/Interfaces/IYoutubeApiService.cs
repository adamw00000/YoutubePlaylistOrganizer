using System.Collections.Generic;
using System.Threading.Tasks;
using YTPlaylistOrganizerCore.Models;

namespace YTPlaylistOrganizerCore.Services.Interfaces
{
    public interface IYoutubeApiService
    {
        public Task<IEnumerable<VideoData>> GetLikedVideos(string userId, string authCode, int maxResults);
    }
}