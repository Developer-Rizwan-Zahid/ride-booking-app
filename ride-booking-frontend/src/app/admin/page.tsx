"use client";

import { useEffect, useState } from "react";
import { fetchAdminUsers, fetchAdminRides, fetchAdminStats } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [rides, setRides] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      setError("No token found. Please login as admin.");
      setLoading(false);
      return;
    }

    async function loadData() {
      try {
        const [usersRes, ridesRes, statsRes] = await Promise.all([
          fetchAdminUsers(token),
          fetchAdminRides(token),
          fetchAdminStats(token),
        ]);
        setUsers(usersRes);
        setRides(ridesRes);
        setStats(statsRes);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch admin data. Check console or backend.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [token]);

  if (loading) return <p className="p-6 text-gray-500">Loading data...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-white bg-green-700 p-5">Admin Dashboard</h1>

      {/* Stats Section */}
      {stats && (
        <div className="bg-blue-50 border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">📊 Stats</h2>
          <p>Total Users: {stats.totalUsers}</p>
          <p>Total Rides: {stats.totalRides}</p>
          <p>Completed Rides: {stats.completedRides}</p>
        </div>
      )}

      {/* Users Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">👥 Users</h2>
        <div className="bg-black text-white  shadow p-4 rounded-lg max-h-60 overflow-y-auto">
          {users.length > 0 ? (
            users.map((u) => (
              <div key={u.id} className="border-b py-1">
                <span className="font-medium">{u.name}</span> — {u.email}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No users found.</p>
          )}
        </div>
      </div>

      {/* Rides Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">🚗 Rides</h2>
        <div className="bg-white shadow p-4 rounded-lg max-h-60 overflow-y-auto">
          {rides.length > 0 ? (
            rides.map((r) => (
              <div key={r.id} className="border-b py-1">
                <span>{r.pickup} → {r.dropoff}</span> |{" "}
                <span className="text-sm text-gray-600">Status: {r.status}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No rides found.</p>
          )}
        </div>
      </div>

      <Button onClick={() => window.location.reload()}>🔄 Refresh</Button>
    </div>
  );
}
