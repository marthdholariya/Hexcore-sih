import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white px-6 py-4 text-slate-500 text-xs font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: System Branding & Copyright */}
        <div className="flex items-center space-x-2">

          
          <p className="text-[11px] font-medium text-slate-500">
            Training Provider Longitudinal Outcome System
          </p>
        </div>


      </div>
    </footer>
  );
}