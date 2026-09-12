"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Underline-only field. No boxes, no radius — the field is a hairline that
 * brightens to brass on focus. Labels float above as eyebrow text.
 */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generated = React.useId();
    const fieldId = id ?? generated;
    const errorId = `${fieldId}-error`;

    return (
      <div className="group relative w-full">
        {label && (
          <label
            htmlFor={fieldId}
            className="eyebrow mb-3 block text-bone-500 transition-colors duration-500 group-focus-within:text-brass-400"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full border-b bg-transparent pb-3 text-[0.9375rem] text-bone-100",
            "transition-colors duration-500 outline-none",
            "placeholder:text-bone-600",
            error
              ? "border-red-500/60"
              : "border-hairline focus:border-brass-400 hover:border-hairline-strong",
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-2.5 text-[0.75rem] text-red-400/90" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generated = React.useId();
    const fieldId = id ?? generated;
    const errorId = `${fieldId}-error`;

    return (
      <div className="group relative w-full">
        {label && (
          <label
            htmlFor={fieldId}
            className="eyebrow mb-3 block text-bone-500 transition-colors duration-500 group-focus-within:text-brass-400"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full resize-none border-b bg-transparent pb-3 text-[0.9375rem] text-bone-100",
            "transition-colors duration-500 outline-none",
            "placeholder:text-bone-600",
            error
              ? "border-red-500/60"
              : "border-hairline focus:border-brass-400 hover:border-hairline-strong",
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-2.5 text-[0.75rem] text-red-400/90" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

/**
 * Native select, restyled. Deliberately native rather than a Radix listbox —
 * on mobile the OS picker is a better experience than anything custom.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, children, ...props }, ref) => {
    const generated = React.useId();
    const fieldId = id ?? generated;

    return (
      <div className="group relative w-full">
        {label && (
          <label
            htmlFor={fieldId}
            className="eyebrow mb-3 block text-bone-500 transition-colors duration-500 group-focus-within:text-brass-400"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={fieldId}
            className={cn(
              "w-full cursor-pointer appearance-none border-b border-hairline bg-transparent",
              "pb-3 pr-8 text-[0.9375rem] text-bone-100 outline-none",
              "transition-colors duration-500 hover:border-hairline-strong focus:border-brass-400",
              "[&>option]:bg-obsidian-850 [&>option]:text-bone-100",
              className
            )}
            {...props}
          >
            {children}
          </select>
          {/* Custom caret — a hairline chevron, not a system triangle */}
          <svg
            className="pointer-events-none absolute right-1 bottom-4 size-3 text-bone-500"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        {error && (
          <p className="mt-2.5 text-[0.75rem] text-red-400/90" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
