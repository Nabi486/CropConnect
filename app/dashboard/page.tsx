import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p>This is the Dashboard page.</p>
      </main>

      <Footer />
    </>
  );
}