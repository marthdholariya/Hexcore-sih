import React, { useState } from 'react';

export default function FollowUpSys() {
  const [activeTab, setActiveTab] = useState('Surveys');
  const [surveys, setSurveys] = useState([
    { id: 'SURV-2026-01', title: '3-Month Post-Placement Audit', target: 'Batch 2026-Q1 Trainees', responses: 342, totalSent: 450, status: 'Active' },
    { id: 'SURV-2026-02', title: 'Employer Retention & Feedback', target: 'Registered Hiring Partners', responses: 88, totalSent: 120, status: 'Active' },
    { id: 'SURV-2026-03', title: '6-Month Career Growth Check', target: 'Batch 2025-Q3 Trainees', responses: 512, totalSent: 550, status: 'Completed' },
  ]);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
              Oversight & Monitoring
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-semibold">SIH 26135</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">Automated Follow-Up System</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure automated surveys, track candidate retention rates, and monitor post-placement trajectory.
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs">
          + Create New Automated Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Overall Response Rate</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">78.4%</p>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">↑ +4.2% from last quarter</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Automated Nudges Sent</p>
          <p className="text-2xl font-black text-slate-800 mt-1">1,120</p>
          <p className="text-[10px] text-slate-400 font-semibold mt-1">SMS & Email reminders</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Flagged Attrition Risk</p>
          <p className="text-2xl font-black text-amber-600 mt-1">29 Cases</p>
          <p className="text-[10px] text-amber-600 font-bold mt-1">Requires admin review</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Active Follow-Up Campaigns</h2>
        <div className="space-y-3">
          {surveys.map((s) => (
            <div key={s.id} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600">{s.id}</span>
                <h3 className="text-xs font-bold text-slate-900">{s.title}</h3>
                <p className="text-[10px] text-slate-400">Target: {s.target}</p>
              </div>
              <div className="text-right space-y-1">
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${s.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'}`}>
                  {s.status}
                </span>
                <p className="text-[11px] font-bold text-slate-700">{s.responses} / {s.totalSent} Responded</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}