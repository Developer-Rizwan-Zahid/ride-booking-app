namespace RideBooking.API.DTOs
{
    public class RideRequestDto
    {
        public int RiderId { get; set; }
        public string PickupLocation { get; set; } = "";
        public string DropoffLocation { get; set; } = "";
        public decimal OfferedFare { get; set; }
    }

    public class RideResponseDto
    {
        public int Id { get; set; }
        public string RiderName { get; set; } = "";
        public string PickupLocation { get; set; } = "";
        public string DropoffLocation { get; set; } = "";
        public decimal OfferedFare { get; set; }
        public string Status { get; set; } = "";
    }
}
