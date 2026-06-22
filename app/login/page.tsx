import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Login() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <p>This is the Login page.</p>
      </main>

      <Footer />
    </>
  );
}