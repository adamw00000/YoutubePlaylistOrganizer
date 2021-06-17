using System;
using System.ComponentModel.DataAnnotations;

namespace YTPlaylistOrganizerCore.Data
{
    public class UserData
    {
        [Key]
        public string UserId { get; set; }
        
        [Required]
        public string AuthCode { get; set; }
        
        [Required]
        public string AccessToken { get; set; }
        
        [Required]
        public DateTime AccessTokenExpirationDate { get; set; }
        
        [Required]
        public string RefreshToken { get; set; }
    }
}