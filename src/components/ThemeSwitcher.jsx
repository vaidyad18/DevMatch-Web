import React, { useState } from "react";
import { Paintbrush, Check, ChevronUp } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const swatchMap = {
  peach:  ["hsl(20 95% 60%)", "hsl(330 85% 65%)"],
  ocean:  ["hsl(200 90% 55%)", "hsl(240 70% 60%)"],
  forest: ["hsl(145 60% 45%)", "hsl(170 65% 45%)"],
  grape:  ["hsl(270 85% 60%)", "hsl(300 70% 60%)"],
  sunset: ["hsl(12 90% 60%)", "hsl(40 90% 55%)"],
  mono:   ["hsl(222 47% 11%)", "hsl(215 20% 30%)"],
};

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Panel */}
      {open && (
        <div className="mb-2 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-lg p-3 w-56">
          <div className="flex items-center gap-2 mb-2">
            <Paintbrush className="h-4 w-4 text-[var(--text-secondary)]" />
            <span className="text-sm font-semibold text-[var(--text-primary)]">Theme</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {themes.map((key) => {
              const [c1, c2] = swatchMap[key];
              const active = key === theme;
              return (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`relative rounded-lg border border-[var(--border)] p-2 text-xs capitalize transition hover:opacity-90
                              ${active ? "ring-2 ring-offset-2 ring-[var(--brand-from)] ring-offset-[var(--card)]" : ""}`}
                >
                  <div
                    className="h-6 w-full rounded-md mb-1"
                    style={{ background: `linear-gradient(90deg, ${c1}, ${c2})` }}
                  />
                  {key}
                  {active && (
                    <Check className="absolute top-1 right-1 h-4 w-4 text-[var(--text-primary)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full h-11 px-4 text-sm font-medium text-white
                   shadow-md transition hover:opacity-90"
        style={{ background: "linear-gradient(90deg, var(--brand-from), var(--brand-to))" }}
        aria-label="Open theme switcher"
      >
        <Paintbrush className="h-4 w-4" />
        Theme
        <ChevronUp className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
