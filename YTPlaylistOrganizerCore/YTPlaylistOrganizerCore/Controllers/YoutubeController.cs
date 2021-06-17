using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using YTPlaylistOrganizerCore.Models;
using YTPlaylistOrganizerCore.Services.Interfaces;

namespace YTPlaylistOrganizerCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class YoutubeController: ControllerBase
    {
        private readonly ILogger<YoutubeController> _logger;
        private readonly IYoutubeApiService _youtubeApiService;

        public YoutubeController(ILogger<YoutubeController> logger, IYoutubeApiService youtubeApiService)
        {
            _logger = logger;
            _youtubeApiService = youtubeApiService;
        }
        
        [HttpGet("LikedVideos")]
        public async Task<IEnumerable<VideoDto>> LikedVideos(string userId, string authCode, int maxResults)
        {
            return await _youtubeApiService.GetLikedVideos(userId, authCode, maxResults);
        }
        
        [HttpGet("Playlists")]
        public async Task<IEnumerable<PlaylistDto>> Playlists(string userId, string authCode)
        {
            return await _youtubeApiService.Playlists(userId, authCode);
        }
    }
}