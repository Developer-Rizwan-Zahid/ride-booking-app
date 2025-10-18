using Microsoft.AspNetCore.SignalR;

namespace RideBooking.API.Hubs
{
    public class RideHub : Hub
    {
        // Step 1: Ride status update broadcast
        public async Task SendRideStatus(int rideId, string status)
        {
            await Clients.All.SendAsync("ReceiveRideStatus", rideId, status);
        }

        // Step 2: Driver location update broadcast
        public async Task UpdateDriverLocation(int rideId, double lat, double lng)
        {
            await Clients.All.SendAsync("ReceiveDriverLocation", rideId, lat, lng);
        }
    }
}
