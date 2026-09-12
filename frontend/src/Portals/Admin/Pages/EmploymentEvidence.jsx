import React, { useState } from 'react';

export default function EmploymentEvidence() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeEvidenceModal, setActiveEvidenceModal] = useState(null);

  // Mock data representing employment proof submissions needing admin verification
  const [evidenceRecords, setEvidenceRecords] = useState([
    {
      id: 'EVD-MH-8821',
      traineeName: 'Rahul Sharma',
      traineeId: 'TRN-2026-1049',
      employerName: 'TechCorp Solutions Pvt Ltd',
      jobRole: 'Junior Frontend Developer',
      salary: '₹4.5 LPA',
      submissionDate: '2026-08-18',
      status: 'Pending Audit',
      evidenceType: 'Offer Letter & Salary Slip',
      documents: [
        { name: 'Appointment_Letter_TechCorp.pdf', type: 'PDF' },
        { name: 'Bank_Statement_July2026.pdf', type: 'PDF' },
      ],
      remarks: 'Initial document submission complete by trainee.',
    },
    {
      id: 'EVD-MH-5102',
      traineeName: 'Priya Verma',
      traineeId: 'TRN-2026-2210',
      employerName: 'Sahyadri Auto Components',
      jobRole: 'Quality Assurance Inspector',
      salary: '₹3.8 LPA',
      submissionDate: '2026-08-22',
      status: 'Verified',
      evidenceType: 'Joining Letter & PF Proof',
      documents: [
        { name: 'Joining_Letter_Sahyadri.pdf', type: 'PDF' },
        { name: 'UAN_PF_Passbook.pdf', type: 'PDF' },
      ],
      remarks: 'EPFO record cross-checked and verified.',
    },
    {
      id: 'EVD-MH-3190',
      traineeName: 'Amit Kulkarni',
      traineeId: 'TRN-2026-0091',
      employerName: 'Apex Logistics & Supply Chain',
      jobRole: 'Warehouse Operations Executive',
      salary: '₹3.2 LPA',
      submissionDate: '2026-09-01',
      status: 'Action Required',
      evidenceType: 'Offer Letter',
      documents: [
        { name: 'Offer_Letter_Apex.pdf', type: 'PDF' },
      ],
      remarks: 'Salary proof or PF submission missing.',
    },
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    setEvidenceRecords((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: newStatus } : rec))
    );
    setActiveEvidenceModal(null);
  };

  const filteredRecords = evidenceRecords.filter((rec) => {
    const matchesStatus = selectedStatus === 'All' || rec.status === selectedStatus;
    const matchesSearch =
      rec.traineeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.employerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.traineeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
              Governance & Oversight
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-semibold">SIH 26135</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">Employment Evidence Verification</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit proof of placement (Offer letters, Salary Slips, PF details) submitted by candidates and employers.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Pending Audits</p>
            <p className="text-base font-extrabold text-amber-600">
              {evidenceRecords.filter((e) => e.status === 'Pending Audit').length}
            </p>
          </div>
          <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Verified Evidence</p>
            <p className="text-base font-extrabold text-emerald-600">
              {evidenceRecords.filter((e) => e.status === 'Verified').length}
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Search Trainee, Employer, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'Pending Audit', 'Verified', 'Action Required'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedStatus === status
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Evidence Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Trainee Info</th>
                <th className="py-3.5 px-4">Employer & Designation</th>
                <th className="py-3.5 px-4">Evidence Type</th>
                <th className="py-3.5 px-4">Salary Package</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/60 transition-colors">
                    
                    {/* Trainee Details */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{rec.traineeName}</div>
                      <div className="text-[10px] text-indigo-600 font-bold">{rec.traineeId}</div>
                    </td>

                    {/* Employer Details */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-800 font-semibold">{rec.employerName}</div>
                      <div className="text-[10px] text-slate-400">{rec.jobRole}</div>
                    </td>

                    {/* Evidence Type */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        📁 {rec.evidenceType}
                      </span>
                    </td>

                    {/* Salary */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                      {rec.salary}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {rec.status === 'Verified' && (
                        <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                          ✓ Verified Evidence
                        </span>
                      )}
                      {rec.status === 'Pending Audit' && (
                        <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-amber-50 text-amber-700 border border-amber-200/80">
                          ⏳ Pending Audit
                        </span>
                      )}
                      {rec.status === 'Action Required' && (
                        <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-red-50 text-red-700 border border-red-200/80">
                          ⚠ Evidence Incomplete
                        </span>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveEvidenceModal(rec)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold rounded-xl transition-all text-xs"
                      >
                        Audit Evidence
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400 text-xs">
                    No evidence records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Modal */}
      {activeEvidenceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Audit Proof: {activeEvidenceModal.traineeName}
                </h3>
                <p className="text-xs text-slate-500">Record ID: {activeEvidenceModal.id}</p>
              </div>
              <button
                onClick={() => setActiveEvidenceModal(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Employer</p>
                <p className="font-bold text-slate-800">{activeEvidenceModal.employerName}</p>
                <p className="text-slate-500">{activeEvidenceModal.jobRole}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Submission Details</p>
                <p className="font-semibold text-slate-800">Date: {activeEvidenceModal.submissionDate}</p>
                <p className="font-mono text-indigo-600 font-bold">Salary: {activeEvidenceModal.salary}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-700 mb-2">Attached Documents</p>
              <div className="space-y-2">
                {activeEvidenceModal.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs">
                    <span className="font-semibold text-slate-700">📄 {doc.name}</span>
                    <button className="text-[10px] font-bold text-indigo-600 hover:underline">
                      View / Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleUpdateStatus(activeEvidenceModal.id, 'Action Required')}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs transition-all"
              >
                Reject / Request Additional Proof
              </button>
              <button
                onClick={() => handleUpdateStatus(activeEvidenceModal.id, 'Verified')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs"
              >
                ✓ Confirm & Approve Placement Evidence
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}