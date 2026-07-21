"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "../lib/utils";

const COLLAPSED_SIZE = 40;

export default function ExpandableSearchBar({ expandDirection = "right", placeholder = "Search...", onSearch, className = "", defaultOpen = false, width = 280 }) {
  const [open, setOpen] = useState(defaultOpen);
  const [value, setValue] = useState("");

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const inputPadding = expandDirection === "right" ? "pl-11" : "pl-10";

  const placeholderLeft = expandDirection === "right" ? "left-11" : "left-10";

  useEffect(() => {
    function onDocClick(e) {
      if (!containerRef.current?.contains(e.target) && open && value === "") {
        setOpen(false);
        setValue("");
      }
    }

    document.addEventListener("mousedown", onDocClick);

    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open, value]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(id);
    } else {
      setValue("");
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        setValue("");
      }

      if (e.key === "Enter" && open && value.trim()) {
        onSearch?.(value);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, value, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative text-[#90A1B9] inline-block", className)}
      style={{
        width: COLLAPSED_SIZE,
        height: COLLAPSED_SIZE,
      }}
    >
      <button
        type="button"
        aria-label={open ? "Close search" : "Open search"}
        onClick={() => setOpen((s) => !s)}
        className={cn(
          "absolute inset-0 z-20 grid  place-items-center rounded-full border",
          " text-foreground/80 hover:text-foreground transition-colors",
          "dark:bg-secondary dark:text-foreground/80 dark:hover:text-foreground",
        )}
      >
        {open ? <X className="size-4" /> : <Search className="size-4" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className={cn("absolute top-0 h-10 rounded-full border text-foreground shadow-sm overflow-hidden flex items-center z-10", expandDirection === "left" ? "right-0" : "left-0")}
            initial={{
              width: COLLAPSED_SIZE,
              opacity: 0.98,
            }}
            animate={{
              width: width,
              opacity: 1,
            }}
            exit={{
              width: COLLAPSED_SIZE,
              opacity: 0,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 26,
              },
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 26,
            }}
          >
            <span className="absolute left-3 z-10 text-muted-foreground">
              <Search className="size-4" />
            </span>

            <div className="relative flex-1  min-w-0 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className={cn("w-full bg-transparent  text-sm outline-none placeholder-transparent whitespace-nowrap overflow-x-auto", inputPadding)}
              />

              <AnimatePresence>
                {open && !value && (
                  <motion.span
                    key="ph"
                    className={cn("pointer-events-none absolute top-1/2 -translate-y-1/2 w-full truncate text-muted-foreground/80 text-sm select-none text-left", placeholderLeft)}
                    initial={{
                      opacity: 1,
                      x: 0,
                    }}
                    animate={{
                      opacity: 0.9,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: 8,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    {placeholder}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
