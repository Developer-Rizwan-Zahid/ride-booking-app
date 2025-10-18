// DTOs/RegisterRequest.cs
using System.ComponentModel.DataAnnotations;

namespace RideBooking.API.DTOs
{
    public class RegisterRequest
    {
        [Required] public string Name { get; set; } = null!;
        [Required, EmailAddress] public string Email { get; set; } = null!;
        [Required] public string Password { get; set; } = null!;
        [Required] public string Role { get; set; } = "rider"; // default role
    }
}
