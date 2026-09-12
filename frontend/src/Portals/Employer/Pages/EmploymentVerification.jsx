import React, { useState } from "react";

export default function EmployerVerification() {
  // Sample data derived from SIH 26135 Feature #5 & #13 (Employment Evidence Verification)
  const [verifications, setVerifications] = useState([
    {
      id: "VER-2026-001",
      traineeId: "MH-2024-TR-84920",
      traineeName: "Rahul Patil",
      courseName: "Web Development L1",
      vtpName: "VTP Pune",
      designation: "Junior Web Developer",
      joiningDate: "15 Oct 2024",
      monthlySalary: "₹30,000 / month",
      employmentType: "Full-Time",
      evidenceFile: "PaySlip_Nov2025.pdf",
      status: "Needs Review",
    },
    {
      id: "VER-2026-002",
      traineeId: "MH-2024-TR-90112",
      traineeName: "Sneha Kulkarni",
      courseName: "Cloud Deployment Essentials",
      vtpName: "VTP Mumbai",
      designation: "DevOps Trainee",
      joiningDate: "01 Dec 2024",
      monthlySalary: "₹35,000 / month",
      employmentType: "Full-Time",
      evidenceFile: "OfferLetter_Signed.pdf",
      status: "Verified",
    },
    {
      id: "VER-2026-003",
      traineeId: "MH-2024-TR-76123",
      traineeName: "Amit Deshmukh",
      courseName: "Python Full Stack",
      vtpName: "VTP Nagpur",
      designation: "Software Engineer Intern",
      joiningDate: "10 Jan 2025",
      monthlySalary: "₹18,000 / month",
      employmentType: "Apprenticeship",
      evidenceFile: "BankStatement_Jan.pdf",
      status: "Needs Review",
    },
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    setVerifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  return (
    <div className="min-h-screen bg-[#f0f4f9] p-6 space-y-6 font-sans text-[#0f172a]">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#eef2ff] border border-[#c7d2fe] text-[#4338ca] text-[11px] font-bold px-3 py-1 rounded-full mb-2">
            <span className="w-2 h-2 rounded-full bg-[#4f46e5]"></span>
            <span>Feature #5 & #13 • Outcome Trust Engine</span>
          </div>
          <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">
            Trainee Employment Verification
          </h1>
          <p className="text-xs text-[#64748b] font-medium mt-0.5">
            Verify trainee joining dates, roles, salaries, and evidence documents to build reliable outcome data.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="bg-[#fffbeb] border border-[#fef3c7] px-3.5 py-2 rounded-xl flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse"></span>
            <span className="text-xs font-bold text-[#92400e]">
              {verifications.filter((v) => v.status === "Needs Review").length} Pending
            </span>
          </div>
          <div className="bg-[#dcfce7] border border-[#bbf7d0] px-3.5 py-2 rounded-xl flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#15803d]"></span>
            <span className="text-xs font-bold text-[#15803d]">
              {verifications.filter((v) => v.status === "Verified").length} Verified
            </span>
          </div>
        </div>
      </div>

      {/* Verification Items List */}
      <div className="space-y-4">
        {verifications.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-4 transition-all hover:border-[#cbd5e1]"
          >
            {/* Top Bar: Trainee & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f1f5f9] pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#eef2ff] text-[#4f46e5] font-black text-sm flex items-center justify-center border border-[#c7d2fe]">
                  {item.traineeName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f172a]">{item.traineeName}</h3>
                  <p className="text-[11px] font-mono text-[#64748b]">{item.traineeId} • {item.vtpName}</p>
                </div>
              </div>

              <div>
                {item.status === "Verified" && (
                  <span className="inline-flex items-center space-x-1.5 bg-[#dcfce7] border border-[#bbf7d0] text-[#15803d] text-xs font-bold px-3 py-1 rounded-full">
                    <span>✓</span>
                    <span>Verified Claim</span>
                  </span>
                )}
                {item.status === "Needs Review" && (
                  <span className="inline-flex items-center space-x-1.5 bg-[#fffbeb] border border-[#fde68a] text-[#92400e] text-xs font-bold px-3 py-1 rounded-full">
                    <span>⏳</span>
                    <span>Needs Verification Review</span>
                  </span>
                )}
                {item.status === "Rejected" && (
                  <span className="inline-flex items-center space-x-1.5 bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] text-xs font-bold px-3 py-1 rounded-full">
                    <span>✕</span>
                    <span>Claim Rejected</span>
                  </span>
                )}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#f8fafc] p-4 rounded-xl border border-[#f1f5f9] text-xs">
              <div>
                <p className="font-bold text-[#94a3b8] uppercase text-[10px]">Claimed Role</p>
                <p className="font-bold text-[#0f172a] mt-0.5">{item.designation}</p>
              </div>

              <div>
                <p className="font-bold text-[#94a3b8] uppercase text-[10px]">Joining Date</p>
                <p className="font-bold text-[#0f172a] mt-0.5">{item.joiningDate}</p>
              </div>

              <div>
                <p className="font-bold text-[#94a3b8] uppercase text-[10px]">Salary Offered</p>
                <p className="font-bold text-[#0f172a] mt-0.5">{item.monthlySalary}</p>
              </div>

              <div>
                <p className="font-bold text-[#94a3b8] uppercase text-[10px]">Employment Type</p>
                <p className="font-bold text-[#0f172a] mt-0.5">{item.employmentType}</p>
              </div>
            </div>

            {/* Bottom Controls & Evidence File */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
              <div className="flex items-center space-x-2 text-xs">
                <span className="font-bold text-[#64748b]">Uploaded Evidence:</span>
                <span className="bg-[#eef2ff] border border-[#c7d2fe] text-[#4338ca] font-mono px-2.5 py-1 rounded-md flex items-center space-x-1">
                  <span>📄</span>
                  <span>{item.evidenceFile}</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(item.id, "Rejected")}
                  className="px-3.5 py-2 rounded-xl border border-[#fca5a5] text-[#b91c1c] hover:bg-[#fef2f2] text-xs font-bold transition-all"
                >
                  Reject Claim
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(item.id, "Verified")}
                  className="px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  Confirm & Verify Outcome →
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}