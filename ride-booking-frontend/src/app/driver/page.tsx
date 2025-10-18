"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/auth"; // ✅ if you need token later

interface Ride {
  id: number;
  pickupLocation: string;
  dropoffLocation: string;
  offeredFare: number; // ✅ match backend RideResponseDto
}

export default function DriverDashboard() {
  const [rides, setRides] = useState<Ride[]>([]);
  const driverId = 1; // 🔹 TODO: replace with actual logged-in driver ID

  // ✅ Fetch pending rides
  const fetchPendingRides = async () => {
    try {
      const res = await api.get("/rides/pending");
      setRides(res.data);
    } catch (error) {
      console.error("❌ Failed to load rides", error);
    }
  };

  useEffect(() => {
    fetchPendingRides();
  }, []);

  // ✅ Accept ride with driverId
  const acceptRide = async (rideId: number) => {
    try {
      await api.put(`/rides/accept/${rideId}?driverId=${driverId}`);
      alert("✅ Ride accepted!");
      fetchPendingRides();
    } catch (error: any) {
      console.error("❌ Failed to accept ride:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to accept ride");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚗 Pending Rides</h1>

      {rides.length === 0 ? (
        <p>No pending rides right now.</p>
      ) : (
        <div className="grid gap-4">
          {rides.map((r) => (
            <div key={r.id} className="border p-4 rounded-xl shadow">
              <p><strong>Pickup:</strong> {r.pickupLocation}</p>
              <p><strong>Dropoff:</strong> {r.dropoffLocation}</p>
              <p><strong>Fare:</strong> ${r.offeredFare}</p>
              <Button
                onClick={() => acceptRide(r.id)}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Accept Ride
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
