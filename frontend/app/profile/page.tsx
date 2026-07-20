"use client";
// app/profile/page.tsx
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../components/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            My Profile
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            {/* Avatar Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-8 text-center">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-white"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto text-3xl font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <h2 className="text-xl font-bold text-white mt-3">{user?.name}</h2>
              <span className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full mt-1 capitalize">
                {user?.role}
              </span>
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="grid gap-4">
                {[
                  { label: "Full Name", value: user?.name },
                  { label: "Email Address", value: user?.email },
                  { label: "Role", value: user?.role },
                  { label: "Account ID", value: user?.id },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-700 last:border-0">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</span>
                    <span className="text-sm text-gray-900 dark:text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={logout}
                className="mt-6 w-full bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-semibold py-2.5 rounded-lg transition-colors border border-red-200 dark:border-red-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  );
}
