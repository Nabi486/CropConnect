/**
 * Button Component
 *
 * @prop {React.ReactNode} children - Content inside the button
 * @prop {"button" | "submit" | "reset"} [type="button"] - HTML button type
 * @prop {"primary" | "secondary" | "danger" | "ghost"} [variant="primary"] - Visual style variant
 * @prop {"sm" | "md" | "lg"} [size="md"] - Size of the button
 * @prop {boolean} [disabled=false] - Disables the button
 * @prop {boolean} [loading=false] - Shows a loading spinner and disables the button
 * @prop {() => void} [onClick] - Click handler
 * @prop {string} [className] - Additional CSS classes
 */

"use client";

import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-green-600 hover:bg-green-700 text-white border border-green-600 dark:bg-green-500 dark:hover:bg-green-600",
  secondary:
    "bg-white hover:bg-gray-50 text-green-700 border border-green-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-green-400 dark:border-green-500",
  danger:
    "bg-red-600 hover:bg-red-700 text-white border border-red-600 dark:bg-red-500 dark:hover:bg-red-600",
  ghost:
    "bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent dark:hover:bg-gray-800 dark:text-gray-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5 rounded",
  md: "text-base px-4 py-2 rounded-md",
  lg: "text-lg px-6 py-3 rounded-lg",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-colors duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
