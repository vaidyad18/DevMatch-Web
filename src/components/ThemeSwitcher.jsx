import React, { useEffect, useRef, useState } from "react";
import { Paintbrush, Check } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

/** KEEP swatchMap in sync with ThemeContext `themes` list */
const swatchMap = {
  peach:     ["hsl(20 95% 60%)", "hsl(330 85% 65%)"],
  ocean:     ["hsl(200 90% 55%)", "hsl(240 70% 60%)"],
  forest:    ["hsl(145 60% 45%)", "hsl(170 65% 45%)"],
  midnight:  ["hsl(220 60% 35%)", "hsl(260 70% 45%)"],
  dracula:   ["hsl(280 70% 55%)", "hsl(330 80% 65%)"],
  cyberdark: ["hsl(160 95% 45%)", "hsl(210 95% 55%)"],
};

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  // Only show themes that have swatches
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
    <div className="fixed bottom-5 right-5 z-50">
      {/* ⬇️ Make this wrapper relative so the panel can be absolutely positioned */}
      <div className="relative">
        {/* Panel (absolutely positioned so it doesn't push the FAB) */}
        {open && (
          <div
            ref={panelRef}
            id="theme-switcher-panel"
            role="dialog"
            aria-label="Theme switcher"
            className="
              absolute right-0 w-64 rounded-xl border border-[var(--border)]
              bg-[var(--card)] shadow-xl p-3 animate-in fade-in slide-in-from-bottom-2
            "
            style={{
              // position the panel just above the FAB with 8px gap
              bottom: "calc(100% + 8px)",
              // ensure no accidental blur/alpha affects readability
              backdropFilter: "none",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Paintbrush className="h-4 w-4 text-[var(--muted-foreground)]" />
                <span className="text-sm font-semibold text-[var(--foreground)]">
                  Theme
                </span>
              </div>
              <span className="text-xs text-[var(--muted-foreground)]">
                {visibleThemes.length} options
              </span>
            </div>

            <div
              role="radiogroup"
              aria-label="Available themes"
              className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-auto pr-1"
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
                      "relative group rounded-lg border p-2 text-xs capitalize transition",
                      "border-[var(--border)] hover:border-[hsl(var(--brand-end))]/50",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card)]",
                      active
                        ? "ring-2 ring-[hsl(var(--brand-end))] ring-offset-2 ring-offset-[var(--card)]"
                        : "",
                    ].join(" ")}
                  >
                    <div
                      className="h-8 w-full rounded-md mb-1 transition-all"
                      style={{
                        background: `linear-gradient(90deg, ${c1}, ${c2})`,
                      }}
                    />
                    <span className="block truncate text-[var(--foreground)]">
                      {key}
                    </span>

                    {active && (
                      <Check
                        className="absolute top-1 right-1 h-4 w-4 text-[var(--foreground)] drop-shadow"
                        aria-hidden="true"
                      />
                    )}

                    {/* subtle hover ring */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-lg ring-0 ring-[hsl(var(--brand-end))]/0 group-hover:ring-1 group-hover:ring-[hsl(var(--brand-end))]/30 transition"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* FAB */}
        <button
          ref={btnRef}
          onClick={() => setOpen((v) => !v)}
          className="
            inline-flex items-center gap-2 rounded-full h-11 px-4
            text-sm font-medium text-white shadow-md transition
            hover:opacity-95 focus:outline-none
            focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]
            focus-visible:ring-offset-2 focus-visible:ring-offset-background
          "
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--brand-start)), hsl(var(--brand-end)))",
          }}
          aria-label="Open theme switcher"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls="theme-switcher-panel"
        >
          <Paintbrush className="h-4 w-4" />
          {/* keep label if you ever want: <span>Theme</span> */}
        </button>
      </div>
    </div>
  );
}
