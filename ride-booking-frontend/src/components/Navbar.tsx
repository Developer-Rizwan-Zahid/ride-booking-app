"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ role: string } | null>(null);

  // ✅ Load user info from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setUser({ role });
    }
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Rider", href: "/rider" },
    { name: "Driver", href: "/driver" },
    { name: "History", href: "/rider/history" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          🚖 RideBooking
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`hover:text-yellow-300 ${
                pathname === item.href ? "text-yellow-300 font-semibold" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Auth Buttons */}
          {user ? (
            <>
              <span className="text-sm text-yellow-300 capitalize">
                {user.role}
              </span>
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-600 px-4 py-1 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-yellow-400 text-blue-900 px-4 py-1 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-green-400 text-white px-4 py-1 rounded-lg font-semibold hover:bg-green-500 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block py-2 ${
                pathname === item.href ? "text-yellow-300 font-semibold" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Auth Section */}
          <div className="mt-3 border-t border-blue-600 pt-3">
            {user ? (
              <>
                <p className="text-yellow-300 capitalize">{user.role}</p>
                <button
                  onClick={handleLogout}
                  className="mt-2 bg-red-600 w-full py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition text-center"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block bg-green-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-500 transition text-center mt-2"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
