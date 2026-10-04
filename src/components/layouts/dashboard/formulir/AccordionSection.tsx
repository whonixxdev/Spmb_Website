import React, { useState } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";

interface AccordionSectionProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  buttonLabel: string;
  onButtonClick: () => void;
}

export default function AccordionSection({
  icon: Icon,
  title,
  subtitle,
  description,
  buttonLabel,
  onButtonClick,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-100/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-[#204382] rounded-lg">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">{title}</h3>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="p-4 border-t border-gray-100 space-y-4 bg-white animate-in slide-in-from-top-2 duration-200">
          <div className="text-xs text-gray-600 space-y-2 leading-relaxed">
            {description}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onButtonClick}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#204382] hover:bg-[#183363] rounded-lg transition-colors shadow-sm"
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}