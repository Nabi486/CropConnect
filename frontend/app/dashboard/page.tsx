"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Loader } from "../../components/ui";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Crop {
  id: string;
  name: string;
  field: string;
  stage: string;
  health: number;
  soilMoisture: number;
  temperature: number;
  lastWatered: string;
}

interface Alert {
  id: string;
  type: string;
  message: string;
  resolved: boolean;
}

export default function Dashboard() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cropsRes, alertsRes] = await Promise.all([
          fetch(`${API_URL}/api/crops`),
          fetch(`${API_URL}/api/alerts`),
        ]);
        const cropsJson = await cropsRes.json();
        const alertsJson = await alertsRes.json();
        setCrops(cropsJson.data);
        setAlerts(alertsJson.data.filter((a: Alert) => !a.resolved));
      } catch (err) {
        setError("Could not connect to backend. Make sure the server is running on port 5000.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const avgMoisture = crops.length
    ? Math.round(crops.reduce((s, c) => s + c.soilMoisture, 0) / crops.length)
    : 0;
  const avgTemp = crops.length
    ? Math.round(crops.reduce((s, c) => s + c.temperature, 0) / crops.length)
    : 0;

  const stats = [
    { label: "Avg Soil Moisture", value: `${avgMoisture}%`, icon: "💧", good: true },
    { label: "Avg Temperature", value: `${avgTemp}°C`, icon: "🌡️", good: true },
    { label: "Total Crops", value: String(crops.length), icon: "🌿", good: true },
    { label: "Active Alerts", value: String(alerts.length), icon: "🤖", good: alerts.length === 0 },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">

          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Live data from backend API
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-medium px-3 py-1.5 rounded-full w-fit">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              {loading ? "Connecting…" : error ? "Backend offline" : "API connected"}
            </span>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl p-4 text-sm">
              ⚠️ {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader variant="spinner" size="lg" label="Loading farm data…" />
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                      <span className="text-2xl">{s.icon}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.good ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                        {s.good ? "Good" : "Alert"}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{s.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Crop Table */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Crop Monitor <span className="text-sm font-normal text-gray-400">— from GET /api/crops</span>
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                      <tr>
                        {["Crop", "Field", "Stage", "Health", "Moisture", "Temp"].map((h) => (
                          <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                      {crops.map((crop) => (
                        <tr key={crop.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{crop.name}</td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{crop.field}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">{crop.stage}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 w-16">
                                <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${crop.health}%` }} />
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">{crop.health}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{crop.soilMoisture}%</td>
                          <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{crop.temperature}°C</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Alerts */}
              {alerts.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Active Alerts <span className="text-sm font-normal text-gray-400">— from GET /api/alerts</span>
                  </h2>
                  <div className="flex flex-col gap-2">
                    {alerts.map((a) => (
                      <div key={a.id} className="flex items-start gap-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-sm text-yellow-800 dark:text-yellow-200">
                        <span>⚠️</span>
                        <span>{a.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Banner */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 dark:from-green-800 dark:to-emerald-900 rounded-xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🤖</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">AI Recommendation</h3>
                    <p className="text-green-100 text-sm leading-relaxed">
                      Based on current sensor readings, Field B moisture levels are below optimal.
                      Consider irrigation in the next 6 hours. No rain forecast for 48 hours.
                    </p>
                    <a href="/ai" className="mt-3 inline-block bg-white text-green-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
                      Ask AI Advisor →
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
