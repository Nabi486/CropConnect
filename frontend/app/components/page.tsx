"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button, Input, Modal, Loader, ToastContainer } from "../../components/ui";
import type { ToastItem } from "../../components/ui";

let toastCounter = 0;

export default function ComponentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [loading, setLoading] = useState(false);

  const addToast = (type: ToastItem["type"], message: string) => {
    const id = `toast-${++toastCounter}`;
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleInputCheck = () => {
    if (!inputValue.trim()) {
      setInputError("This field cannot be empty.");
    } else {
      setInputError("");
      addToast("success", `Saved: "${inputValue}"`);
    }
  };

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast("info", "Data loaded successfully!");
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🧩 UI Component Library
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-10">
            Week 3 — Smart Farm Hub Component Showcase
          </p>

          {/* BUTTON */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Button</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Variants: primary, secondary, danger, ghost. Sizes: sm, md, lg.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button loading>Loading…</Button>
              <Button disabled>Disabled</Button>
            </div>
          </section>

          {/* INPUT */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Input</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Supports labels, hints, error states, and required marking.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                id="farm-name"
                label="Farm Name"
                placeholder="e.g. Green Acres"
                hint="This will appear on your public profile."
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); setInputError(""); }}
                error={inputError}
                required
              />
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="farmer@example.com"
              />
              <Input
                id="disabled-input"
                label="Location (disabled)"
                placeholder="Auto-detected"
                disabled
              />
              <Input
                id="error-input"
                label="Field Code"
                placeholder="FIELD-001"
                error="Invalid field code format."
              />
            </div>
            <div className="mt-4">
              <Button onClick={handleInputCheck}>Validate Input</Button>
            </div>
          </section>

          {/* MODAL */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Modal</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Press Escape or click outside to close.
            </p>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>

            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Confirm Irrigation Schedule"
            >
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                You are about to schedule irrigation for <strong>Field B</strong> at 06:00 AM tomorrow. 
                This will use approximately 120 litres of water.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button onClick={() => { setModalOpen(false); addToast("success", "Irrigation scheduled!"); }}>
                  Confirm
                </Button>
              </div>
            </Modal>
          </section>

          {/* TOAST */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Toast</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Notifications appear top-right and auto-dismiss after 3s.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => addToast("success", "Crop data saved successfully.")}>
                Success Toast
              </Button>
              <Button variant="danger" onClick={() => addToast("error", "Failed to connect to sensor.")}>
                Error Toast
              </Button>
              <Button variant="secondary" onClick={() => addToast("warning", "Soil pH is outside optimal range.")}>
                Warning Toast
              </Button>
              <Button variant="ghost" onClick={() => addToast("info", "AI analysis in progress...")}>
                Info Toast
              </Button>
            </div>
          </section>

          {/* LOADER */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Loader</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Three variants: spinner, dots, bar. Three sizes: sm, md, lg.
            </p>
            <div className="grid grid-cols-3 gap-8 mb-6">
              <div className="flex flex-col items-center gap-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Spinner</p>
                <Loader variant="spinner" size="sm" />
                <Loader variant="spinner" size="md" />
                <Loader variant="spinner" size="lg" label="Loading data…" />
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Dots</p>
                <Loader variant="dots" size="sm" />
                <Loader variant="dots" size="md" />
                <Loader variant="dots" size="lg" label="Processing…" />
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Bar</p>
                <Loader variant="bar" size="sm" />
                <Loader variant="bar" size="md" />
                <Loader variant="bar" size="lg" label="Uploading…" />
              </div>
            </div>
            <Button onClick={simulateLoading} loading={loading}>
              {loading ? "Loading…" : "Simulate Full-Page Loader"}
            </Button>
            {loading && <Loader fullPage label="Fetching sensor data…" size="lg" />}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
