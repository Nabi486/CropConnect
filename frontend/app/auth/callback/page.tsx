"use client";
// app/auth/callback/page.tsx
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      // Decode user info from JWT (basic decode, not verify)
      const payload = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem("sfh_token", token);
      // Fetch user details
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem("sfh_user", JSON.stringify(data.user));
          }
          router.push("/dashboard");
        })
        .catch(() => router.push("/login"));
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center">
        <div className="text-4xl mb-4">🌱</div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">Completing login…</p>
      </div>
    </div>
  );
}
