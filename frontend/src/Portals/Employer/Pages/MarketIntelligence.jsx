import React, { useState } from "react";

export default function MarketIntelligence() {
  const [selectedRegion, setSelectedRegion] = useState("All Maharashtra");
  const [selectedSector, setSelectedSector] = useState("IT & Software");

  // Sample Market Data derived from skill demand and outcome tracking models
  const topDemandSkills = [
    { name: "React.js / Frontend", growth: "+34%", demandLevel: "High", openings: 1420, avgSalary: "₹4.2 LPA" },
    { name: "Cloud Infrastructure (AWS/Azure)", growth: "+28%", demandLevel: "Very High", openings: 980, avgSalary: "₹5.5 LPA" },
    { name: "Python / Data Analytics", growth: "+22%", demandLevel: "High", openings: 850, avgSalary: "₹4.8 LPA" },
    { name: "DevOps & CI/CD Pipelines", growth: "+19%", demandLevel: "Moderate", openings: 620, avgSalary: "₹6.0 LPA" },
  ];

  const regionalHiringHubs = [
    { city: "Pune", share: "38%", activeJobs: 3200, topSector: "IT & Auto Engineering" },
    { city: "Mumbai Metropolitan (MMR)", share: "32%", activeJobs: 2850, topSector: "BFSI & Tech Services" },
    { city: "Nagpur", share: "16%", activeJobs: 1400, topSector: "Logistics & Software" },
    { city: "Nashik", share: "14%", activeJobs: 1150, topSector: "Manufacturing & IOT" },
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f9] p-6 space-y-6 font-sans text-[#0f172a]">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#eef2ff] border border-[#c7d2fe] text-[#4338ca] text-[11px] font-bold px-3 py-1 rounded-full mb-2">
            <span className="w-2 h-2 rounded-full bg-[#4f46e5]"></span>
            <span>Market Analytics & Salary Benchmarking</span>
          </div>
          <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">
            Job Market Intelligence
          </h1>
          <p className="text-xs text-[#64748b] font-medium mt-0.5">
            Real-time insights on high-demand skills, salary standards, and regional hiring patterns across Maharashtra.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="bg-[#f8fafc] border border-[#cbd5e1] text-[#0f172a] text-xs font-bold rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#4f46e5]"
          >
            <option value="IT & Software">IT & Software</option>
            <option value="Automotive & Manufacturing">Automotive & Manufacturing</option>
            <option value="Healthcare & Tech">Healthcare & Tech</option>
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-[#f8fafc] border border-[#cbd5e1] text-[#0f172a] text-xs font-bold rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#4f46e5]"
          >
            <option value="All Maharashtra">All Maharashtra</option>
            <option value="Pune Region">Pune Region</option>
            <option value="MMR Region">MMR Region</option>
          </select>
        </div>
      </div>

      {/* Top Stat Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-1">
          <p className="text-[10px] font-extrabold text-[#94a3b8] uppercase tracking-wider">Active Openings</p>
          <p className="text-2xl font-black text-[#0f172a]">8,600+</p>
          <p className="text-xs text-[#15803d] font-bold">↑ 14% vs Last Month</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-1">
          <p className="text-[10px] font-extrabold text-[#94a3b8] uppercase tracking-wider">Average Entry Package</p>
          <p className="text-2xl font-black text-[#4f46e5]">₹4.5 LPA</p>
          <p className="text-xs text-[#64748b] font-medium">Statewide Baseline</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-1">
          <p className="text-[10px] font-extrabold text-[#94a3b8] uppercase tracking-wider">Highest Demand Skill</p>
          <p className="text-2xl font-black text-[#0f172a]">React.js</p>
          <p className="text-xs text-[#15803d] font-bold">34% YoY Growth</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-1">
          <p className="text-[10px] font-extrabold text-[#94a3b8] uppercase tracking-wider">Talent Supply Index</p>
          <p className="text-2xl font-black text-[#d97706]">Moderate</p>
          <p className="text-xs text-[#64748b] font-medium">Candidate to Job Ratio 2.4:1</p>
        </div>
      </div>

      {/* Main Grid: Demand Skills & Regional Hubs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: High Demand Skills Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#0f172a]">High-Demand Skill Competencies</h2>
              <p className="text-xs text-[#64748b]">Skill sets showing maximum hiring activity and employer demand.</p>
            </div>
            <span className="text-xs font-bold text-[#4338ca] bg-[#eef2ff] px-3 py-1 rounded-full border border-[#c7d2fe]">
              {selectedSector}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#f1f5f9] text-[#94a3b8] uppercase text-[10px] font-extrabold">
                  <th className="pb-3">Skill Set</th>
                  <th className="pb-3">YoY Demand Growth</th>
                  <th className="pb-3">Active Openings</th>
                  <th className="pb-3">Benchmark CTC</th>
                  <th className="pb-3 text-right">Demand Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {topDemandSkills.map((skill, index) => (
                  <tr key={index} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="py-3.5 font-bold text-[#0f172a]">{skill.name}</td>
                    <td className="py-3.5 font-bold text-[#15803d]">{skill.growth}</td>
                    <td className="py-3.5 font-mono text-[#64748b]">{skill.openings} Jobs</td>
                    <td className="py-3.5 font-bold text-[#4338ca]">{skill.avgSalary}</td>
                    <td className="py-3.5 text-right">
                      <span className="bg-[#eef2ff] text-[#4338ca] border border-[#c7d2fe] px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase">
                        {skill.demandLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Regional Hiring Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-4">
          <div className="border-b border-[#f1f5f9] pb-3">
            <h2 className="text-base font-bold text-[#0f172a]">Regional Talent Hubs</h2>
            <p className="text-xs text-[#64748b]">Geographic distribution of openings in Maharashtra.</p>
          </div>

          <div className="space-y-3">
            {regionalHiringHubs.map((hub, i) => (
              <div key={i} className="p-3.5 bg-[#f8fafc] rounded-xl border border-[#f1f5f9] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#0f172a]">{hub.city}</span>
                  <span className="font-mono font-bold text-[#4f46e5]">{hub.share} Share</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#4f46e5] h-full rounded-full"
                    style={{ width: hub.share }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-[11px] text-[#64748b]">
                  <span>{hub.activeJobs} Active Listings</span>
                  <span>{hub.topSector}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}