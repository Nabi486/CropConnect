/**
 * Toast Component
 *
 * A lightweight notification that appears at the top-right of the screen.
 * Use ToastContainer to manage multiple toasts.
 *
 * @prop {string} id - Unique identifier for this toast
 * @prop {string} message - Text content of the notification
 * @prop {"success" | "error" | "warning" | "info"} [type="info"] - Visual type/style
 * @prop {number} [duration=3000] - Auto-dismiss delay in milliseconds (0 = no auto-dismiss)
 * @prop {(id: string) => void} onDismiss - Called with the toast id when it should be removed
 */

"use client";

import React, { useEffect } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onDismiss: (id: string) => void;
}

const typeStyles: Record<ToastType, { container: string; icon: string }> = {
  success: {
    container:
      "bg-green-50 border-green-400 text-green-800 dark:bg-green-900/40 dark:border-green-500 dark:text-green-200",
    icon: "✓",
  },
  error: {
    container:
      "bg-red-50 border-red-400 text-red-800 dark:bg-red-900/40 dark:border-red-500 dark:text-red-200",
    icon: "✕",
  },
  warning: {
    container:
      "bg-yellow-50 border-yellow-400 text-yellow-800 dark:bg-yellow-900/40 dark:border-yellow-500 dark:text-yellow-200",
    icon: "⚠",
  },
  info: {
    container:
      "bg-blue-50 border-blue-400 text-blue-800 dark:bg-blue-900/40 dark:border-blue-500 dark:text-blue-200",
    icon: "ℹ",
  },
};

export function Toast({
  id,
  message,
  type = "info",
  duration = 3000,
  onDismiss,
}: ToastProps) {
  useEffect(() => {
    if (duration === 0) return;
    const timer = setTimeout(() => onDismiss(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  const styles = typeStyles[type];

  return (
    <div
      role="alert"
      className={`
        flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg
        min-w-[260px] max-w-sm text-sm font-medium
        ${styles.container}
      `}
    >
      <span className="text-base leading-tight">{styles.icon}</span>
      <span className="flex-1">{message}</span>
      <button
        onClick={() => onDismiss(id)}
        className="opacity-60 hover:opacity-100 transition-opacity ml-1 text-base leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

/**
 * ToastContainer
 *
 * Renders a stack of Toast notifications in the top-right corner.
 *
 * @prop {ToastItem[]} toasts - Array of toast objects to display
 * @prop {(id: string) => void} onDismiss - Callback to remove a toast by id
 */
export interface ToastItem {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

export default Toast;
