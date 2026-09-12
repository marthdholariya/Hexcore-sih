import React from "react";

export default function Dashboard() {
  // Key Metrics mapped to Government Analytics Dashboard
  const summaryStats = [
    { label: "Total Registered Trainees", value: "1,24,500", trend: "+12% YoY", color: "text-[#0f172a]" },
    { label: "Statewide Employment Rate", value: "68.4%", trend: "↑ 4.2% vs Last Quarter", color: "text-[#15803d]" },
    { label: "Avg Placement CTC", value: "₹4.2 LPA", trend: "Baseline Benchmark", color: "text-[#4f46e5]" },
    { label: "Pending Verifications", value: "3,840", trend: "Action Required", color: "text-[#d97706]" },
  ];

  // Training Provider Performance derived from Training Effectiveness Score
  const topProviders = [
    { name: "Apex Vocational Institute", district: "Pune", placementRate: "88%", score: "9.2/10", status: "High Impact" },
    { name: "Maharashtra Skill Academy", district: "Nagpur", placementRate: "82%", score: "8.7/10", status: "High Impact" },
    { name: "Sahyadri Industrial Training", district: "Nashik", placementRate: "74%", score: "7.9/10", status: "Moderate" },
  ];

  // Flagged Data Quality & Anomaly Items derived from Data Quality & Duplicate Detection
  const flaggedAnomalies = [
    { id: "DQ-8801", type: "Duplicate Trainee Record", details: "Matching Aadhaar & Name across 2 Training Providers", severity: "High" },
    { id: "DQ-8804", type: "Salary Mismatch", details: "Reported salary in Follow-Up exceeds employer offer letter proof", severity: "Medium" },
    { id: "DQ-8809", type: "Unverified Employer", details: "Company registration number not found in MCA registry", severity: "High" },
  ];

  return (
    <div className="space-y-6 font-sans text-[#0f172a]">
      
      {/* Executive Welcome Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#eef2ff] border border-[#c7d2fe] text-[#4338ca] text-[11px] font-bold px-3 py-1 rounded-full mb-2">
            <span className="w-2 h-2 rounded-full bg-[#4f46e5]"></span>
            <span>SIH 26135 • State Outcome Dashboard</span>
          </div>
          <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">
            Government Analytics Overview
          </h1>
          <p className="text-xs text-[#64748b] font-medium mt-0.5">
            Real-time longitudinal tracking of trainee outcomes, skilling impact, and data verification across Maharashtra.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            type="button"
            onClick={() => alert("Downloading State Placement Report (PDF)")}
            className="px-4 py-2.5 rounded-xl border border-[#cbd5e1] text-[#475569] hover:bg-[#f8fafc] text-xs font-bold transition-all"
          >
            📥 Export Report
          </button>
          <button
            type="button"
            onClick={() => alert("Navigating to What-If Simulator...")}
            className="px-4 py-2.5 rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-bold transition-all shadow-xs"
          >
            🧪 Open What-If Simulator →
          </button>
        </div>
      </div>

      {/* Top Stat Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-1">
            <p className="text-[10px] font-extrabold text-[#94a3b8] uppercase tracking-wider">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-[#64748b] font-bold">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Main Grid: Training Effectiveness & Data Quality Anomalies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Training Provider Effectiveness Scores */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#0f172a]">Training Effectiveness Rankings</h2>
              <p className="text-xs text-[#64748b]">Evaluated by placement rate, retention, and salary growth.</p>
            </div>
            <span className="text-xs font-bold text-[#4338ca] bg-[#eef2ff] px-3 py-1 rounded-full border border-[#c7d2fe]">
              Top Performing VTPs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#f1f5f9] text-[#94a3b8] uppercase text-[10px] font-extrabold">
                  <th className="pb-3">Provider Name</th>
                  <th className="pb-3">District</th>
                  <th className="pb-3">Placement Rate</th>
                  <th className="pb-3">Effectiveness Score</th>
                  <th className="pb-3 text-right">Impact Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {topProviders.map((provider, i) => (
                  <tr key={i} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="py-3.5 font-bold text-[#0f172a]">{provider.name}</td>
                    <td className="py-3.5 font-medium text-[#64748b]">{provider.district}</td>
                    <td className="py-3.5 font-mono font-bold text-[#15803d]">{provider.placementRate}</td>
                    <td className="py-3.5 font-black text-[#4f46e5]">{provider.score}</td>
                    <td className="py-3.5 text-right">
                      <span className="bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0] px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase">
                        {provider.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Data Quality & Duplicate Detection Flags */}
        <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#0f172a]">Data Quality Audits</h2>
              <p className="text-xs text-[#64748b]">System-flagged conflicting records.</p>
            </div>
            <span className="bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca] text-[10px] font-black px-2 py-0.5 rounded-full">
              3 Flagged
            </span>
          </div>

          <div className="space-y-3">
            {flaggedAnomalies.map((item) => (
              <div key={item.id} className="p-3.5 bg-[#f8fafc] rounded-xl border border-[#f1f5f9] space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono font-bold text-[#64748b]">{item.id}</span>
                  <span className="bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca] text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {item.severity}
                  </span>
                </div>
                <p className="text-xs font-bold text-[#0f172a]">{item.type}</p>
                <p className="text-[11px] text-[#64748b] leading-tight">{item.details}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => alert("Navigating to full Data Quality Audit module...")}
            className="w-full py-2 bg-[#f8fafc] hover:bg-[#eef2ff] border border-[#cbd5e1] text-[#4f46e5] text-xs font-bold rounded-xl transition-all"
          >
            Review All Audit Logs →
          </button>
        </div>

      </div>

    </div>
  );
}