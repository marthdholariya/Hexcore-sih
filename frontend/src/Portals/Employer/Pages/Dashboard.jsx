import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f0f4f9] p-6 space-y-6 font-sans text-[#0f172a]">
      
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-3">
        <div className="inline-flex items-center space-x-2 bg-[#eef2ff] border border-[#c7d2fe] text-[#4338ca] text-[11px] font-bold px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#4f46e5]"></span>
          <span>MSSDS Unified Employer Portal</span>
        </div>
        <div>
          <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">
            Welcome back, TechCorp HR Team!
          </h1>
          <p className="text-xs text-[#64748b] font-medium mt-1">
            MSSDS Unified Employer Portal • Outcome Verification & AI Talent Matching
          </p>
        </div>
      </div>

      {/* Action Banner: Pending Outcome Verifications */}
      <div className="bg-[#fffbeb] border border-[#fef3c7] p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#d97706] text-white flex items-center justify-center text-lg font-bold shrink-0">
            ⏰
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-[#0f172a]">
                5 Trainee Employment Verifications Due
              </h3>
              <span className="bg-[#fef3c7] text-[#92400e] text-[10px] font-extrabold px-2 py-0.5 rounded border border-[#fde68a] uppercase">
                Action Required
              </span>
            </div>
            <p className="text-xs text-[#64748b] mt-0.5">
              Review and confirm trainee role, joining dates, and monthly salary evidence.
            </p>
          </div>
        </div>
        <button className="bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs shrink-0">
          Verify Trainees Now →
        </button>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: AI Job Matching & Active Postings */}
        <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-5">
          <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-base">💼</span>
              <h2 className="text-sm font-bold text-[#0f172a]">Active Job Matching</h2>
            </div>
            <span className="bg-[#eef2ff] text-[#4338ca] border border-[#c7d2fe] text-[11px] font-bold px-2.5 py-1 rounded-full">
              • 3 Active Openings
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#0f172a]">
              Junior Web Developer
            </h3>
            <p className="text-xs text-[#64748b] mt-0.5">
              Sector: IT & Software Services • Location: Pune Cluster
            </p>
          </div>

          {/* Metric Sub-cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#f1f5f9]">
              <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                MATCHED CANDIDATES
              </p>
              <p className="text-xl font-black text-[#0f172a] mt-0.5">42 Trainees</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-[#dcfce7] text-[#15803d] text-[9px] font-bold rounded border border-[#bbf7d0]">
                ✓ AI Match Score: 88%+
              </span>
            </div>

            <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#f1f5f9]">
              <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                SALARY OFFERED
              </p>
              <p className="text-xl font-black text-[#0f172a] mt-0.5">₹3.6L - ₹4.8L</p>
              <p className="text-[10px] text-[#64748b] mt-1 font-medium">Annual CTC</p>
            </div>
          </div>

          {/* Progress Bar Component */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#64748b]">Candidate Shortlisting Fulfillment</span>
              <span className="text-[#0f172a]">78%</span>
            </div>
            <div className="w-full bg-[#f1f5f9] rounded-full h-2">
              <div
                className="bg-[#6366f1] h-2 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right Card: Outcome Evidence & Verification Status */}
        <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-5">
          <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-base">🏢</span>
              <h2 className="text-sm font-bold text-[#0f172a]">Employer Status</h2>
            </div>
            <span className="bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              ✓ Verified Partner
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#0f172a]">
              TechCorp Solutions Pvt Ltd
            </h3>
            <p className="text-xs text-[#64748b] mt-0.5">
              Registration ID: EMP-MH-2026-998
            </p>
          </div>

          {/* Metric Sub-cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#f1f5f9]">
              <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                VERIFIED HIRES
              </p>
              <p className="text-xl font-black text-[#0f172a] mt-0.5">128 Hired</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-[#dcfce7] text-[#15803d] text-[9px] font-bold rounded border border-[#bbf7d0]">
                ✓ Evidence Approved
              </span>
            </div>

            <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#f1f5f9]">
              <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                RETENTION RATE
              </p>
              <p className="text-xl font-black text-[#0f172a] mt-0.5">92%</p>
              <p className="text-[10px] text-[#64748b] mt-1 font-medium">6-Month Retention</p>
            </div>
          </div>

          {/* Solid Green Status Bar */}
          <div className="space-y-1.5 pt-2">
            <p className="text-xs font-bold text-[#64748b]">Outcome Verification Compliance</p>
            <div className="w-full bg-[#10b981] h-2 rounded-full"></div>
          </div>
        </div>

      </div>

      {/* AI Recommendation Banner */}
      <div className="bg-[#eef2ff] border border-[#c7d2fe] p-4 rounded-2xl flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-[#4f46e5] text-white flex items-center justify-center text-base font-bold shrink-0">
          💡
        </div>
        <p className="text-xs text-[#1e1b4b] font-medium leading-relaxed">
          <strong className="font-bold text-[#312e81]">Job Market Demand Insight:</strong>{" "}
          High local demand in Pune IT cluster. 18 certified candidates from VTP Pune with verified React & Next.js skills match your open positions[cite: 2].
        </p>
      </div>

    </div>
  );
}