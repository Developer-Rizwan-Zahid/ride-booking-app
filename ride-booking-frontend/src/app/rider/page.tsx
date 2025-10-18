"use client";
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import API from "@/lib/api";
import { getToken } from "@/lib/auth";

interface Ride {
  id: number;
  pickupLocation: string;
  dropoffLocation: string;
  status: string;
  driverName?: string;
}

export default function RiderPage() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rides, setRides] = useState<Ride[]>([]);
  const [hubConnection, setHubConnection] = useState<signalR.HubConnection | null>(null);

  // ✅ Connect to SignalR Hub
  useEffect(() => {
    const token = getToken();
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_SIGNALR_URL}?access_token=${token}`)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log("✅ Connected to RideHub"))
      .catch((err) => console.error("❌ SignalR connection error:", err));

    connection.on("RideStatusUpdated", (updatedRide: Ride) => {
      setRides((prev) =>
        prev.map((r) => (r.id === updatedRide.id ? updatedRide : r))
      );
    });

    setHubConnection(connection);
    return () => {
      connection.stop();
    };
  }, []);

  // ✅ Fetch Rider’s ride history
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const riderId = user.id || 1; // fallback if user not found
        const res = await API.get(`/rides/history/rider/${riderId}`);
        setRides(res.data);
      } catch (err) {
        console.error("❌ Error fetching rides:", err);
      }
    };
    fetchRides();
  }, []);

  // ✅ Request a new ride
  const requestRide = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const riderId = user.id || 1;

      const res = await API.post("/rides/request", {
        riderId,
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        offeredFare: 200, // default fare, optional
      });

      console.log("✅ Ride requested:", res.data);
      setRides([res.data, ...rides]);
      setPickup("");
      setDropoff("");
    } catch (err) {
      console.error("❌ Error requesting ride:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">🚗 Rider Dashboard</h1>

      {/* New Ride Request */}
      <form
        onSubmit={requestRide}
        className="bg-white shadow-md rounded-xl p-6 mb-8 max-w-lg mx-auto"
      >
        <h2 className="text-lg font-semibold mb-4">Request a Ride</h2>
        <input
          type="text"
          placeholder="Pickup Location"
          className="border p-2 rounded w-full mb-3"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dropoff Location"
          className="border p-2 rounded w-full mb-3"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Request Ride
        </button>
      </form>

      {/* My Rides List */}
      <div  className="bg-white shadow-md rounded-xl p-6 mb-8 max-w-lg mx-auto">
        <h2 className="text-lg font-semibold mb-3">My Rides</h2>
        {rides.length === 0 ? (
          <p className="text-gray-500">No rides yet.</p>
        ) : (
          <ul>
            {rides.map((ride) => (
              <li
                key={ride.id}
                className="border-b last:border-none py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {ride.pickupLocation} → {ride.dropoffLocation}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: {ride.status}
                    {ride.driverName && ` (Driver: ${ride.driverName})`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
