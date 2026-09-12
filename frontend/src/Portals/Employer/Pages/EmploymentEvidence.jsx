import React, { useState } from "react";

export default function EmployerEvidence() {
  // Sample state based on `employment_evidence` and `employment_verifications` ER tables
  const [evidenceRecords, setEvidenceRecords] = useState([
    {
      evidenceId: "EVD-8801",
      traineeId: "MH-2024-TR-84920",
      traineeName: "Rahul Patil",
      jobRole: "Web Development L1 Trainee",
      companyName: "TechCorp Solutions Pvt Ltd",
      evidenceType: "Salary Slip / Bank Statement",
      documentName: "Rahul_PaySlip_Nov_2025.pdf",
      uploadDate: "12 Nov 2025",
      verificationStatus: "Needs Review", // Needs Review, Verified, Unverified
      remarks: "Pending HR approval of monthly CTC evidence.",
    },
    {
      evidenceId: "EVD-8802",
      traineeId: "MH-2024-TR-90112",
      traineeName: "Sneha Kulkarni",
      jobRole: "Junior Cloud Associate",
      companyName: "TechCorp Solutions Pvt Ltd",
      evidenceType: "Signed Offer Letter",
      documentName: "Sneha_Offer_Letter_Signed.pdf",
      uploadDate: "02 Dec 2025",
      verificationStatus: "Verified",
      remarks: "Document verified against payroll records.",
    },
    {
      evidenceId: "EVD-8803",
      traineeId: "MH-2024-TR-76123",
      traineeName: "Amit Deshmukh",
      jobRole: "Python Trainee",
      companyName: "TechCorp Solutions Pvt Ltd",
      evidenceType: "Joining Letter",
      documentName: "Amit_Joining_Letter.pdf",
      uploadDate: "15 Jan 2026",
      verificationStatus: "Unverified",
      remarks: "Document unreadable. Request clear re-upload.",
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleStatusChange = (evidenceId, newStatus) => {
    setEvidenceRecords((prev) =>
      prev.map((item) =>
        item.evidenceId === evidenceId
          ? {
              ...item,
              verificationStatus: newStatus,
              remarks:
                newStatus === "Verified"
                  ? "Approved by Employer HR."
                  : newStatus === "Unverified"
                  ? "Marked as unverified / invalid evidence."
                  : item.remarks,
            }
          : item
      )
    );
  };

  const filteredRecords =
    selectedFilter === "All"
      ? evidenceRecords
      : evidenceRecords.filter((r) => r.verificationStatus === selectedFilter);

  return (
    <div className="min-h-screen bg-[#f0f4f9] p-6 space-y-6 font-sans text-[#0f172a]">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          
          <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">
            Employment Evidence & Document Audit
          </h1>
          <p className="text-xs text-[#64748b] font-medium mt-0.5">
            Audit candidate pay slips, offer letters, and proof of employment to classify evidence accuracy[cite: 1].
          </p>
        </div>

        {/* Status Filter Badges */}
        <div className="flex items-center space-x-2 shrink-0 bg-[#f8fafc] p-1.5 rounded-xl border border-[#e2e8f0]">
          {["All", "Needs Review", "Verified", "Unverified"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedFilter === status
                  ? "bg-[#4f46e5] text-white shadow-xs"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Evidence Records List */}
      <div className="space-y-4">
        {filteredRecords.map((item) => (
          <div
            key={item.evidenceId}
            className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-4 hover:border-[#cbd5e1] transition-all"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f1f5f9] pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#eef2ff] border border-[#c7d2fe] text-[#4f46e5] font-black text-sm flex items-center justify-center">
                  📁
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-[#0f172a]">{item.traineeName}</h3>
                    <span className="text-[10px] font-mono text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 rounded">
                      {item.evidenceId}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b] mt-0.5">{item.jobRole} • {item.companyName}</p>
                </div>
              </div>

              {/* Status Indicator */}
              <div>
                {item.verificationStatus === "Verified" && (
                  <span className="inline-flex items-center space-x-1 bg-[#dcfce7] border border-[#bbf7d0] text-[#15803d] text-xs font-bold px-3 py-1 rounded-full">
                    <span>✓</span>
                    <span>Verified</span>
                  </span>
                )}
                {item.verificationStatus === "Needs Review" && (
                  <span className="inline-flex items-center space-x-1 bg-[#fffbeb] border border-[#fde68a] text-[#92400e] text-xs font-bold px-3 py-1 rounded-full">
                    <span>⏳</span>
                    <span>Needs Review</span>
                  </span>
                )}
                {item.verificationStatus === "Unverified" && (
                  <span className="inline-flex items-center space-x-1 bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] text-xs font-bold px-3 py-1 rounded-full">
                    <span>⚠️</span>
                    <span>Unverified</span>
                  </span>
                )}
              </div>
            </div>

            {/* Evidence Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#f8fafc] p-4 rounded-xl border border-[#f1f5f9] text-xs">
              <div>
                <p className="font-bold text-[#94a3b8] uppercase text-[10px]">Evidence Document Type</p>
                <p className="font-bold text-[#0f172a] mt-0.5">{item.evidenceType}</p>
              </div>

              <div>
                <p className="font-bold text-[#94a3b8] uppercase text-[10px]">Uploaded File Name</p>
                <p className="font-bold text-[#4338ca] font-mono mt-0.5 truncate">{item.documentName}</p>
              </div>

              <div>
                <p className="font-bold text-[#94a3b8] uppercase text-[10px]">Upload Date</p>
                <p className="font-bold text-[#0f172a] mt-0.5">{item.uploadDate}</p>
              </div>
            </div>

            {/* Remarks and Audit Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
              <p className="text-xs text-[#64748b]">
                <strong className="text-[#0f172a] font-bold">Audit Note:</strong> {item.remarks}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleStatusChange(item.evidenceId, "Unverified")}
                  className="px-3.5 py-2 rounded-xl border border-[#fca5a5] text-[#b91c1c] hover:bg-[#fef2f2] text-xs font-bold transition-all"
                >
                  Flag Unverified
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(item.evidenceId, "Verified")}
                  className="px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  Approve Evidence →
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}