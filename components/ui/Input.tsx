/**
 * Input Component
 *
 * @prop {string} [id] - HTML id attribute, links to label
 * @prop {string} [label] - Label text displayed above the input
 * @prop {string} [type="text"] - HTML input type (text, email, password, number, etc.)
 * @prop {string} [placeholder] - Placeholder text
 * @prop {string} [value] - Controlled value
 * @prop {(e: React.ChangeEvent<HTMLInputElement>) => void} [onChange] - Change handler
 * @prop {string} [error] - Error message shown below the input
 * @prop {string} [hint] - Helper text shown below the input (when no error)
 * @prop {boolean} [disabled=false] - Disables the input
 * @prop {boolean} [required=false] - Marks the input as required
 * @prop {string} [className] - Additional CSS classes for the wrapper div
 */

"use client";

import React from "react";

interface InputProps {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function Input({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  hint,
  disabled = false,
  required = false,
  className = "",
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          w-full px-3 py-2 rounded-md border text-sm
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            error
              ? "border-red-500 focus:ring-red-400 focus:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          }
        `}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {!error && hint && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>
      )}
    </div>
  );
}
