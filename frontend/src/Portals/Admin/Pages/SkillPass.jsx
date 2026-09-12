import React from 'react';

export default function AdminSkillPassport() {
  const passports = [
    { id: 'PASS-MH-901', trainee: 'Aarav Deshmukh', level: 'Level 5 (NSQF)', badge: 'Verified Credentials', verifications: 8 },
    { id: 'PASS-MH-412', trainee: 'Sneha Patil', level: 'Level 4 (NSQF)', badge: 'Verified Credentials', verifications: 6 },
    { id: 'PASS-MH-119', trainee: 'Karan Joshi', level: 'Level 6 (NSQF)', badge: 'Audit Pending', verifications: 12 },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
          Credential Governance
        </span>
        <h1 className="text-xl font-bold text-slate-900 mt-1">Skill Passport Oversight</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Audit micro-credentials, verify NSQF levels, and inspect tamper-proof digital skill passports.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase">
              <th className="py-3.5 px-4">Passport ID</th>
              <th className="py-3.5 px-4">Trainee</th>
              <th className="py-3.5 px-4">NSQF Level</th>
              <th className="py-3.5 px-4">Skill Badges</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {passports.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">{p.id}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{p.trainee}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-700">{p.level}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                    {p.badge} ({p.verifications})
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button className="px-3 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-100 transition-all">
                    Inspect Credentials
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}