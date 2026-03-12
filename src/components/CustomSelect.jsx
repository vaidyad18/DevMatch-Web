import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const CustomSelect = ({
  value,
  options,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  submitted,
  icon: Icon,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { value: option } });
    setIsOpen(false);
  };

  const isError = submitted && error;

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-400">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-11 rounded-md border text-left px-10 flex items-center justify-between transition-all duration-200 bg-[#0d0d0d]/70 text-gray-200 focus:outline-none focus:ring-1 focus:ring-[hsl(var(--brand-end))] ${
            isError ? "border-red-500" : "border-gray-800 hover:border-gray-700"
          }`}
        >
          <span className={!value ? "text-gray-500" : ""}>
            {value || placeholder} 
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        )}

        {isOpen && (
          <div className="absolute z-[100] mt-1 w-full rounded-md border border-gray-800 bg-[#0c0c0c] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors hover:bg-white/5 ${
                    value === option ? "text-[hsl(var(--brand-end))] bg-white/5" : "text-gray-300"
                  }`}
                >
                  {option}
                  {value === option && (
                    <Check className="h-4 w-4 text-[hsl(var(--brand-end))]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {isError && (
        <p className="text-red-500 text-[10px] mt-1 ml-1">{error}</p>
      )}
    </div>
  );
};

export default CustomSelect;
