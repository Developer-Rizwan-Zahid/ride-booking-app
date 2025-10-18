using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using RideBooking.API.Hubs;

namespace RideBooking.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly IHubContext<RideHub> _hub;
        public TestController(IHubContext<RideHub> hub)
        {
            _hub = hub;
        }

        [HttpGet("update")]
        public async Task<IActionResult> UpdateRide()
        {
            await _hub.Clients.All.SendAsync("ReceiveRideStatus", 1, "In Progress");
            await _hub.Clients.All.SendAsync("ReceiveDriverLocation", 1, 31.5204, 74.3587); // Lahore location
            return Ok("Ride updates sent!");
        }
    }
}
