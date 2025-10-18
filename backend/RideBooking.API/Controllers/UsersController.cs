// Controllers/UsersController.cs
using Microsoft.AspNetCore.Mvc;
using RideBooking.API.Data;
using RideBooking.API.Models;

namespace RideBooking.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_context.Users.ToList());
        }

        [HttpPost]
        public IActionResult CreateUser([FromBody] User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(user);
        }
    }
}
