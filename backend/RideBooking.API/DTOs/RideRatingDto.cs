namespace RideBooking.API.DTOs
{
    public class RideRatingDto
    {
        public int RideId { get; set; }
        public double Rating { get; set; }
        public string RideFeedback { get; set; } = "";
        public string GivenBy { get; set; } = "Rider";
    }
}