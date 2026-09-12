import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between font-sans">
      
      {/* Left: Portal Title / Active Workspace Context */}
      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-black text-xs border border-indigo-100">
          TP
        </div>
        <div>
          <h2 className="text-xs font-bold text-slate-900 tracking-tight">
            Training & Outcome Management Portal
          </h2>
          <p className="text-[10px] text-slate-500 font-medium">
            National Vocational & Skill Development Framework
          </p>
        </div>
      </div>

      {/* Right: Actions, Notifications & Profile Badge */}
      
    </header>
  );
}