/**
 * Loader Component
 *
 * A flexible loading indicator that can be displayed inline or as a full-page overlay.
 *
 * @prop {"spinner" | "dots" | "bar"} [variant="spinner"] - The animation style
 * @prop {"sm" | "md" | "lg"} [size="md"] - Size of the loader
 * @prop {string} [label] - Accessible text label (also shown below spinner for lg size)
 * @prop {boolean} [fullPage=false] - If true, renders as a centered full-page overlay
 * @prop {string} [className] - Additional CSS classes for the wrapper
 */

"use client";

import React from "react";

type LoaderVariant = "spinner" | "dots" | "bar";
type LoaderSize = "sm" | "md" | "lg";

interface LoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  label?: string;
  fullPage?: boolean;
  className?: string;
}

const spinnerSizes: Record<LoaderSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-4",
  lg: "h-14 w-14 border-4",
};

function Spinner({ size }: { size: LoaderSize }) {
  return (
    <div
      className={`
        rounded-full border-green-200 border-t-green-600
        animate-spin
        ${spinnerSizes[size]}
      `}
    />
  );
}

function Dots({ size }: { size: LoaderSize }) {
  const dotSize =
    size === "sm" ? "h-2 w-2" : size === "md" ? "h-3 w-3" : "h-4 w-4";
  return (
    <div className="flex gap-1.5 items-center">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`rounded-full bg-green-600 animate-bounce ${dotSize}`}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function Bar({ size }: { size: LoaderSize }) {
  const height =
    size === "sm" ? "h-1" : size === "md" ? "h-1.5" : "h-2";
  const width =
    size === "sm" ? "w-24" : size === "md" ? "w-40" : "w-64";
  return (
    <div
      className={`${width} ${height} rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden`}
    >
      <div
        className="h-full bg-green-600 rounded-full animate-[loader-bar_1.4s_ease-in-out_infinite]"
        style={{ width: "40%" }}
      />
    </div>
  );
}

export default function Loader({
  variant = "spinner",
  size = "md",
  label,
  fullPage = false,
  className = "",
}: LoaderProps) {
  const inner = (
    <div
      className={`flex flex-col items-center gap-3 ${className}`}
      role="status"
      aria-label={label ?? "Loading"}
    >
      {variant === "spinner" && <Spinner size={size} />}
      {variant === "dots" && <Dots size={size} />}
      {variant === "bar" && <Bar size={size} />}
      {label && size === "lg" && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
        {inner}
      </div>
    );
  }

  return inner;
}
