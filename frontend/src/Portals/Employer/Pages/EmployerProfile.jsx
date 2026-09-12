import React, { useState } from "react";

export default function EmployerProfile() {
  const [profile, setProfile] = useState({
    companyName: "TechCorp Solutions Pvt Ltd",
    registrationId: "EMP-MH-2026-998",
    industrySector: "IT & Software Services",
    companyType: "Private Limited",
    companySize: "250 - 500 Employees",
    gstNumber: "27AAACT12341ZM",
    hrContactName: "Priya Sharma",
    hrEmail: "hr@techcorp.co.in",
    hrPhone: "+91 98230 12345",
    address: "Plot 12, Rajiv Gandhi Infotech Park, Phase 2, Hinjewadi",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411057",
    verificationStatus: "Verified",
    joinedDate: "15 Jan 2025",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Employer Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f0f4f9] p-6 space-y-6 font-sans text-[#0f172a]">
      
      {/* Top Banner Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-[#eef2ff] border border-[#c7d2fe] text-[#4338ca] text-[11px] font-bold px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#4f46e5]"></span>
            <span>Employer Account Overview</span>
          </div>
          <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">
            Employer Profile & Verification
          </h1>
          <p className="text-xs text-[#64748b] font-medium">
            Manage corporate details, official contact info, and MSSDS verification standing.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl border border-[#cbd5e1] text-xs font-bold text-[#475569] hover:bg-[#f8fafc] transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2.5 rounded-xl bg-[#4f46e5] text-white text-xs font-bold hover:bg-[#4338ca] transition-all shadow-xs"
              >
                Save Profile Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2.5 rounded-xl bg-[#4f46e5] text-white text-xs font-bold hover:bg-[#4338ca] transition-all shadow-xs flex items-center space-x-2"
            >
              <span>✏️</span>
              <span>Edit Organization Details</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Organization Summary & Verification Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-5 text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-[#eef2ff] border border-[#c7d2fe] flex items-center justify-center text-2xl font-black text-[#4338ca] shadow-xs">
              🏢
            </div>
            
            <div>
              <h2 className="text-lg font-bold text-[#0f172a]">{profile.companyName}</h2>
              <p className="text-xs text-[#64748b] font-mono mt-0.5">{profile.registrationId}</p>
            </div>

            <div className="inline-flex items-center space-x-1.5 bg-[#dcfce7] border border-[#bbf7d0] text-[#15803d] text-xs font-bold px-3 py-1 rounded-full">
              <span>✓</span>
              <span>MSSDS Verified Employer</span>
            </div>

            <div className="pt-4 border-t border-[#f1f5f9] text-left space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Registered On:</span>
                <span className="font-bold text-[#0f172a]">{profile.joinedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Company Type:</span>
                <span className="font-bold text-[#0f172a]">{profile.companyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Sector:</span>
                <span className="font-bold text-[#0f172a]">{profile.industrySector}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold uppercase text-[#94a3b8] tracking-wider">
              Verification Overview
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-[#f8fafc] rounded-xl border border-[#f1f5f9] flex justify-between items-center">
                <span className="text-xs font-medium text-[#64748b]">GST Verification</span>
                <span className="text-xs font-bold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded">PASSED</span>
              </div>
              <div className="p-3 bg-[#f8fafc] rounded-xl border border-[#f1f5f9] flex justify-between items-center">
                <span className="text-xs font-medium text-[#64748b]">Trainee Outcome Claims</span>
                <span className="text-xs font-bold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded">128 Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2-Columns: Profile Form Details */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-6">
            
            {/* Section 1: Corporate Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#0f172a] border-b border-[#f1f5f9] pb-3 flex items-center space-x-2">
                <span>🏢</span>
                <span>Corporate Registration Details</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#64748b] mb-1">Company Legal Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={profile.companyName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0f172a] focus:outline-none focus:border-[#4f46e5] disabled:opacity-70"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#64748b] mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={profile.gstNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-[#0f172a] focus:outline-none focus:border-[#4f46e5] disabled:opacity-70"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#64748b] mb-1">Industry Sector</label>
                  <input
                    type="text"
                    name="industrySector"
                    value={profile.industrySector}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0f172a] focus:outline-none focus:border-[#4f46e5] disabled:opacity-70"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#64748b] mb-1">Company Size</label>
                  <input
                    type="text"
                    name="companySize"
                    value={profile.companySize}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0f172a] focus:outline-none focus:border-[#4f46e5] disabled:opacity-70"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Authorized HR Contact Info */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-[#0f172a] border-b border-[#f1f5f9] pb-3 flex items-center space-x-2">
                <span>👤</span>
                <span>Authorized HR Nodal Officer</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#64748b] mb-1">HR Manager Name</label>
                  <input
                    type="text"
                    name="hrContactName"
                    value={profile.hrContactName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0f172a] focus:outline-none focus:border-[#4f46e5] disabled:opacity-70"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#64748b] mb-1">Official HR Email</label>
                  <input
                    type="email"
                    name="hrEmail"
                    value={profile.hrEmail}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0f172a] focus:outline-none focus:border-[#4f46e5] disabled:opacity-70"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#64748b] mb-1">Contact Phone</label>
                  <input
                    type="text"
                    name="hrPhone"
                    value={profile.hrPhone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0f172a] focus:outline-none focus:border-[#4f46e5] disabled:opacity-70"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Workplace Address */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-[#0f172a] border-b border-[#f1f5f9] pb-3 flex items-center space-x-2">
                <span>📍</span>
                <span>Registered Work Address</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-[#64748b] mb-1">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0f172a] focus:outline-none focus:border-[#4f46e5] disabled:opacity-70"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#64748b] mb-1">City / District</label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0f172a] focus:outline-none focus:border-[#4f46e5] disabled:opacity-70"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#64748b] mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={profile.state}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0f172a] focus:outline-none focus:border-[#4f46e5] disabled:opacity-70"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#64748b] mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={profile.pincode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-[#0f172a] focus:outline-none focus:border-[#4f46e5] disabled:opacity-70"
                  />
                </div>
              </div>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}