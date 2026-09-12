import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e2e8f0] px-6 py-4 font-sans text-xs text-[#64748b]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left Side: System Info */}
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#15803d]"></span>
          <p className="font-medium text-[#0f172a]">
            SIH 26135 Longitudinal Outcome Engine v2.4
          </p>
          <span className="text-[#cbd5e1]">|</span>
          <p className="text-[11px]">Government Analytics & Verification System</p>
        </div>

        {/* Right Side: Links & Support */}
        <div className="flex items-center space-x-4 text-[11px] font-semibold">
          <a href="#audit" className="hover:text-[#4f46e5] transition-colors">
            Audit Logs
          </a>
          <span>•</span>
          <a href="#compliance" className="hover:text-[#4f46e5] transition-colors">
            Data Security Policy
          </a>
          <span>•</span>
          <span className="text-[#4338ca] bg-[#eef2ff] px-2 py-0.5 rounded border border-[#c7d2fe] font-mono">
            MSSDS Nodal Cell
          </span>
        </div>

      </div>
    </footer>
  );
}