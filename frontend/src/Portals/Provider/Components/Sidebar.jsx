import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { logout } = useAuth();
    const navigate = useNavigate();
      const handleSignOut = () => {
    logout(); 
    navigate("/login", { replace: true }); 
  };
  // 1. Primary Operational Features
  const mainNavItems = [
    { name: 'Dashboard', path: '/provider/dashboard', icon: '📊' },
    { name: 'Training & Certification', path: '/provider/training', icon: '🎓', badge: 'Active' },
    { name: 'Skill Gap Analytics', path: '/provider/skill-gaps', icon: '🔍' },
    { name: 'Non-Placement and Attrition Analysis', path: '/provider/non-placement', icon: '📉' },
  ];

  // 2. Intelligence & Effectiveness Engine
  const intelligenceNavItems = [
    { name: 'Training Effectiveness Score', path: '/provider/effectiveness', icon: '⭐' },
    { name: 'Job Market Intelligence', path: '/provider/JobMarketIntelligence', icon: '📈' },
    { name: 'Smart Recommendation', path: '/provider/SmartRecommendation', icon: '💡', badge: 'New' },
  ];

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 shadow-md focus:outline-none"
        >
          {isMobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Backdrop for Mobile Drawer */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* ================= HEADER ================= */}
        <div className="p-5 border-b border-slate-800 flex items-center space-x-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-base shadow-sm">
            TP
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">Training Provider</h1>
            <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
              Outcome & Skill Portal
            </p>
          </div>
        </div>

        {/* NAVIGATION LINKS CONTAINER */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-xs font-medium">
          
          {/* Section 1: Main Features */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Management & Operations
            </p>
            {mainNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-start justify-between px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-bold shadow-xs'
                      : 'hover:bg-slate-800/80 hover:text-slate-100 text-slate-400'
                  }`
                }
              >
                <div className="flex items-start space-x-2.5 min-w-0 flex-1">
                  <span className="text-sm shrink-0 mt-0.5">{item.icon}</span>
                  <span className="leading-tight break-words text-xs">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0 ml-2">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Section 2: Intelligence & Analytics */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Intelligence & Performance
            </p>
            {intelligenceNavItems.map((item) => (
<NavLink
  key={item.path}
  to={item.path}
  onClick={() => setIsMobileOpen(false)}
  className={({ isActive }) =>
    `flex items-start justify-between px-3 py-2.5 rounded-xl transition-all ${
      isActive
        ? 'bg-indigo-600 text-white font-bold shadow-xs'
        : 'hover:bg-slate-800/80 hover:text-slate-100 text-slate-400'
    }`
  }
>
  <div className="flex items-start space-x-2.5 min-w-0 flex-1">
    <span className="text-sm shrink-0 mt-0.5">{item.icon}</span>
    {/* Key Change: Changed truncate to leading-tight break-words */}
    <span className="leading-tight break-words text-xs">{item.name}</span>
  </div>
  {item.badge && (
    <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded-md bg-indigo-950 text-indigo-300 border border-indigo-700/60 shrink-0 ml-2">
      {item.badge}
    </span>
  )}
</NavLink>
            ))}
          </div>

        </div>

        {/* ================= FOOTER ================= */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/50 shrink-0 space-y-3">
          
          {/* Organization Badge */}
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-hidden">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></div>
              <div className="truncate">
                <p className="text-[11px] font-bold text-slate-200 truncate">National Skill Inst.</p>
                <p className="text-[9px] text-slate-400 truncate">ID: PRV-MH-2026</p>
              </div>
            </div>
            <span className="text-[9px] font-extrabold text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 shrink-0">
              Verified
            </span>
          </div>

          {/* Quick Logout Button */}
          <button
            onClick={handleSignOut}
            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-red-600/20 hover:text-red-300 text-slate-400 text-xs font-bold transition-all flex items-center justify-center space-x-2 border border-slate-700/60"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>

      </aside>
    </>
  );
}