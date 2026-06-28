"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="
        w-9 h-9 rounded-full flex items-center justify-center
        bg-white/20 hover:bg-white/30 transition-colors
        text-white text-lg
      "
      aria-label="Toggle dark/light mode"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
