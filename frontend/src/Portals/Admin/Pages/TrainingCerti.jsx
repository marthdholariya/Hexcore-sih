import React from 'react';

export default function AdminTrainingCertification() {
  const certifications = [
    { title: 'Advanced Industrial Automation', provider: 'Government ITI Pune', candidates: 120, passRate: '94%', auditStatus: 'Approved' },
    { title: 'Solar PV Installation & Grid Setup', provider: 'Skill Tech Academy', candidates: 85, passRate: '88%', auditStatus: 'Approved' },
    { title: 'Full-Stack Web Development', provider: 'Digital Maharashtra Hub', candidates: 200, passRate: '81%', auditStatus: 'Under Review' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
          Quality Control
        </span>
        <h1 className="text-xl font-bold text-slate-900 mt-1">Training & Certification Oversight</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Monitor training provider performance, audit course certifications, and maintain compliance standards.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase">
              <th className="py-3.5 px-4">Course Name</th>
              <th className="py-3.5 px-4">Training Provider</th>
              <th className="py-3.5 px-4">Enrolled Candidates</th>
              <th className="py-3.5 px-4">Pass Rate</th>
              <th className="py-3.5 px-4">Compliance Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {certifications.map((c, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-bold text-slate-900">{c.title}</td>
                <td className="py-3.5 px-4 text-slate-600">{c.provider}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{c.candidates} Trainees</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600">{c.passRate}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg ${c.auditStatus === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                    {c.auditStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}