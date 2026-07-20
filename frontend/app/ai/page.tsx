"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button, Input, Loader } from "../../components/ui";

const suggestions = [
  "Why is my wheat crop yellowing?",
  "Best time to irrigate tomatoes in summer?",
  "How to improve soil nitrogen naturally?",
];

interface Message {
  role: "user" | "ai";
  text: string;
}

const mockResponses: Record<string, string> = {
  default:
    "Based on current sensor readings from your farm, I recommend monitoring soil moisture levels closely over the next 48 hours. Temperature and humidity suggest moderate irrigation would be beneficial for optimal crop growth.",
};

export default function AIPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = (text?: string) => {
    const q = text ?? query;
    if (!q.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setQuery("");
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: mockResponses.default },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-5xl">🤖</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-3 mb-2">
              AI Farm Advisor
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Ask anything about your crops, soil, weather, or farm management.
            </p>
          </div>

          {/* Suggestions */}
          {messages.length === 0 && (
            <div className="flex flex-col gap-2 mb-6">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                >
                  💬 {s}
                </button>
              ))}
            </div>
          )}

          {/* Chat */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm min-h-[200px] p-4 mb-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-green-600 text-white rounded-br-sm"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-sm px-4 py-3">
                  <Loader variant="dots" size="sm" />
                </div>
              </div>
            )}
            {messages.length === 0 && !loading && (
              <p className="text-center text-gray-400 dark:text-gray-600 text-sm my-auto">
                Your conversation will appear here.
              </p>
            )}
          </div>

          {/* Input Row */}
          <div className="flex gap-2">
            <Input
              placeholder="Ask the AI advisor…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => handleSend()} disabled={loading}>
              Send
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
