import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const stats = [
  { label: "Soil Moisture", value: "72%", icon: "💧", trend: "+3%", good: true },
  { label: "Temperature", value: "28°C", icon: "🌡️", trend: "+1°C", good: true },
  { label: "Crop Health", value: "Healthy", icon: "🌿", trend: "Stable", good: true },
  { label: "AI Alerts", value: "2", icon: "🤖", trend: "Action needed", good: false },
];

const crops = [
  { name: "Wheat", field: "Field A", stage: "Flowering", health: 92, lastWatered: "2h ago" },
  { name: "Rice", field: "Field B", stage: "Seedling", health: 78, lastWatered: "5h ago" },
  { name: "Corn", field: "Field C", stage: "Harvesting", health: 95, lastWatered: "1h ago" },
  { name: "Tomatoes", field: "Greenhouse", stage: "Fruiting", health: 85, lastWatered: "3h ago" },
];

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Farm overview — Monday, 23 June 2026</p>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-medium px-3 py-1.5 rounded-full w-fit">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              All systems operational
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{s.icon}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    s.good
                      ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>{s.trend}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Crop Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Crop Monitor</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    {["Crop", "Field", "Stage", "Health", "Last Watered"].map(h => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                  {crops.map((crop) => (
                    <tr key={crop.name} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{crop.name}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{crop.field}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">{crop.stage}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 w-20">
                            <div
                              className="h-1.5 rounded-full bg-green-500"
                              style={{ width: `${crop.health}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{crop.health}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{crop.lastWatered}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Insight Banner */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 dark:from-green-800 dark:to-emerald-900 rounded-xl p-6 text-white">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🤖</span>
              <div>
                <h3 className="font-semibold text-lg mb-1">AI Recommendation</h3>
                <p className="text-green-100 text-sm leading-relaxed">
                  Field B moisture levels are below optimal. Consider irrigation in the next 6 hours.
                  Weather forecast shows no rain for 48 hours. Estimated water needed: 120L.
                </p>
                <button className="mt-3 bg-white text-green-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
                  Schedule Irrigation →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
