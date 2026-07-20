"use client";
// app/ai/page.tsx
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const suggestions = [
  "Why is my wheat crop yellowing at the tips?",
  "How much water does rice need in seedling stage?",
  "How do I improve soil nitrogen naturally?",
  "When should I harvest corn at 95% health?",
  "What pesticide is safe for tomatoes fruiting stage?",
];

interface Message {
  role: "user" | "ai";
  text: string;
  time: string;
}

type TabType = "chat" | "analyse" | "irrigation";

export default function AIPage() {
  const [activeTab, setActiveTab] = useState<TabType>("chat");

  // Chat state
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");

  // Analyse state
  const [analyseResult, setAnalyseResult] = useState("");
  const [analyseLoading, setAnalyseLoading] = useState(false);
  const [analyseError, setAnalyseError] = useState("");

  // Irrigation state
  const [irrigForm, setIrrigForm] = useState({
    cropName: "", soilMoisture: "65", temperature: "28", stage: "Seedling", weather: "Clear"
  });
  const [irrigResult, setIrrigResult] = useState("");
  const [irrigLoading, setIrrigLoading] = useState(false);
  const [irrigError, setIrrigError] = useState("");

  const getToken = () => localStorage.getItem("sfh_token") || "";

  const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // ── Chat ──────────────────────────────────────────
  const handleChat = async (q?: string) => {
    const text = q ?? question;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text, time: now() }]);
    setQuestion("");
    setChatLoading(true);
    setChatError("");

    try {
      const res = await fetch(`${API}/api/ai/crop-advice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ question: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "AI service error");
      setMessages((prev) => [...prev, { role: "ai", text: data.answer, time: now() }]);
    } catch (err: any) {
      setChatError(err.message || "Failed to get AI response. Please try again.");
    } finally {
      setChatLoading(false);
    }
  };

  // ── Analyse Farm ──────────────────────────────────
  const handleAnalyse = async () => {
    setAnalyseLoading(true);
    setAnalyseError("");
    setAnalyseResult("");

    try {
      // Fetch crops first
      const cropsRes = await fetch(`${API}/api/crops`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const cropsData = await cropsRes.json();

      const res = await fetch(`${API}/api/ai/analyse-farm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ crops: cropsData.data || [] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Analysis failed");
      setAnalyseResult(data.analysis);
    } catch (err: any) {
      setAnalyseError(err.message || "Failed to analyse farm.");
    } finally {
      setAnalyseLoading(false);
    }
  };

  // ── Irrigation ────────────────────────────────────
  const handleIrrigation = async () => {
    if (!irrigForm.cropName) { setIrrigError("Please enter a crop name."); return; }
    setIrrigLoading(true);
    setIrrigError("");
    setIrrigResult("");

    try {
      const res = await fetch(`${API}/api/ai/irrigation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(irrigForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      setIrrigResult(data.schedule);
    } catch (err: any) {
      setIrrigError(err.message || "Failed to generate schedule.");
    } finally {
      setIrrigLoading(false);
    }
  };

  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: "chat", label: "Ask AI", icon: "💬" },
    { key: "analyse", label: "Farm Analysis", icon: "📊" },
    { key: "irrigation", label: "Irrigation", icon: "💧" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-5xl">🤖</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-3 mb-2">
              AI Farm Advisor
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Powered by Claude AI — ask anything about your crops
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-white dark:bg-gray-800 rounded-xl p-1.5 border border-gray-100 dark:border-gray-700">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === t.key
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* ── Tab: Chat ── */}
          {activeTab === "chat" && (
            <div>
              {/* Suggestions */}
              {messages.length === 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Try asking:</p>
                  <div className="flex flex-col gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleChat(s)}
                        className="text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                      >
                        💬 {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat messages */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 min-h-[280px] p-4 mb-3 flex flex-col gap-3">
                {messages.length === 0 && !chatLoading && (
                  <p className="text-center text-gray-400 dark:text-gray-600 text-sm my-auto pt-10">
                    Your conversation will appear here.
                  </p>
                )}

                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] ${m.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-green-600 text-white rounded-br-sm"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm"
                      }`}>
                        {m.text}
                      </div>
                      <span className="text-xs text-gray-400">{m.time}</span>
                    </div>
                  </div>
                ))}

                {/* Loading state */}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="h-2 w-2 bg-green-500 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">AI is thinking…</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Error */}
              {chatError && (
                <div className="mb-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg px-4 py-3 text-sm">
                  ⚠️ {chatError}
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask the AI advisor about your crops…"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleChat()}
                  disabled={chatLoading}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                />
                <button
                  onClick={() => handleChat()}
                  disabled={chatLoading || !question.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {/* ── Tab: Farm Analysis ── */}
          {activeTab === "analyse" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                📊 AI Farm Health Analysis
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Click the button below to let AI analyse all your crops and give recommendations.
              </p>

              <button
                onClick={handleAnalyse}
                disabled={analyseLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {analyseLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analysing your farm…
                  </>
                ) : (
                  "🔍 Analyse My Farm"
                )}
              </button>

              {analyseError && (
                <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg px-4 py-3 text-sm">
                  ⚠️ {analyseError}
                </div>
              )}

              {analyseResult && (
                <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🤖</span>
                    <span className="font-semibold text-green-800 dark:text-green-300 text-sm">AI Analysis Result</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {analyseResult}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── Tab: Irrigation ── */}
          {activeTab === "irrigation" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                💧 AI Irrigation Planner
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Enter crop details to get a 3-day irrigation schedule.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                {[
                  { label: "Crop Name", key: "cropName", placeholder: "e.g. Wheat" },
                  { label: "Growth Stage", key: "stage", placeholder: "e.g. Flowering", isSelect: true },
                  { label: "Soil Moisture (%)", key: "soilMoisture", placeholder: "0-100" },
                  { label: "Temperature (°C)", key: "temperature", placeholder: "e.g. 28" },
                  { label: "Weather", key: "weather", placeholder: "Clear / Cloudy / Rainy" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {f.label}
                    </label>
                    {f.isSelect ? (
                      <select
                        value={irrigForm[f.key as keyof typeof irrigForm]}
                        onChange={(e) => setIrrigForm({ ...irrigForm, [f.key]: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        {["Seedling", "Vegetative", "Flowering", "Fruiting", "Ripening", "Harvesting"].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        value={irrigForm[f.key as keyof typeof irrigForm]}
                        onChange={(e) => setIrrigForm({ ...irrigForm, [f.key]: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleIrrigation}
                disabled={irrigLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {irrigLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating schedule…
                  </>
                ) : (
                  "💧 Generate Irrigation Schedule"
                )}
              </button>

              {irrigError && (
                <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-300 rounded-lg px-4 py-3 text-sm">
                  ⚠️ {irrigError}
                </div>
              )}

              {irrigResult && (
                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">💧</span>
                    <span className="font-semibold text-blue-800 dark:text-blue-300 text-sm">3-Day Irrigation Schedule</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {irrigResult}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
