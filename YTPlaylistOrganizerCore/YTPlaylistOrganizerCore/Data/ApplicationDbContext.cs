using Microsoft.EntityFrameworkCore;
using YTPlaylistOrganizerCore.Models;

namespace YTPlaylistOrganizerCore.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }
        
        public DbSet<UserData> UserGoogleAuthData { get; set; }
    }
}