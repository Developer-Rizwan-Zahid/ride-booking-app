"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";

interface Ride {
  id: number;
  pickup: string;
  dropoff: string;
  fare: number;
  status: string;
}

export default function RideHistory() {
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await API.get("/rides/history");
      setRides(res.data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">📖 Ride History</h1>
      <div className="bg-white shadow-md rounded-xl p-4 max-w-3xl">
        {rides.length === 0 ? (
          <p className="text-gray-500">No completed rides yet.</p>
        ) : (
          <ul>
            {rides.map((ride) => (
              <li
                key={ride.id}
                className="border-b last:border-none py-3 flex justify-between"
              >
                <div>
                  <p className="font-medium">
                    {ride.pickup} → {ride.dropoff}
                  </p>
                  <p className="text-sm text-gray-500">Status: {ride.status}</p>
                </div>
                <p className="font-semibold text-green-600">Rs {ride.fare}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
