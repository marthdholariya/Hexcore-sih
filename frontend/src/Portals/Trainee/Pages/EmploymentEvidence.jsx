import React, { useState } from 'react';

// Hardcoded Data structure mapped strictly to the ER Diagram entities
const EMPLOYMENT_DATA = {
  summary: {
    status: "Employed",
    designation: "Jr. Automation Technician",
    monthlyBaseSalary: "₹22,500 / mo",
    salaryVerified: true,
    employerName: "Tata Motors Ltd.",
    employerLocation: "Pune, Maharashtra",
    verificationStatus: "100% Verified by MSSDS",
    docsSubmittedCount: 4,
    docsVerifiedCount: 4
  },
  activeEmployment: {
    id: 101,
    companyName: "Tata Motors Ltd.",
    designation: "Jr. Automation Technician",
    employmentType: "Full-Time (On-Rolls)",
    joiningDate: "01 Aug 2024",
    workLocation: "Pimpri-Chinchwad Industrial Area, Pune",
    isVerified: true
  },
  evidenceVault: [
    {
      id: 201,
      documentName: "Official Appointment & Offer Letter",
      documentType: "Offer Letter",
      dateUploaded: "05 Aug 2024",
      fileSize: "1.8 MB",
      verificationStatus: "Verified",
    },
    {
      id: 202,
      documentName: "Salary Slip - July 2026",
      documentType: "Payslip",
      dateUploaded: "02 Aug 2026",
      fileSize: "840 KB",
      verificationStatus: "Verified",
    },
    {
      id: 203,
      documentName: "Aadhaar-Linked Bank Passbook Statement",
      documentType: "Bank Statement",
      dateUploaded: "10 Aug 2024",
      fileSize: "2.4 MB",
      verificationStatus: "Verified",
    },
    {
      id: 204,
      documentName: "VTP Joining & Verification Report",
      documentType: "Joining Report",
      dateUploaded: "12 Aug 2024",
      fileSize: "1.1 MB",
      verificationStatus: "Verified",
    }
  ],
  pastEmployment: [
    {
      id: 102,
      companyName: "Precision Automation Tools Pvt. Ltd.",
      designation: "Apprentice Mechanical Technician",
      duration: "Jun 2023 – Jul 2024 (1 yr 2 mos)",
      location: "Bhosari MIDC, Pune",
      verificationStatus: "Verified Experience"
    }
  ]
};

export default function EmploymentEvidence() {
  const { summary, activeEmployment, evidenceVault, pastEmployment } = EMPLOYMENT_DATA;
  const [activeTab, setActiveTab] = useState('wage');

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employment & Evidence</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track verified wage employment history, salary slips, offer letters, and verification status.
          </p>
        </div>
        <button 
          onClick={() => alert("Upload Evidence modal opened")}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto flex items-center space-x-1.5"
        >
          <span>📤</span>
          <span>Upload New Evidence</span>
        </button>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Status</p>
          <p className="text-sm font-extrabold text-slate-900">{summary.status}</p>
          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            • {summary.designation}
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Monthly Base Salary</p>
          <p className="text-xl font-black text-slate-900">{summary.monthlyBaseSalary}</p>
          <p className="text-[10px] font-bold text-emerald-600">✓ Wage-Threshold Verified</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Employer</p>
          <p className="text-sm font-bold text-slate-900 truncate">{summary.employerName}</p>
          <p className="text-[10px] text-slate-500">📍 {summary.employerLocation}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Documents Submitted</p>
          <p className="text-xl font-black text-slate-900">{summary.docsVerifiedCount} / {summary.docsSubmittedCount}</p>
          <p className="text-[10px] font-bold text-indigo-600">🛡️ All Documents STQC Validated</p>
        </div>
      </div>

      {/* 3. Type Selection Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-xs font-bold">
        <button 
          onClick={() => setActiveTab('wage')}
          className={`pb-3 transition-colors border-b-2 ${activeTab === 'wage' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          💼 Wage Employment
        </button>
        <button 
          onClick={() => setActiveTab('self')}
          className={`pb-3 transition-colors border-b-2 ${activeTab === 'self' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          🚀 Self-Employment & Entrepreneurship
        </button>
      </div>

      {activeTab === 'wage' ? (
        <>
          {/* 4. Active Employment Details Block */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
                  🏢
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">{activeEmployment.companyName}</h2>
                  <p className="text-xs text-slate-500">{activeEmployment.designation}</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
                <span>✓ Verified by MSSDS</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Employment Type</p>
                <p className="font-bold text-slate-800 mt-0.5">{activeEmployment.employmentType}</p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Date of Joining</p>
                <p className="font-bold text-slate-800 mt-0.5">{activeEmployment.joiningDate}</p>
              </div>
              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Work Location</p>
                <p className="font-bold text-slate-800 mt-0.5 truncate">{activeEmployment.workLocation}</p>
              </div>
            </div>
          </div>

          {/* 5. Document & Evidence Vault Table */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Verified Evidence Vault</h2>
                <p className="text-[11px] text-slate-500">Documents verified against state employer registry</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-2">Document Title</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Date Uploaded</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {evidenceVault.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 font-bold text-slate-900 flex items-center space-x-2">
                        <span>📄</span>
                        <span>{doc.documentName}</span>
                      </td>
                      <td className="py-3 text-slate-500">{doc.documentType}</td>
                      <td className="py-3 text-slate-500 font-medium">{doc.dateUploaded}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ✓ {doc.verificationStatus}
                        </span>
                      </td>
                      <td className="py-3 text-right space-x-2">
                        <button className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition-all">
                          View
                        </button>
                        <button className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-[11px] font-bold transition-all">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 6. Past Employment History */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Past Employment & Apprenticeships</h2>
            <div className="space-y-3">
              {pastEmployment.map((past) => (
                <div key={past.id} className="p-3.5 bg-slate-50/70 border border-slate-200/70 rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-slate-900">{past.companyName}</h3>
                    <p className="text-[11px] font-medium text-slate-600">{past.designation}</p>
                    <p className="text-[10px] text-slate-400">📅 {past.duration} • 📍 {past.location}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200/80 text-slate-700">
                    {past.verificationStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Self Employment Tab View */
        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 text-center space-y-3">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto text-xl">🚀</div>
          <h2 className="text-base font-bold text-slate-900">Register Self-Employment / Business Unit</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Provide Udyam Aadhar Number, GSTIN, or Bank Statement to verify your micro-enterprise under state entrepreneurship initiatives.
          </p>
          <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-indigo-700 transition-all">
            + Register Enterprise Details
          </button>
        </div>
      )}

    </div>
  );
}