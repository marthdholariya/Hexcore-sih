import React, { useState } from 'react';

export default function EmployerVeri() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeEmployerModal, setActiveEmployerModal] = useState(null);

  // Sample Mock Data representing registered employers pending validation
  const [employers, setEmployers] = useState([
    {
      id: 'EMP-MH-9021',
      companyName: 'TechCorp Solutions Pvt Ltd',
      sector: 'Information Technology',
      cin: 'U72900MH2018PTC312456',
      contactPerson: 'Vikram Mehta (HR Director)',
      email: 'hr@techcorp.in',
      phone: '+91 98201 44321',
      location: 'Pune, Maharashtra',
      registeredDate: '2026-08-14',
      reportedHires: 42,
      status: 'Pending Review',
      documents: ['GST Registration Certificate', 'Certificate of Incorporation', 'PF Registration Proof'],
    },
    {
      id: 'EMP-MH-4412',
      companyName: 'Sahyadri Auto Components',
      sector: 'Automotive & Manufacturing',
      cin: 'U34100MH2015PLC264910',
      contactPerson: 'Anjali Deshmukh (VP Talent)',
      email: 'careers@sahyadriauto.com',
      phone: '+91 97654 11200',
      location: 'Nashik, Maharashtra',
      registeredDate: '2026-08-20',
      reportedHires: 128,
      status: 'Verified',
      documents: ['GST Certificate', 'Company PAN', 'Ministry of Corporate Affairs Filing'],
    },
    {
      id: 'EMP-MH-1089',
      companyName: 'Apex Logistics & Supply Chain',
      sector: 'Logistics & Warehousing',
      cin: 'U60230MH2021PTC355981',
      contactPerson: 'Rohan Patil (Operations Manager)',
      email: 'rohan.p@apexlogistics.in',
      phone: '+91 98112 88901',
      location: 'Bhiwandi, Thane',
      registeredDate: '2026-09-02',
      reportedHires: 15,
      status: 'Action Required',
      documents: ['GST Certificate'],
    },
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    setEmployers((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, status: newStatus } : emp))
    );
    setActiveEmployerModal(null);
  };

  const filteredEmployers = employers.filter((emp) => {
    const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;
    const matchesSearch =
      emp.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.cin.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
              Governance & Oversight
            </span>
            
            
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">Employer Verification </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review company credentials, validate legal filings (CIN/GST), and confirm employer status before outcome data aggregation.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Pending Audits</p>
            <p className="text-base font-extrabold text-amber-600">
              {employers.filter((e) => e.status === 'Pending Review').length}
            </p>
          </div>
          <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Verified Partners</p>
            <p className="text-base font-extrabold text-emerald-600">
              {employers.filter((e) => e.status === 'Verified').length}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by Company, ID, or CIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'Pending Review', 'Verified', 'Action Required'].map((status) => (
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

      {/* Verification Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Employer Details</th>
                <th className="py-3.5 px-4">CIN / Reg Identifier</th>
                <th className="py-3.5 px-4">Sector & Location</th>
                <th className="py-3.5 px-4">Reported Hires</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {filteredEmployers.length > 0 ? (
                filteredEmployers.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/60 transition-colors">
                    
                    {/* Employer Name & Contact */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{emp.companyName}</div>
                      <div className="text-[10px] text-slate-400">{emp.contactPerson} • {emp.email}</div>
                    </td>

                    {/* CIN & ID */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                      <div>{emp.cin}</div>
                      <div className="text-[10px] text-indigo-600 font-bold">{emp.id}</div>
                    </td>

                    {/* Sector & Location */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-800 font-semibold">{emp.sector}</div>
                      <div className="text-[10px] text-slate-400">{emp.location}</div>
                    </td>

                    {/* Reported Hires */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-extrabold text-[11px]">
                        {emp.reportedHires} Trainees
                      </span>
                    </td>

                    {/* Verification Status */}
                    <td className="py-3.5 px-4">
                      {emp.status === 'Verified' && (
                        <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                          ✓ Verified Partner
                        </span>
                      )}
                      {emp.status === 'Pending Review' && (
                        <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-amber-50 text-amber-700 border border-amber-200/80">
                          ⏳ Pending Review
                        </span>
                      )}
                      {emp.status === 'Action Required' && (
                        <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-red-50 text-red-700 border border-red-200/80">
                          ⚠ Needs Correction
                        </span>
                      )}
                    </td>

                    {/* Action Trigger */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveEmployerModal(emp)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold rounded-xl transition-all text-xs"
                      >
                        Inspect & Approve
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400 text-xs">
                    No employer records match the active criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspection Modal */}
      {activeEmployerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Verify Credentials: {activeEmployerModal.companyName}
                </h3>
                <p className="text-xs text-slate-500">ID: {activeEmployerModal.id}</p>
              </div>
              <button
                onClick={() => setActiveEmployerModal(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">CIN / Registration Number</p>
                <p className="font-mono font-bold text-slate-800">{activeEmployerModal.cin}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Registered Contact</p>
                <p className="font-semibold text-slate-800">{activeEmployerModal.contactPerson}</p>
                <p className="text-slate-500">{activeEmployerModal.phone}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-700 mb-2">Uploaded Verification Documents</p>
              <div className="space-y-2">
                {activeEmployerModal.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs">
                    <span className="font-semibold text-slate-700">📄 {doc}</span>
                    <span className="text-[10px] font-bold text-indigo-600 cursor-pointer hover:underline">View Document</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleUpdateStatus(activeEmployerModal.id, 'Action Required')}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs transition-all"
              >
                Reject / Request Document Correction
              </button>
              <button
                onClick={() => handleUpdateStatus(activeEmployerModal.id, 'Verified')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs"
              >
                ✓ Approve Employer Status
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}