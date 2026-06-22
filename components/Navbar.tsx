import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="font-bold text-xl">
          Smart Farm Hub
        </h1>

        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}