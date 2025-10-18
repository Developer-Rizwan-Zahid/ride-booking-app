"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

interface Ride {
  id: number;
  pickupLocation: string;
  dropoffLocation: string;
  offeredFare: number;
  status: string;
}

export default function ActiveRides() {
  const [activeRides, setActiveRides] = useState<Ride[]>([]);
  const [completedRides, setCompletedRides] = useState<Ride[]>([]);
  const [driverId, setDriverId] = useState<string | null>(null);

  // ✅ Get driverId from localStorage (client-side only)
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setDriverId(storedId);
  }, []);

  // ✅ Fetch rides after driverId is loaded
  useEffect(() => {
    if (!driverId) return;
    fetchActiveRides();
    fetchCompletedRides();
  }, [driverId]);

  const fetchActiveRides = async () => {
    try {
      const res = await api.get(`/rides/active/driver/${driverId}`);
      setActiveRides(res.data);
    } catch (error) {
      console.error("❌ Failed to load active rides", error);
    }
  };

  const fetchCompletedRides = async () => {
    try {
      const res = await api.get(`/rides/history/driver/${driverId}`);
      setCompletedRides(res.data);
    } catch (error) {
      console.error("❌ Failed to load completed rides", error);
    }
  };

  const completeRide = async (rideId: number) => {
    try {
      await api.put(`/rides/complete/${rideId}`);
      alert("✅ Ride completed!");
      fetchActiveRides();
      fetchCompletedRides();
    } catch (error) {
      console.error("❌ Failed to complete ride", error);
    }
  };

  return (
    <div className="p-6 space-y-10">
      {/* ✅ Active Rides */}
      <div>
        <h1 className="text-2xl font-bold mb-4">🟢 Active Rides</h1>
        {activeRides.length === 0 ? (
          <p>No active rides found.</p>
        ) : (
          <div className="grid gap-4">
            {activeRides.map((r) => (
              <div key={r.id} className="border p-4 rounded-xl shadow">
                <p><strong>Pickup:</strong> {r.pickupLocation}</p>
                <p><strong>Dropoff:</strong> {r.dropoffLocation}</p>
                <p><strong>Status:</strong> {r.status}</p>
                <p><strong>Fare:</strong> ${r.offeredFare}</p>
                {r.status !== "Completed" && (
                  <Button
                    onClick={() => completeRide(r.id)}
                    className="mt-2 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Complete Ride
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Completed Rides */}
      <div>
        <h1 className="text-2xl font-bold mb-4">🔵 Completed Rides</h1>
        {completedRides.length === 0 ? (
          <p>No completed rides found.</p>
        ) : (
          <div className="grid gap-4">
            {completedRides.map((r) => (
              <div key={r.id} className="border p-4 rounded-xl shadow bg-gray-50">
                <p><strong>Pickup:</strong> {r.pickupLocation}</p>
                <p><strong>Dropoff:</strong> {r.dropoffLocation}</p>
                <p><strong>Status:</strong> {r.status}</p>
                <p><strong>Fare:</strong> ${r.offeredFare}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
