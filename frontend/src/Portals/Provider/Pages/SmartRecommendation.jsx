import React, { useState } from 'react';

// Mock Dataset mapped strictly to 'analytics.recommendations' and related schemas
const MOCK_RECOMMENDATIONS = [
  {
    recommendation_id: "rec-101-uuid",
    user_id: "usr-prv-01-uuid",
    user_type: "Training Provider",
    entity_type: "Course",
    entity_id: "crs-devops-02",
    entity_name: "Cloud Infrastructure & DevOps",
    recommendation_text: "Update curriculum to include Kubernetes Cluster Architecture. Skill gap analysis shows 42% of enrolled trainees fail employer requirements for container orchestration.",
    priority: "HIGH",
    status: "ACTIVE",
    created_at: "2026-09-02 10:30:00",
    // Linked context from predictions & skill_gap_analysis schemas
    insight_context: {
      gap_level: "Critical",
      linked_job_role: "Cloud Specialist",
      risk_level: "High",
      key_factors: "Low hands-on lab submission rate & missing cluster config modules"
    }
  },
  {
    recommendation_id: "rec-102-uuid",
    user_id: "usr-prv-01-uuid",
    user_type: "Training Provider",
    entity_type: "Trainee Cohort",
    entity_id: "cht-fullstack-2026",
    entity_name: "Full-Stack Web Dev - Batch B",
    recommendation_text: "Schedule targeted 1-on-1 remedial sessions for 18 trainees flagged with high non-placement probability prior to final assessments.",
    priority: "HIGH",
    status: "ACTIVE",
    created_at: "2026-09-01 14:15:00",
    insight_context: {
      gap_level: "Moderate",
      linked_job_role: "Frontend Engineer",
      risk_level: "Medium",
      key_factors: "Low performance on REST API integration assessments"
    }
  },
  {
    recommendation_id: "rec-103-uuid",
    user_id: "usr-prv-01-uuid",
    user_type: "Training Provider",
    entity_type: "Job Market Strategy",
    entity_id: "mkt-data-eng-2026",
    entity_name: "Data Engineering Pipeline Training",
    recommendation_text: "Expand seat capacity by 25% for Data Engineering. Market intelligence shows a 35% surge in Pune and Bengaluru region job postings.",
    priority: "MEDIUM",
    status: "COMPLETED",
    created_at: "2026-08-28 09:00:00",
    insight_context: {
      gap_level: "Low",
      linked_job_role: "Data Engineer",
      risk_level: "Low",
      key_factors: "High employer demand outstripping current certified trainee supply"
    }
  }
];

export default function ProviderRecommendations() {
  const [recommendations, setRecommendations] = useState(MOCK_RECOMMENDATIONS);
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ACTIVE');

  // Filter logic
  const filteredData = recommendations.filter((item) => {
    const matchesPriority = priorityFilter === 'ALL' || item.priority === priorityFilter;
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesPriority && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    setRecommendations((prev) =>
      prev.map((item) =>
        item.recommendation_id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-400 bg-pink-950/80 px-2.5 py-1 rounded-md border border-pink-800/50">
            Schema: analytics (recommendations & predictions)
          </span>
          <h1 className="text-xl font-bold mt-2">Provider Smart Recommendations</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            AI-generated actionable insights to optimize skilling curricula, mitigate placement risks, and align with market trends.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-800 p-2 rounded-xl border border-slate-700">
          <div className="text-right px-2">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase">Active Engine</p>
            <p className="text-xs font-mono font-bold text-pink-400">ML-Rec-v2.4</p>
          </div>
        </div>
      </div>

      {/* Control Bar & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="text-[10px] font-extrabold text-slate-400 uppercase block mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE font-bold">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="DISMISSED">Dismissed</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-extrabold text-slate-400 uppercase block mb-1">Priority Level</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="ALL">All Priorities</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="LOW">Low Priority</option>
            </select>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Showing {filteredData.length} of {recommendations.length} Recommendations
        </span>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
            No recommendations match the selected filters.
          </div>
        ) : (
          filteredData.map((item) => (
            <div
              key={item.recommendation_id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase rounded-md ${
                    item.priority === 'HIGH'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {item.priority} Priority
                  </span>
                  <span className="text-xs font-bold text-slate-900">{item.entity_name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({item.entity_type})</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-slate-400">{item.created_at}</span>
                  <span className={`px-2 py-0.5 text-[9px] font-extrabold uppercase rounded ${
                    item.status === 'ACTIVE'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Recommendation Body */}
              <div>
                <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                  {item.recommendation_text}
                </p>
              </div>

              {/* Linked AI Insights Context (`predictions` + `skill_gap_analysis`) */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                <div>
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase block">Target Job Role</span>
                  <span className="font-bold text-slate-700">{item.insight_context.linked_job_role}</span>
                </div>
                <div>
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase block">Risk & Skill Gap Level</span>
                  <span className="font-bold text-rose-600">
                    {item.insight_context.risk_level} Risk ({item.insight_context.gap_level} Gap)
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase block">Root Key Factor</span>
                  <span className="font-medium text-slate-600 truncate block">{item.insight_context.key_factors}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end items-center space-x-2 pt-1">
                {item.status === 'ACTIVE' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(item.recommendation_id, 'DISMISSED')}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.recommendation_id, 'COMPLETED')}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 shadow-xs transition-colors"
                    >
                      Mark as Implemented
                    </button>
                  </>
                )}
                {item.status !== 'ACTIVE' && (
                  <button
                    onClick={() => handleStatusChange(item.recommendation_id, 'ACTIVE')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    Reopen Insight
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}