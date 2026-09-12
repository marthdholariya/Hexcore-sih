import React, { useState } from 'react';

// Mock dataset strictly mirroring the ER Diagram 'training_effectiveness' schema
const MOCK_EFFECTIVENESS_DATA = [
  {
    effectiveness_id: "eff-101-uuid",
    course_id: "crs-web-01",
    course_name: "Full-Stack Web Development",
    provider_id: "PRV-MH-2026",
    completion_rate: 92.50, // DECIMAL(5,2)
    placement_rate: 88.00,  // DECIMAL(5,2)
    retention_rate: 85.40,  // DECIMAL(5,2)
    avg_starting_salary: 58000.00, // DECIMAL(10,2)
    effectiveness_score: 8.85,    // DECIMAL(5,2)
    calculated_date: "2026-08-31"  // DATE
  },
  {
    effectiveness_id: "eff-102-uuid",
    course_id: "crs-devops-02",
    course_name: "Cloud Infrastructure & DevOps",
    provider_id: "PRV-MH-2026",
    completion_rate: 84.00,
    placement_rate: 76.50,
    retention_rate: 79.00,
    avg_starting_salary: 62500.00,
    effectiveness_score: 7.60,
    calculated_date: "2026-08-31"
  },
  {
    effectiveness_id: "eff-103-uuid",
    course_id: "crs-data-03",
    course_name: "Data Engineering & Analytics",
    provider_id: "PRV-MH-2026",
    completion_rate: 95.10,
    placement_rate: 91.20,
    retention_rate: 89.80,
    avg_starting_salary: 64000.00,
    effectiveness_score: 9.20,
    calculated_date: "2026-09-01"
  }
];

export default function TrainingEffectiveness() {
  const [data] = useState(MOCK_EFFECTIVENESS_DATA);

  // Aggregated Overall Provider Score
  const avgEffectiveness = (data.reduce((acc, curr) => acc + curr.effectiveness_score, 0) / data.length).toFixed(2);
  const avgPlacement = (data.reduce((acc, curr) => acc + curr.placement_rate, 0) / data.length).toFixed(2);
  const avgSalary = (data.reduce((acc, curr) => acc + curr.avg_starting_salary, 0) / data.length).toFixed(2);

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-800/50">
            Schema: planning (training_effectiveness)
          </span>
          <h1 className="text-xl font-bold mt-2">Training Effectiveness Dashboard</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Course-level impact scores based on completion, placement rates, retention, and salary outcomes.
          </p>
        </div>
        <div className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-right">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Provider ID</p>
          <p className="text-xs font-mono font-bold text-purple-300">PRV-MH-2026</p>
        </div>
      </div>

      {/* Aggregate KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Avg Effectiveness Score</p>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-2xl font-black text-purple-600">{avgEffectiveness}</span>
            <span className="text-xs text-slate-400 font-bold">/ 10</span>
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-1">effectiveness_score</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Average Placement Rate</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{avgPlacement}%</p>
          <p className="text-[10px] font-mono text-slate-500 mt-1">placement_rate</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase">Avg Starting Salary</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">${Number(avgSalary).toLocaleString()}</p>
          <p className="text-[10px] font-mono text-slate-500 mt-1">avg_starting_salary</p>
        </div>
      </div>

      {/* Main Table: training_effectiveness Data */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Course Analysis Table (`training_effectiveness`)
            </h2>
            <p className="text-xs text-slate-500">Calculated metrics for evaluating program performance</p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
            {data.length} Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="py-3 px-4">Course & IDs</th>
                <th className="py-3 px-4 text-center">Completion Rate</th>
                <th className="py-3 px-4 text-center">Placement Rate</th>
                <th className="py-3 px-4 text-center">Retention Rate</th>
                <th className="py-3 px-4 text-right">Avg Starting Salary</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4 text-right">Calculated Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((row) => (
                <tr key={row.effectiveness_id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{row.course_name}</p>
                    <p className="text-[10px] font-mono text-slate-400">Course ID: {row.course_id}</p>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                    {row.completion_rate.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-emerald-600">
                    {row.placement_rate.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-indigo-600">
                    {row.retention_rate.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                    ${row.avg_starting_salary.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 text-xs font-black rounded-lg bg-purple-100 text-purple-800">
                      {row.effectiveness_score.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[11px] text-slate-500">
                    {row.calculated_date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}