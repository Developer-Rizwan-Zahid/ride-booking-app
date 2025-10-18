using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RideBooking.API.Data;

namespace RideBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Get all users
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // ✅ Get all rides
        [HttpGet("rides")]
        public async Task<IActionResult> GetAllRides()
        {
            var rides = await _context.Rides
                .Include(r => r.Rider)
                .Include(r => r.Driver)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return Ok(rides);
        }

        // ✅ Basic stats
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var totalUsers = await _context.Users.CountAsync();
            var totalRides = await _context.Rides.CountAsync();
            var completedRides = await _context.Rides.CountAsync(r => r.Status == "Completed");
            var activeRides = await _context.Rides.CountAsync(r => r.Status == "Accepted");

            return Ok(new
            {
                totalUsers,
                totalRides,
                completedRides,
                activeRides
            });
        }
    }
}
