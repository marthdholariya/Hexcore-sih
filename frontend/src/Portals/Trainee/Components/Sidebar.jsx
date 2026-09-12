import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const mainNavItems = [
    { name: "Dashboard", path: "/trainee/dashboard", icon: "📊" },
    { name: "My Profile", path: "/trainee/profile", icon: "👤" },
    { name: "Training & Certifications", path: "/trainee/training", icon: "🎓" },
    { name: "Employment & Evidence", path: "/trainee/employment", icon: "💼" },
    { name: "Follow-up Surveys", path: "/trainee/surveys", icon: "📋", badge: "" },
    { name: "Skill Passport", path: "/trainee/passport", icon: "🪪" },
  ];

  const intelligenceNavItems = [
    { name: "AI Job Matching", path: "/trainee/job-matching", icon: "🎯" },
    { name: "Smart Recommendations", path: "/trainee/recommendations", icon: "💡" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 shadow-md"
        >
          {isMobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 min-w-[16rem] max-w-[16rem] shrink-0 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center space-x-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-base shadow-sm shrink-0">
            TP
          </div>

          <div className="min-w-0">
            <h1 className="text-sm font-bold text-white tracking-wide truncate">
              Trainee Portal
            </h1>

            <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider truncate">
              Skill & Career Passport
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-xs font-medium">

          {/* Main Navigation */}
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
                  `flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white font-bold shadow-xs"
                      : "hover:bg-slate-800/80 hover:text-slate-100 text-slate-400"
                  }`
                }
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <span className="text-sm shrink-0">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </div>

                {item.badge && !item.badge.startsWith('0') && (
                  <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Intelligence Navigation */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Career Intelligence
            </p>

            {intelligenceNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white font-bold shadow-xs"
                      : "hover:bg-slate-800/80 hover:text-slate-100 text-slate-400"
                  }`
                }
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <span className="text-sm shrink-0">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Dynamic User Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/50 shrink-0 space-y-2">

          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-800 flex items-center justify-between">

            <div className="flex items-center space-x-2 min-w-0">

              <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />

              <div className="truncate">
                <p className="text-[11px] font-bold text-slate-200 truncate">
                  {user?.name || "Trainee"}
                </p>

                <p className="text-[9px] text-slate-400 truncate">
                  {user?.email || "No email"}
                </p>
              </div>

            </div>

            <span className="text-[9px] font-extrabold text-indigo-300 bg-indigo-950/80 px-1.5 py-0.5 rounded border border-indigo-800/60 shrink-0">
              {user?.account_status || "Active"}
            </span>

          </div>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-red-600/20 hover:text-red-300 text-slate-400 text-xs font-bold transition-all flex items-center justify-center space-x-2 border border-slate-700/60 cursor-pointer"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>

        </div>
      </aside>
    </>
  );
}