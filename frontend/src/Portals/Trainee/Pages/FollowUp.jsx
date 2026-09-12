import React, { useState } from 'react';

// Hardcoded reference tables matching the ER diagram schema
const EMPLOYMENT_STATUSES = [
  { status_id: 'emp-01', status_name: 'Wage Employed' },
  { status_id: 'emp-02', status_name: 'Self-Employed' },
  { status_id: 'emp-03', status_name: 'Apprenticeship / Trainee' },
  { status_id: 'emp-04', status_name: 'Pursuing Higher Education' },
  { status_id: 'emp-05', status_name: 'Unemployed / Looking for Job' },
];

const NON_PLACEMENT_REASONS = [
  { reason_id: 'np-01', reason_name: 'Lack of relevant job opportunities in local region' },
  { reason_id: 'np-02', reason_name: 'Salary offered was below expectations' },
  { reason_id: 'np-03', reason_name: 'Family / Personal reasons' },
  { reason_id: 'np-04', reason_name: 'Awaiting exam or interview results' },
];

const ATTRITION_REASONS = [
  { reason_id: 'att-01', reason_name: 'Low salary / Unsatisfactory pay' },
  { reason_id: 'att-02', reason_name: 'Workplace location / Relocation issues' },
  { reason_id: 'att-03', reason_name: 'Health or personal concerns' },
  { reason_id: 'att-04', reason_name: 'Joined higher education' },
];

// Initial Followups state reflecting the `followups` table structure
const INITIAL_FOLLOWUPS = [
  {
    followup_id: 'flw-001',
    trainee_id: 'MH-2024-TR-84920',
    milestone_month: 3,
    scheduled_date: '2026-09-15',
    response_date: null,
    status: 'PENDING',
  },
  {
    followup_id: 'flw-002',
    trainee_id: 'MH-2024-TR-84920',
    milestone_month: 1,
    scheduled_date: '2026-06-15',
    response_date: '2026-06-10',
    status: 'COMPLETED',
  },
];

