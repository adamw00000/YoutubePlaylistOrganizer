using System.Collections.Generic;
using System.Threading.Tasks;
using YTPlaylistOrganizerCore.Models;

namespace YTPlaylistOrganizerCore.Services.Interfaces
{
    public interface IYoutubeApiService
    {
        public Task<IEnumerable<VideoDto>> GetLikedVideos(string userId, string authCode, int maxResults);
        public Task<IEnumerable<PlaylistDto>> Playlists(string userId, string authCode);
    }
}