import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-4">About</h1>
        <p>This is the About page for Smart Farm Hub.</p>
      </main>

      <Footer />
    </>
  );
}