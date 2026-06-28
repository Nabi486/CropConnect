import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="bg-green-700 dark:bg-green-900 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">🌱 Smart Farm Hub</h1>

        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-green-200 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-green-200 transition-colors">About</Link>
          <Link href="/dashboard" className="hover:text-green-200 transition-colors">Dashboard</Link>
          <Link href="/login" className="hover:text-green-200 transition-colors">Login</Link>
          <Link href="/components" className="hover:text-green-200 transition-colors font-semibold">UI Kit</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
