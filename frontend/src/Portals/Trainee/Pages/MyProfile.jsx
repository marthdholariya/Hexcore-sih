import React from 'react';

// Hardcoded Trainee Profile Data matching the UI mockup
const PROFILE_DATA = {
  personal: {
    fullName: "Rahul Patil",
    candidateId: "MH-2024-TR-84920",
    location: "Pune, Maharashtra",
    legalName: "Rahul Sanjay Patil",
    email: "rahul.patil@email.com",
    isEmailVerified: true,
    mobile: "+91 98765 43210",
    dob: "14 Aug 2001",
    age: "23 yrs",
    gender: "Male",
    category: "OBC (Other Backward Classes)",
    state: "Maharashtra",
    address: "Flat 402, Shiv Shambho Heights, Shivaji Nagar",
    district: "Pune",
    taluka: "Haveli",
    pincode: "411005"
  },
  education: [
    {
      id: 1,
      degree: "Bachelor of Vocational Studies (B.Voc)",
      isHigherEd: true,
      field: "Mechatronics & Industrial Robotics",
      institution: "Government Polytechnic / Savitribai Phule Pune University",
      duration: "Jul 2021 – May 2024",
      score: "78.4% (First Class with Distinction)"
    },
    {
      id: 2,
      degree: "Higher Secondary Certificate (HSC - 12th Vocational)",
      isHigherEd: false,
      field: "Science & Vocational Electronics",
      institution: "Fergusson Junior College, Pune",
      duration: "Jun 2019 – Mar 2021",
      score: "82.6% (Grade A)"
    },
    {
      id: 3,
      degree: "Secondary School Certificate (SSC - 10th)",
      isHigherEd: false,
      field: "General Curriculum - Maharashtra State Board",
      institution: "Model English High School, Pune",
      duration: "Jun 2018 – Mar 2019",
      score: "85.2% (Distinction)"
    }
  ],
  employment: {
    isCurrentlyEmployed: true,
    statusDesignation: "Employed • Jr. Automation Technician",
    employer: "Tata Motors Ltd., Pune",
    joined: "Aug 2024 (Verified by MSSDS)"
  }
};

export default function MyProfile() {
  const { personal, education, employment } = PROFILE_DATA;

  return (
    <div className="space-y-5 font-sans text-slate-800">

      {/* Top Banner Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
            RP
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-900">{personal.fullName}</h1>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                {personal.candidateId}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1">
              <span>📍 {personal.location}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button 
            onClick={() => alert("Edit Profile modal triggered")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
          >
            <span>✏️</span>
            <span>Edit Profile</span>
          </button>
          <button 
            onClick={() => window.print()}
            className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs transition-all shadow-xs"
            title="Print Profile"
          >
            🖨️
          </button>
        </div>
      </div>

      {/* Main Grid: Personal Details + Academic History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Column: Personal Details (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <span>🪪</span>
              <span>Personal Details</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center space-x-1">
              <span>✓ Verified</span>
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Legal Name */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                Full Legal Name (as per Aadhaar)
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  readOnly 
                  value={personal.legalName}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-slate-400">🔒</span>
              </div>
            </div>

            {/* Email & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-bold text-slate-500">Email Address</label>
                  {personal.isEmailVerified && (
                    <span className="text-[10px] text-emerald-600 font-bold">✓ Verified</span>
                  )}
                </div>
                <input 
                  type="text" 
                  readOnly 
                  value={personal.email}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Mobile Number</label>
                <input 
                  type="text" 
                  readOnly 
                  value={personal.mobile}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            {/* DOB & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  Date of Birth <span className="text-slate-400 font-normal">(Age: {personal.age})</span>
                </label>
                <input 
                  type="text" 
                  readOnly 
                  value={personal.dob}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Gender</label>
                <input 
                  type="text" 
                  readOnly 
                  value={personal.gender}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Category & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Category / Caste</label>
                <input 
                  type="text" 
                  readOnly 
                  value={personal.category}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">State</label>
                <input 
                  type="text" 
                  readOnly 
                  value={personal.state}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Residential Address */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Residential Address</label>
              <input 
                type="text" 
                readOnly 
                value={personal.address}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none"
              />
            </div>

            {/* District & Taluka */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">District</label>
                <input 
                  type="text" 
                  readOnly 
                  value={personal.district}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Taluka / Sub-district</label>
                <input 
                  type="text" 
                  readOnly 
                  value={personal.taluka}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Postal Pincode */}
            <div className="w-1/2 pr-1.5">
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Postal Pincode</label>
              <input 
                type="text" 
                readOnly 
                value={personal.pincode}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Academic History (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <span>🎓</span>
                <span>Education & Academic History</span>
              </h2>
              <button 
                onClick={() => alert("Add qualification modal triggered")}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 border border-indigo-200 rounded-lg px-2.5 py-1 bg-indigo-50/50"
              >
                + Add Qualification
              </button>
            </div>

            {/* Cards List */}
            <div className="space-y-3">
              {education.map((item) => (
                <div key={item.id} className="p-3.5 bg-slate-50/70 border border-slate-200/70 rounded-xl space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">{item.degree}</h3>
                    {item.isHigherEd && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 shrink-0">
                        Higher Ed
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700">{item.field}</p>
                  <p className="text-[10px] text-slate-500">{item.institution}</p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/40 text-[10px]">
                    <span className="text-slate-400 font-medium">📅 {item.duration}</span>
                    <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">{item.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Card: Employment Status */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <span>💼</span>
            <span>Employment Status</span>
          </h2>
          {employment.isCurrentlyEmployed && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
              <span>• Currently Employed</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status & Designation</p>
            <p className="text-xs font-bold text-slate-900 mt-1">{employment.statusDesignation}</p>
          </div>
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Employer</p>
            <p className="text-xs font-bold text-slate-900 mt-1">{employment.employer}</p>
          </div>
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Joined</p>
            <p className="text-xs font-bold text-slate-900 mt-1">{employment.joined}</p>
          </div>
        </div>

        <div className="text-right pt-1">
          <a href="/trainee/employment" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            View Full Records in Employment & Evidence →
          </a>
        </div>
      </div>

    </div>
  );
}