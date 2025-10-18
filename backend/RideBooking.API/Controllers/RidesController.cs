using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RideBooking.API.Data;
using RideBooking.API.DTOs;
using RideBooking.API.Models;

namespace RideBooking.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RidesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RidesController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ POST: api/rides/request
        [HttpPost("request")]
        public async Task<IActionResult> RequestRide([FromBody] RideRequestDto dto)
        {
            if (dto == null)
                return BadRequest(new { message = "Invalid ride request data" });

            if (dto.RiderId <= 0)
                return BadRequest(new { message = "Invalid Rider ID" });

            if (string.IsNullOrWhiteSpace(dto.PickupLocation) ||
                string.IsNullOrWhiteSpace(dto.DropoffLocation))
                return BadRequest(new { message = "Pickup and dropoff locations are required" });

            var ride = new Ride
            {
                RiderId = dto.RiderId,
                PickupLocation = dto.PickupLocation,
                DropoffLocation = dto.DropoffLocation,
                OfferedFare = dto.OfferedFare > 0 ? dto.OfferedFare : 200,
                Status = "Requested",
                CreatedAt = DateTime.UtcNow
            };

            _context.Rides.Add(ride);
            await _context.SaveChangesAsync();

            return Ok(new { message = "✅ Ride requested successfully", ride });
        }

        // ✅ GET: api/rides/pending
        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingRides()
        {
            var rides = await _context.Rides
                .Include(r => r.Rider)
                .Where(r => r.Status == "Requested")
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return Ok(rides);
        }

        // ✅ PUT: api/rides/accept/{id}?driverId=123
        [HttpPut("accept/{id}")]
        public async Task<IActionResult> AcceptRide(int id, [FromQuery] int driverId)
        {
            if (driverId <= 0)
                return BadRequest(new { message = "Invalid Driver ID" });

            var ride = await _context.Rides.FindAsync(id);
            if (ride == null)
                return NotFound(new { message = "Ride not found" });

            if (ride.Status != "Requested")
                return BadRequest(new { message = "Ride already accepted or completed" });

            ride.DriverId = driverId;
            ride.Status = "Accepted";
            await _context.SaveChangesAsync();

            return Ok(new { message = "✅ Ride accepted successfully", ride });
        }

        // ✅ PUT: api/rides/complete/{id}
        [HttpPut("complete/{id}")]
        public async Task<IActionResult> CompleteRide(int id)
        {
            var ride = await _context.Rides.FindAsync(id);
            if (ride == null)
                return NotFound(new { message = "Ride not found" });

            ride.Status = "Completed";
            await _context.SaveChangesAsync();

            return Ok(new { message = "✅ Ride marked as completed", ride });
        }

        // ✅ POST: api/rides/rate
        [HttpPost("rate")]
        public async Task<IActionResult> RateRide([FromBody] RideRatingDto dto)
        {
            if (dto == null)
                return BadRequest(new { message = "Invalid rating data" });

            var ride = await _context.Rides.FindAsync(dto.RideId);
            if (ride == null)
                return NotFound(new { message = "Ride not found" });

            if (dto.Rating < 1 || dto.Rating > 5)
                return BadRequest(new { message = "Rating must be between 1 and 5" });

            if (dto.GivenBy?.ToLower() == "rider")
            {
                ride.RiderRating = dto.Rating;
                ride.RideFeedBack = dto.RideFeedback;
            }
            else if (dto.GivenBy?.ToLower() == "driver")
            {
                ride.DriverRating = dto.Rating;
            }
            else
            {
                return BadRequest(new { message = "Invalid 'GivenBy' value. Use 'Rider' or 'Driver'." });
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "✅ Rating saved successfully", ride });
        }

        // ✅ GET: api/rides/history/rider/{riderId}
        [HttpGet("history/rider/{riderId}")]
        public async Task<IActionResult> GetRiderHistory(int riderId)
        {
            if (riderId <= 0)
                return BadRequest(new { message = "Invalid Rider ID" });

            var rides = await _context.Rides
                .Where(r => r.RiderId == riderId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return Ok(rides);
        }

        // ✅ GET: api/rides/active/driver/{driverId}
        [HttpGet("active/driver/{driverId}")]
        public async Task<IActionResult> GetActiveRides(int driverId)
        {
            if (driverId <= 0)
                return BadRequest(new { message = "Invalid Driver ID" });

            var rides = await _context.Rides
                .Where(r => r.DriverId == driverId && r.Status == "Accepted")
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return Ok(rides);
        }

        // ✅ GET: api/rides/history/driver/{driverId}
        [HttpGet("history/driver/{driverId}")]
        public async Task<IActionResult> GetDriverHistory(int driverId)
        {
            if (driverId <= 0)
                return BadRequest(new { message = "Invalid Driver ID" });

            var rides = await _context.Rides
                .Where(r => r.DriverId == driverId && r.Status == "Completed")
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return Ok(rides);
        }
    }
}