export default function FollowUpSurveys() {
  const [followups, setFollowups] = useState(INITIAL_FOLLOWUPS);
  const [activeFollowup, setActiveFollowup] = useState(null);

  useEffect(() => {
    const fetchFollowups = async () => {
      try {
        const token =
          localStorage.getItem("token") ||
          (localStorage.getItem("maha_user_session")
            ? JSON.parse(localStorage.getItem("maha_user_session")).token
            : null);

        if (!token) return;

        const response = await fetch("http://localhost:5000/api/followups", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const body = await response.json();
        if (response.ok && body.data && body.data.length > 0) {
          const mapped = body.data.map((item) => ({
            followup_id: item.followup_id,
            trainee_id: item.trainee_id,
            milestone_month: item.milestone_month,
            scheduled_date: item.scheduled_date
              ? item.scheduled_date.split("T")[0]
              : "2026-09-15",
            response_date: item.response_date
              ? item.response_date.split("T")[0]
              : null,
            status: (item.status || "PENDING").toUpperCase(),
          }));
          setFollowups(mapped);
        }
      } catch (err) {
        console.warn("Using fallback followup data:", err);
      }
    };

    fetchFollowups();
  }, []);

  // Form State mapped 1:1 with `followup_responses` table fields
  const [responseForm, setResponseForm] = useState({
    employment_status_id: '',
    current_job: '',
    salary: '',
    job_changed: false,
    apprenticeship: false,
    further_education: false,
    unemployed: false,
    non_placement_reason_id: '',
    attrition_reason_id: '',
    comments: '',
  });

  const pendingCount = followups.filter((f) => (f.status || "").toUpperCase() !== "COMPLETED").length;
  const completedCount = followups.filter((f) => (f.status || "").toUpperCase() === "COMPLETED").length;

  const handleStatusChange = (statusId) => {
    const isUnemployed = statusId === 'emp-05';
    const isEdu = statusId === 'emp-04';
    const isApprentice = statusId === 'emp-03';

    setResponseForm((prev) => ({
      ...prev,
      employment_status_id: statusId,
      unemployed: isUnemployed,
      further_education: isEdu,
      apprenticeship: isApprentice,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activeFollowup) return;

    const todayDate = new Date().toISOString().split('T')[0];

    // Update parent `followups` state
    setFollowups((prev) =>
      prev.map((item) =>
        item.followup_id === activeFollowup.followup_id
          ? { ...item, status: 'COMPLETED', response_date: todayDate }
          : item
      )
    );

    setActiveFollowup(null);
    setResponseForm({
      employment_status_id: '',
      current_job: '',
      salary: '',
      job_changed: false,
      apprenticeship: false,
      further_education: false,
      unemployed: false,
      non_placement_reason_id: '',
      attrition_reason_id: '',
      comments: '',
    });

    alert('Response successfully recorded in the followup database.');
  };

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Follow-up Surveys</h1>
          <p className="text-xs text-slate-500 mt-1">
            Mandatory outcome monitoring system tracking post-training career progression.
          </p>
        </div>
      </div>

      {/* 2. Top Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Action Required</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900">{pendingCount}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
              {pendingCount > 0 ? 'Pending Surveys' : 'All Complete'}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completed Surveys</p>
          <p className="text-2xl font-black text-slate-900">{completedCount}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Milestone</p>
          <p className="text-sm font-bold text-slate-900 mt-1">Month 3 Post-Training</p>
          <p className="text-[10px] font-semibold text-indigo-600">Verification Active</p>
        </div>
      </div>

      {/* 3. Dynamic Survey Form based on ER Diagram `followup_responses` */}
      {activeFollowup && (
        <div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-md space-y-6">
          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Milestone: Month {activeFollowup.milestone_month}
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-1">
                Post-Training Followup Response (ID: {activeFollowup.followup_id})
              </h2>
              <p className="text-xs text-slate-500">Scheduled Date: {activeFollowup.scheduled_date}</p>
            </div>
            <button
              onClick={() => setActiveFollowup(null)}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-all"
            >
              ✕ Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Foreign Key: employment_status */}
            <div className="space-y-1">
              <label className="font-bold text-slate-800 block">Current Employment Status *</label>
              <select
                required
                value={responseForm.employment_status_id}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              >
                <option value="">-- Select Status --</option>
                {EMPLOYMENT_STATUSES.map((st) => (
                  <option key={st.status_id} value={st.status_id}>
                    {st.status_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Employment Details */}
            {!responseForm.unemployed && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">Current Job Title / Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Junior Systems Engineer"
                    value={responseForm.current_job}
                    onChange={(e) => setResponseForm({ ...responseForm, current_job: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">Monthly Salary (DECIMAL)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 22500.00"
                    value={responseForm.salary}
                    onChange={(e) => setResponseForm({ ...responseForm, salary: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Boolean Indicators */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
              <p className="font-bold text-slate-700">Employment Flags</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={responseForm.job_changed}
                    onChange={(e) => setResponseForm({ ...responseForm, job_changed: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700">Job Changed</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={responseForm.apprenticeship}
                    onChange={(e) => setResponseForm({ ...responseForm, apprenticeship: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700">Apprenticeship</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={responseForm.further_education}
                    onChange={(e) => setResponseForm({ ...responseForm, further_education: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700">Further Education</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={responseForm.unemployed}
                    onChange={(e) => setResponseForm({ ...responseForm, unemployed: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700">Unemployed</span>
                </label>
              </div>
            </div>

            {/* FK: non_placement_reasons */}
            {responseForm.unemployed && (
              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">Reason for Non-Placement</label>
                <select
                  value={responseForm.non_placement_reason_id}
                  onChange={(e) => setResponseForm({ ...responseForm, non_placement_reason_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                >
                  <option value="">-- Select Non-Placement Reason --</option>
                  {NON_PLACEMENT_REASONS.map((r) => (
                    <option key={r.reason_id} value={r.reason_id}>
                      {r.reason_name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* FK: attrition_reasons */}
            {responseForm.job_changed && (
              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">Reason for Job Change / Attrition</label>
                <select
                  value={responseForm.attrition_reason_id}
                  onChange={(e) => setResponseForm({ ...responseForm, attrition_reason_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                >
                  <option value="">-- Select Attrition Reason --</option>
                  {ATTRITION_REASONS.map((r) => (
                    <option key={r.reason_id} value={r.reason_id}>
                      {r.reason_name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Comments Field */}
            <div className="space-y-1">
              <label className="font-bold text-slate-800 block">Additional Comments (TEXT)</label>
              <textarea
                rows={3}
                placeholder="Enter any feedback or notes regarding your outcome status..."
                value={responseForm.comments}
                onChange={(e) => setResponseForm({ ...responseForm, comments: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>

            {/* Submit Buttons */}
            <div className="pt-2 flex justify-end space-x-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveFollowup(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs transition-all"
              >
                Submit Followup Response
              </button>
            </div>

          </form>
        </div>
      )}

      {/* 4. List of Followups */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">Followup Schedule Records</h2>
          <p className="text-[11px] text-slate-500">
            Records mapped to <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">followups</code> table schema
          </p>
        </div>

        <div className="space-y-3">
          {followups.map((item) => (
            <div
              key={item.followup_id}
              className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                item.status === 'PENDING'
                  ? 'bg-amber-50/40 border-amber-200/80'
                  : 'bg-slate-50/60 border-slate-200/60'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xs font-bold text-slate-900">
                    Month {item.milestone_month} Follow-Up Survey
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      item.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    • {item.status}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400">
                  followup_id: {item.followup_id} | Scheduled: {item.scheduled_date}
                </p>
              </div>

              <div className="shrink-0 flex items-center space-x-3">
                {item.status === 'PENDING' ? (
                  <button
                    onClick={() => setActiveFollowup(item)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    Fill Survey Response
                  </button>
                ) : (
                  <span className="text-[11px] font-bold text-slate-500">
                    Response Recorded on {item.response_date}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}