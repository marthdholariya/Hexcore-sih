import React, { useState } from 'react';

// Mock Provider Dashboard Data
const DASHBOARD_SUMMARY = {
  activeBatches: 12,
  enrolledTrainees: 450,
  certifiedThisQuarter: 320,
  averagePlacementRate: "78.5%",
  effectivenessScore: "8.4 / 10",
};

const BATCH_PERFORMANCE = [
  { id: "BAT-2026-01", course: "Web Development & IT Support", enrolled: 45, certified: 42, placementRate: "84%", status: "Completed" },
  { id: "BAT-2026-02", course: "CNC Machine Operation", enrolled: 38, certified: 35, placementRate: "72%", status: "In Assessment" },
  { id: "BAT-2026-03", course: "Solar PV Installation", enrolled: 50, certified: 0, placementRate: "N/A", status: "In Training" },
  { id: "BAT-2026-04", course: "Data Entry & Office Admin", enrolled: 40, certified: 38, placementRate: "65%", status: "Completed" },
];

export default function Dashboard() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* 1. Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-800/50">
            Training Provider Command Center
          </span>
          <h1 className="text-xl font-bold mt-2">National Skill Institute Overview</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time outcome monitoring, certification tracking, and batch performance.
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <button 
            onClick={() => alert("Downloading Training Analytics Summary...")}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            📥 Export Outcome Report
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Active Trainees</p>
          <div className="flex justify-between items-baseline mt-1">
            <span className="text-2xl font-black text-slate-900">{DASHBOARD_SUMMARY.enrolledTrainees}</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+12% vs last Qtr</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{DASHBOARD_SUMMARY.activeBatches} Running Batches</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Certifications Issued</p>
          <div className="flex justify-between items-baseline mt-1">
            <span className="text-2xl font-black text-slate-900">{DASHBOARD_SUMMARY.certifiedThisQuarter}</span>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">91% Pass Rate</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Verified via Skill Passport</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Placement Outcome Rate</p>
          <div className="flex justify-between items-baseline mt-1">
            <span className="text-2xl font-black text-emerald-600">{DASHBOARD_SUMMARY.averagePlacementRate}</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Target: 70%</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Tracked at 3, 6 & 12 Months</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Training Effectiveness</p>
          <div className="flex justify-between items-baseline mt-1">
            <span className="text-2xl font-black text-indigo-600">{DASHBOARD_SUMMARY.effectivenessScore}</span>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Grade A</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Government Evaluated Score</p>
        </div>
      </div>

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Batch Outcomes & Training Status */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Active Batches & Completion Status</h2>
              <p className="text-[11px] text-slate-500">Live monitoring of course progress and assessment status</p>
            </div>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="text-xs bg-slate-100 border-none rounded-lg px-2.5 py-1.5 font-semibold text-slate-700"
            >
              <option value="All">All Batches</option>
              <option value="Completed">Completed</option>
              <option value="In Training">In Training</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  <th className="pb-2">Batch ID</th>
                  <th className="pb-2">Course Name</th>
                  <th className="pb-2 text-center">Enrolled</th>
                  <th className="pb-2 text-center">Certified</th>
                  <th className="pb-2 text-center">Placement</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {BATCH_PERFORMANCE
                  .filter(b => filter === "All" || b.status === filter)
                  .map((batch) => (
                    <tr key={batch.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 font-mono text-slate-500">{batch.id}</td>
                      <td className="py-3 font-bold text-slate-800">{batch.course}</td>
                      <td className="py-3 text-center">{batch.enrolled}</td>
                      <td className="py-3 text-center text-indigo-600 font-bold">{batch.certified}</td>
                      <td className="py-3 text-center text-emerald-600 font-bold">{batch.placementRate}</td>
                      <td className="py-3 text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          batch.status === 'Completed' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : batch.status === 'In Assessment'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}>
                          {batch.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Verification & Outcome Summary */}
        <div className="space-y-6">
          
          {/* Outcome Verification Summary Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>🛡️</span> Verification Status
              </h2>
              <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                88% Verified
              </span>
            </div>
            
            <p className="text-[11px] text-slate-600 leading-relaxed">
              88% of employment claims submitted by your graduates have been verified by employers or backed by valid employment evidence.
            </p>

            <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-1">
              <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider">Verification Pipeline</p>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Verified Claims:</span>
                <span className="text-emerald-700 font-bold">281 / 320</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Pending Review:</span>
                <span className="text-amber-700 font-bold">39</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900">Provider Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={() => alert("Navigating to Trainee Registration...")}
                className="w-full text-left p-2.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 transition-all"
              >
                ➕ Register New Batch / Trainees
              </button>
              <button 
                onClick={() => alert("Navigating to Certificate Issuance...")}
                className="w-full text-left p-2.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 transition-all"
              >
                📜 Issue Batch Certificates
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}