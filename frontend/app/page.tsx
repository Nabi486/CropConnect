import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  const cards = [
    {
      title: "Smart Farming",
      description: "Modern farming technologies.",
    },
    {
      title: "IoT Monitoring",
      description: "Monitor crops and soil conditions.",
    },
    {
      title: "Analytics",
      description: "View farming data insights.",
    },
  ];

  return (
    <>
      <Navbar />
      <Hero />

      <main className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}