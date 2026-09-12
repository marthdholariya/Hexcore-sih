import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/employment";

export default function EmploymentEvidence() {
  const [employment, setEmployment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployment = async () => {
      try {
        const token =
          localStorage.getItem("token") ||
          (localStorage.getItem("maha_user_session")
            ? JSON.parse(localStorage.getItem("maha_user_session")).token
            : null);

        if (!token) {
          throw new Error("Authentication token not found. Please log in.");
        }

        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch employment data");
        }

        setEmployment(result.data || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployment();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-sm font-semibold text-slate-500">
          Loading employment data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-red-700">
        <p className="font-bold">Unable to load employment data</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  const currentEmployment = employment.find(
    (item) => item.employment_status === "Employed"
  );

  const allEvidence = employment.flatMap((item) => item.evidence || []);

  const totalEvidence = allEvidence.length;

  const verifiedEvidence = allEvidence.filter(
    (item) => item.verification_status === "Verified"
  ).length;

  const formatSalary = (amount, type) => {
    if (!amount) return "Not Available";

    const salary = Number(amount);

    if (type === "Annual") {
      return `₹${salary.toLocaleString("en-IN")}`;
    }

    return `₹${salary.toLocaleString("en-IN")}`;
  };

  const formatDate = (date) => {
    if (!date) return "Not Available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6 font-sans text-slate-800">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Employment & Evidence
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Track verified employment history, salary slips, offer letters,
            and verification status.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm">
          ⬆ Upload New Evidence
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Employment Status
          </p>

          <p className="text-xl font-black text-slate-900 mt-2">
            {currentEmployment?.employment_status || "Not Available"}
          </p>

          <span className="inline-block mt-2 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200">
            ✓ {currentEmployment?.verified_status || "Not Verified"}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Current Salary
          </p>

          <p className="text-xl font-black text-slate-900 mt-2">
            {formatSalary(
              currentEmployment?.salary_amount,
              currentEmployment?.salary_type
            )}
          </p>

          <p className="text-[10px] font-semibold text-slate-500 mt-2">
            {currentEmployment?.salary_type || "Not Available"}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Current Employer
          </p>

          <p className="text-base font-black text-slate-900 mt-2">
            {currentEmployment?.company_name || "Not Available"}
          </p>

          <p className="text-[10px] font-semibold text-slate-500 mt-1">
            {currentEmployment?.industry_sector || "Not Available"}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Documents Verified
          </p>

          <p className="text-xl font-black text-slate-900 mt-2">
            {verifiedEvidence} / {totalEvidence}
          </p>

          <p className="text-[10px] font-semibold text-indigo-600 mt-2">
            All available evidence
          </p>
        </div>

      </div>

      {/* Employment Record */}
      {employment.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <p className="font-bold text-slate-700">
            No employment records found.
          </p>
        </div>
      ) : (
        employment.map((item) => (
          <div
            key={item.employment_id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
          >

            {/* Company Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl">
                  🏢
                </div>

                <div>
                  <h2 className="text-base font-black text-slate-900">
                    {item.company_name}
                  </h2>

                  <p className="text-xs text-slate-500 mt-1">
                    {item.job_role}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                ✓ {item.verified_status || item.employment_status}
              </span>

            </div>

            {/* Employment Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Employment Type
                </p>

                <p className="text-sm font-bold text-slate-900 mt-1">
                  {item.employment_type || "Not Available"}
                </p>

                <p className="text-[10px] text-slate-500 mt-1">
                  {item.employment_status}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Date of Joining
                </p>

                <p className="text-sm font-bold text-slate-900 mt-1">
                  {formatDate(item.joining_date)}
                </p>

                <p className="text-[10px] text-slate-500 mt-1">
                  Current employment
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Work Location
                </p>

                <p className="text-sm font-bold text-slate-900 mt-1">
                  {item.location || "Not Available"}
                </p>

                <p className="text-[10px] text-slate-500 mt-1">
                  {item.employer_district}, {item.employer_state}
                </p>
              </div>

            </div>

            {/* Salary + Verification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Salary
                </p>

                <p className="text-lg font-black text-slate-900 mt-1">
                  {formatSalary(item.salary_amount, item.salary_type)}
                </p>

                <p className="text-[10px] text-slate-500 mt-1">
                  {item.salary_type} • {item.salary_source}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Verification
                </p>

                <p className="text-sm font-bold text-emerald-700 mt-1">
                  ✓ {item.verified_status || "Not Verified"}
                </p>

                <p className="text-[10px] text-slate-500 mt-1">
                  Verified by {item.verified_by || "Not Available"} •{" "}
                  {formatDate(item.verification_date)}
                </p>
              </div>

            </div>

            {/* Evidence */}
            <div className="mt-6">

              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    Verified Evidence Vault
                  </h3>

                  <p className="text-[10px] text-slate-500 mt-1">
                    Documents verified against employment records.
                  </p>
                </div>

                <span className="text-[10px] font-bold text-indigo-600">
                  {item.evidence?.length || 0} Documents
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">

                {item.evidence?.length > 0 ? (
                  item.evidence.map((document) => (
                    <div
                      key={document.evidence_id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 border-b last:border-b-0 border-slate-100"
                    >

                      <div className="flex items-center gap-3">
                        <div className="text-lg">
                          📄
                        </div>

                        <div>
                          <p className="text-xs font-bold text-slate-900">
                            {document.evidence_type}
                          </p>

                          <p className="text-[10px] text-slate-500 mt-1">
                            Uploaded {formatDate(document.upload_date)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">

                        <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold">
                          ✓ {document.verification_status}
                        </span>

                        <a
                          href={document.evidence_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-50"
                        >
                          View
                        </a>

                      </div>

                    </div>
                  ))
                ) : (
                  <div className="p-5 text-center text-xs text-slate-500">
                    No evidence documents available.
                  </div>
                )}

              </div>

            </div>

          </div>
        ))
      )}

    </div>
  );
}