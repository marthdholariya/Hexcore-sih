import React, { useState } from 'react';

// Mock dataset strictly mirroring Schema: jobs (jobs, job_skills, job_market_data)
const MOCK_MARKET_INTELLIGENCE = {
  // Aggregate Market Stats
  summary: {
    active_postings: 1248,
    top_demanded_sector: "Information Technology",
    avg_min_salary: 45000.00,
    avg_max_salary: 85000.00,
    high_demand_skills_count: 14
  },

  // Table: job_market_data
  marketDemandTrends: [
    {
      market_data_id: "mkt-101-uuid",
      skill_id: "skl-react-01",
      skill_name: "React.js",
      sector: "Information Technology",
      job_role: "Frontend Engineer",
      location: "Mumbai",
      time_period: "Q3 2026",
      demand_level: "High",
      job_postings_count: 420,
      trend: "Increasing"
    },
    {
      market_data_id: "mkt-102-uuid",
      skill_id: "skl-docker-02",
      skill_name: "Docker & Kubernetes",
      sector: "DevOps & Cloud",
      job_role: "Cloud Specialist",
      location: "Pune",
      time_period: "Q3 2026",
      demand_level: "Critical",
      job_postings_count: 310,
      trend: "Rapid Growth"
    },
    {
      market_data_id: "mkt-103-uuid",
      skill_id: "skl-python-03",
      skill_name: "Python Data Pipelines",
      sector: "Data & AI",
      job_role: "Data Engineer",
      location: "Bengaluru",
      time_period: "Q3 2026",
      demand_level: "High",
      job_postings_count: 280,
      trend: "Stable"
    }
  ],

  // Table: jobs joined with job_skills
  activeJobPostings: [
    {
      job_id: "job-801-uuid",
      employer_id: "emp-techcorp-uuid",
      title: "Senior Full Stack Developer",
      sector: "Information Technology",
      location: "Mumbai",
      district: "Mumbai Suburban",
      state: "Maharashtra",
      employment_type: "Full-Time",
      salary_min: 60000.00,
      salary_max: 95000.00,
      experience_required: "2-4 Years",
      education_required: "B.Tech / BCA / MCA",
      posted_date: "2026-08-28",
      closing_date: "2026-09-30",
      status: "Active",
      required_skills: [
        { skill_name: "React.js", required_level: "Advanced" },
        { skill_name: "Node.js", required_level: "Intermediate" },
        { skill_name: "PostgreSQL", required_level: "Intermediate" }
      ]
    },
    {
      job_id: "job-802-uuid",
      employer_id: "emp-cloudsys-uuid",
      title: "Junior Cloud Infrastructure Associate",
      sector: "Cloud Operations",
      location: "Pune",
      district: "Pune",
      state: "Maharashtra",
      employment_type: "Full-Time",
      salary_min: 40000.00,
      salary_max: 60000.00,
      experience_required: "0-2 Years",
      education_required: "Diploma / B.Sc CS",
      posted_date: "2026-09-01",
      closing_date: "2026-10-15",
      status: "Active",
      required_skills: [
        { skill_name: "Linux Admin", required_level: "Intermediate" },
        { skill_name: "AWS Basics", required_level: "Beginner" }
      ]
    }
  ]
};

export default function JobMarketIntelligence() {
  const [activeTab, setActiveTab] = useState('trends'); // 'trends' | 'jobs'
  const [selectedSector, setSelectedSector] = useState('ALL');

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded-md border border-teal-800/50">
            Schema: jobs (Job Market Data & Demand)
          </span>
          <h1 className="text-xl font-bold mt-2">Job Market Intelligence Engine</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time industry demand analysis, skill level requirements, and salary benchmarks.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'trends' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📈 Market Demand (`job_market_data`)
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'jobs' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            💼 Live Postings (`jobs` & `job_skills`)
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Active Market Postings</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{MOCK_MARKET_INTELLIGENCE.summary.active_postings}</p>
          <p className="text-[10px] text-teal-600 font-mono font-bold">status = 'Active'</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Primary Demand Sector</p>
          <p className="text-base font-black text-teal-600 mt-2 truncate">{MOCK_MARKET_INTELLIGENCE.summary.top_demanded_sector}</p>
          <p className="text-[10px] text-slate-500 font-mono">sector field</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Avg Salary Range</p>
          <p className="text-lg font-black text-emerald-600 mt-1">
            ${(MOCK_MARKET_INTELLIGENCE.summary.avg_min_salary / 1000).toFixed(0)}k - ${(MOCK_MARKET_INTELLIGENCE.summary.avg_max_salary / 1000).toFixed(0)}k
          </p>
          <p className="text-[10px] font-mono text-slate-500">salary_min to salary_max</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Critical Skill Triggers</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">{MOCK_MARKET_INTELLIGENCE.summary.high_demand_skills_count}</p>
          <p className="text-[10px] text-indigo-600 font-bold">demand_level = 'Critical'</p>
        </div>
      </div>

      {/* Main Dynamic View */}
      {activeTab === 'trends' ? (
        /* Market Demand View: job_market_data Table */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4 p-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Skill Market Demand Metrics (`job_market_data`)
              </h2>
              <p className="text-xs text-slate-500">Aggregated demand tracking by skill, job role, and region</p>
            </div>
            <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded">
              Timeframe: Q3 2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Skill & Role</th>
                  <th className="py-3 px-4">Sector</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4 text-center">Postings Count</th>
                  <th className="py-3 px-4 text-center">Demand Level</th>
                  <th className="py-3 px-4 text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_MARKET_INTELLIGENCE.marketDemandTrends.map((row) => (
                  <tr key={row.market_data_id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{row.skill_name}</p>
                      <p className="text-[10px] text-slate-500">{row.job_role}</p>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">{row.sector}</td>
                    <td className="py-3.5 px-4 text-slate-600">{row.location}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-900">{row.job_postings_count}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded ${
                        row.demand_level === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-teal-100 text-teal-800'
                      }`}>
                        {row.demand_level}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-600">{row.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Live Jobs View: jobs & job_skills Table */
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">
              Employer Postings & Skill Level Requirements (`jobs` + `job_skills`)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_MARKET_INTELLIGENCE.activeJobPostings.map((job) => (
                <div key={job.job_id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{job.title}</h3>
                      <p className="text-[10px] text-slate-500">{job.sector} • {job.location}, {job.state}</p>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] font-extrabold rounded bg-emerald-100 text-emerald-800">
                      {job.employment_type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-2.5 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase block">Salary Range</span>
                      <span className="font-bold text-slate-800">${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase block">Education</span>
                      <span className="font-bold text-slate-800 truncate block">{job.education_required}</span>
                    </div>
                  </div>

                  {/* job_skills mapping */}
                  <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase mb-1.5">
                      Required Skills (`job_skills`)
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.required_skills.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-[10px] font-medium bg-slate-200 text-slate-800 rounded-md">
                          {s.skill_name} <strong className="text-indigo-600">({s.required_level})</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-200/60">
                    <span>Posted: {job.posted_date}</span>
                    <span>Closes: {job.closing_date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}