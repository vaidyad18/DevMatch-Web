import React, { useEffect, useRef, useState } from "react";
import { Paintbrush, Check } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const swatchMap = {
  peach: ["hsl(20 95% 60%)", "hsl(330 85% 65%)"],
  ocean: ["hsl(200 90% 55%)", "hsl(240 70% 60%)"],
  forest: ["hsl(145 60% 45%)", "hsl(170 65% 45%)"],
  midnight: ["hsl(220 60% 35%)", "hsl(260 70% 45%)"],
  dracula: ["hsl(280 70% 55%)", "hsl(330 80% 65%)"],
  cyberdark: ["hsl(160 95% 45%)", "hsl(210 95% 55%)"],
};

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);
  const visibleThemes = (themes || []).filter((k) => swatchMap[k]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Theme Panel */}
        {open && (
          <div
            ref={panelRef}
            id="theme-switcher-panel"
            role="dialog"
            aria-label="Theme switcher"
            className="
              absolute right-0 w-64 rounded-2xl border border-white/10
              bg-[#0b0b0b]/75 backdrop-blur-2xl shadow-[0_0_25px_rgba(0,0,0,0.4)]
              p-4 animate-in fade-in slide-in-from-bottom-2
            "
            style={{
              bottom: "calc(100% + 10px)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Paintbrush className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-semibold text-white">Theme</span>
              </div>
              <span className="text-xs text-gray-400">
                {visibleThemes.length} options
              </span>
            </div>

            <div
              role="radiogroup"
              aria-label="Available themes"
              className="grid grid-cols-2 gap-3 max-h-56 overflow-visible pr-2 pt-1 pb-1"
            >
              {visibleThemes.map((key) => {
                const [c1, c2] = swatchMap[key] ?? [
                  "hsl(var(--brand-start))",
                  "hsl(var(--brand-end))",
                ];
                const active = key === theme;

                return (
                  <button
                    key={key}
                    role="radio"
                    aria-checked={active}
                    onClick={() => setTheme(key)}
                    title={key}
                    className={[
                      "relative group rounded-xl border px-3 py-2 text-xs capitalize transition-all duration-200",
                      "border-white/10 hover:border-[hsl(var(--brand-end))]/40",
                      active
                        ? "ring-2 ring-[hsl(var(--brand-end))] ring-offset-[3px] ring-offset-[#0b0b0b] z-10 animate-pulse-slow"
                        : "hover:ring-1 hover:ring-[hsl(var(--brand-end))]/20",
                    ].join(" ")}
                  >
                    <div
                      className="h-8 w-full rounded-lg mb-1 transition-all shadow-inner"
                      style={{
                        background: `linear-gradient(90deg, ${c1}, ${c2})`,
                      }}
                    />
                    <span className="block text-gray-200 text-center">
                      {key}
                    </span>

                    {active && (
                      <Check className="absolute top-1 right-1 h-4 w-4 text-white drop-shadow" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Floating Button (FAB) */}
        <button
          ref={btnRef}
          onClick={() => setOpen((v) => !v)}
          className="
            inline-flex items-center justify-center rounded-full
            h-12 w-12 text-white shadow-lg transition-all
            hover:scale-105 active:scale-95 focus:outline-none
            focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]
            focus-visible:ring-offset-2 focus-visible:ring-offset-black
          "
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--brand-start)), hsl(var(--brand-end)))",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
          }}
          aria-label="Open theme switcher"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls="theme-switcher-panel"
        >
          <Paintbrush className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
