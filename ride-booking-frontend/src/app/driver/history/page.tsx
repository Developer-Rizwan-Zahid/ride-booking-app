"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Ride {
  id: number;
  pickupLocation: string;
  dropoffLocation: string;
  offeredFare: number;
  status: string;
}

export default function RideHistory() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [driverId, setDriverId] = useState<string | null>(null);

  // ✅ Get driverId from localStorage safely (client-side only)
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setDriverId(storedId);
  }, []);

  // ✅ Fetch rides after driverId is available
  useEffect(() => {
    if (!driverId) return;
    fetchHistory();
  }, [driverId]);

  const fetchHistory = async () => {
    try {
      const res = await api.get(`/rides/history/driver/${driverId}`);
      setRides(res.data);
    } catch (error) {
      console.error("❌ Failed to load ride history", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📜 Ride History</h1>

      {rides.length === 0 ? (
        <p>No completed rides found.</p>
      ) : (
        <div className="grid gap-4">
          {rides.map((r) => (
            <div key={r.id} className="border p-4 rounded-xl shadow">
              <p><strong>Pickup:</strong> {r.pickupLocation}</p>
              <p><strong>Dropoff:</strong> {r.dropoffLocation}</p>
              <p><strong>Fare:</strong> ${r.offeredFare}</p>
              <p><strong>Status:</strong> {r.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
