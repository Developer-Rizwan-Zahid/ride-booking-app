// Controllers/HealthController.cs

using Microsoft.AspNetCore.Mvc;

namespace RideBooking.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetHealthStatus()
        {
            return Ok(new
            {
                status = "Backend is running ✅",
                version = "1.0.0",
                time = DateTime.Now
            });
        }
    }
}
