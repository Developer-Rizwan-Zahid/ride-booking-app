// Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using RideBooking.API.Models;

namespace RideBooking.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Ride> Rides { get; set; }
    }
}
