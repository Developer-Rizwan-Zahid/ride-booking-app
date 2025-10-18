// Models/User.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace RideBooking.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = null!;

        [Required, MaxLength(150)]
        public string Email { get; set; } = null!;

        [Required]
        public string PasswordHash { get; set; } = null!;

        [Required, MaxLength(20)]
        public string Role { get; set; } = "rider"; // rider, driver, admin

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
