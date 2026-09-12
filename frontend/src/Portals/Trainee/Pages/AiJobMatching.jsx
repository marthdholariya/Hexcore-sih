import React, { useState } from 'react';

// Hardcoded Trainee Skills & Qualification Context (Mapped from Trainee ER Schema)
const TRAINEE_PROFILE = {
  candidateId: "MH-2024-TR-84920",
  name: "Rahul Patil",
  trade: "Web Development & IT Maintenance",
  location: "Pune, Maharashtra",
  skills: ["React.js", "JavaScript", "HTML5/CSS3", "REST APIs", "Network Troubleshooting"],
  preferredRole: "Frontend Developer",
  minSalaryExpected: 20000,
};

// Hardcoded Job Postings (Mapped from Employer/Job ER Schema)
const JOB_POSTINGS = [
  {
    jobId: "JOB-2026-901",
    companyName: "TechMahindra Digital",
    title: "Junior Web Developer",
    location: "Pune, Maharashtra",
    employmentType: "Full-Time",
    salaryRange: "₹22,000 - ₹28,000 / mo",
    minSalary: 22000,
    requiredSkills: ["React.js", "JavaScript", "HTML5/CSS3", "REST APIs"],
    description: "Looking for entry-level React developers to join our public sector digitization team.",
    matchScore: 95,
    matchFactors: [
      "100% Skill Overlap (React, JS, HTML/CSS)",
      "Location matches preferred region (Pune)",
      "Salary exceeds minimum threshold"
    ]
  },
  {
    jobId: "JOB-2026-882",
    companyName: "Precision Automation Tools",
    title: "IT Support & Network Technician",
    location: "Chinchwad, Pune",
    employmentType: "Full-Time",
    salaryRange: "₹20,000 - ₹24,000 / mo",
    minSalary: 20000,
    requiredSkills: ["Network Troubleshooting", "Hardware Repair", "System Maintenance"],
    description: "Handle local office infrastructure, network setups, and hardware diagnostics.",
    matchScore: 82,
    matchFactors: [
      "High match for hardware/networking skill modules",
      "Proximity to current location"
    ]
  },
  {
    jobId: "JOB-2026-740",
    companyName: "Infosys BPM Services",
    title: "Associate UI Developer",
    location: "Hinjewadi, Pune",
    employmentType: "Contract / On-Rolls",
    salaryRange: "₹25,000 - ₹30,000 / mo",
    minSalary: 25000,
    requiredSkills: ["React.js", "TypeScript", "Tailwind CSS", "Redux"],
    description: "Build user interfaces for enterprise web applications using modern React stack.",
    matchScore: 78,
    matchFactors: [
      "Matches primary skill set (React.js)",
      "Requires additional frameworks (TypeScript)"
    ]
  },
  {
    jobId: "JOB-2026-512",
    companyName: "Tata Consultancy Services",
    title: "Full Stack Engineer Trainee",
    location: "Mumbai, Maharashtra",
    employmentType: "Full-Time",
    salaryRange: "₹28,000 - ₹35,000 / mo",
    minSalary: 28000,
    requiredSkills: ["Java", "Spring Boot", "React.js", "SQL"],
    description: "Entry-level full stack engineer role requiring backend Java and frontend React expertise.",
    matchScore: 60,
    matchFactors: [
      "Partial frontend skill match",
      "Requires relocation to Mumbai"
    ]
  }
];

export default function AIJobMatching() {
  const [jobs, setJobs] = useState(JOB_POSTINGS);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filterMinScore, setFilterMinScore] = useState(0);

  const filteredJobs = jobs.filter(job => job.matchScore >= filterMinScore);

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      alert(`Application submitted successfully for Job ID: ${jobId}`);
    }
  };

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Job Matching</h1>
          <p className="text-xs text-slate-500 mt-1">
            Algorithmic job recommendations matching verified skill profiles against active employer requirements.
          </p>
        </div>
      </div>

      {/* 2. Trainee Matching Vector Summary */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 rounded-2xl shadow-md border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Target Candidate Profile</span>
            <h2 className="text-base font-bold text-white mt-0.5">{TRAINEE_PROFILE.name} ({TRAINEE_PROFILE.candidateId})</h2>
            <p className="text-xs text-slate-400">Trade: {TRAINEE_PROFILE.trade} • Preferred: {TRAINEE_PROFILE.preferredRole}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-xl bg-indigo-600/30 border border-indigo-400/30 text-indigo-300 text-xs font-bold flex items-center space-x-1.5">
              <span>🎯</span>
              <span>AI Engine Active</span>
            </span>
          </div>
        </div>

        {/* Vector Match Attributes */}
        <div className="space-y-2 text-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Input Skill Keywords for Matching</p>
          <div className="flex flex-wrap gap-1.5">
            {TRAINEE_PROFILE.skills.map((skill, index) => (
              <span key={index} className="px-2.5 py-0.5 rounded-lg bg-white/10 border border-white/15 text-slate-200 text-[11px] font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-700">Filter Match Score:</span>
          <select 
            value={filterMinScore} 
            onChange={(e) => setFilterMinScore(Number(e.target.value))}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value={0}>All Jobs</option>
            <option value={75}>75%+ High Match Only</option>
            <option value={90}>90%+ Excellent Match Only</option>
          </select>
        </div>
        <p className="text-slate-500 font-medium">
          Showing <strong className="text-slate-900">{filteredJobs.length}</strong> matching vacancies
        </p>
      </div>

      {/* 4. Job Listings Feed */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const isApplied = appliedJobs.includes(job.jobId);

          return (
            <div 
              key={job.jobId} 
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-700">
                      {job.employmentType}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-600">{job.companyName}</p>
                  <p className="text-[11px] text-slate-500">📍 {job.location} • 💼 {job.salaryRange}</p>
                </div>

                {/* Match Percentage Badge */}
                <div className="flex items-center space-x-3 self-start md:self-auto">
                  <div className="text-right">
                    <div className="text-lg font-black text-slate-900">{job.matchScore}%</div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Match Score</p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-extrabold border ${
                    job.matchScore >= 90 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : job.matchScore >= 75 
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200' 
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {job.matchScore >= 90 ? ' High' : ' Good'}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2">{job.description}</p>

              {/* Skills required tag cloud */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {job.requiredSkills.map((reqSkill, idx) => {
                    const isMatched = TRAINEE_PROFILE.skills.includes(reqSkill);
                    return (
                      <span 
                        key={idx} 
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                          isMatched 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}
                      >
                        {isMatched ? '✓ ' : ''}{reqSkill}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Match Factors Explanation */}
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1 text-xs">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Why this matches you:</p>
                <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5">
                  {job.matchFactors.map((factor, fIdx) => (
                    <li key={fIdx}>{factor}</li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">Job ID: {job.jobId}</span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all"
                  >
                    View Details
                  </button>
                  <button 
                    disabled={isApplied}
                    onClick={() => handleApply(job.jobId)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      isApplied 
                        ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isApplied ? '✓ Applied' : 'Apply Now'}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 5. Modal for Detailed View */}
      {selectedJob && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">{selectedJob.title}</h2>
                <p className="text-xs text-indigo-600 font-semibold">{selectedJob.companyName}</p>
              </div>
              <button 
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="font-bold text-slate-700">Description</p>
                <p className="text-slate-600 mt-0.5">{selectedJob.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Salary Offer</p>
                  <p className="font-bold text-slate-900">{selectedJob.salaryRange}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Location</p>
                  <p className="font-bold text-slate-900">{selectedJob.location}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
              <button 
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  handleApply(selectedJob.jobId);
                  setSelectedJob(null);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-xs"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}