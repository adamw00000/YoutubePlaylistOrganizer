using Microsoft.EntityFrameworkCore;
using YTPlaylistOrganizerCore.Models;

namespace YTPlaylistOrganizerCore
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }
        
        public DbSet<UserData> UserGoogleAuthData { get; set; }
    }
}