using System.ComponentModel.DataAnnotations.Schema;

namespace RideBooking.API.Models
{
  public class Ride
  {
    public int Id { get; set; }

    public int RiderId { get; set; }
    public int? DriverId { get; set; }

    public string PickupLocation { get; set; } = "";
    public string DropoffLocation { get; set; } = "";

    public decimal OfferedFare { get; set; }
    public string Status { get; set; } = "Requested";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("RiderId")]
    public User? Rider { get; set; }

    [ForeignKey("DriverId")]
    public User? Driver { get; set; }
    public double? RiderRating { get; set; } 
    public double? DriverRating { get; set; }
    public string? RideFeedBack { get; set; }
  }
}
