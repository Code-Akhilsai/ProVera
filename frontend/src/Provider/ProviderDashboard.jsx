import React, { useState } from "react";
import {
  FaShieldAlt,
  FaHome,
  FaUser,
  FaFileAlt,
  FaClipboardList,
  FaBell,
  FaQuestionCircle,
  FaSignOutAlt,
  FaHeadset,
  FaBellSlash,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaFileUpload,
  FaEdit,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProviderDashboard() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Interactive states to test different dashboard UI variants from requirements
  const [applicationStatus, setApplicationStatus] = useState("Not Submitted"); // 'Not Submitted', 'Pending Review', 'Approved', 'Rejected'
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [rejectionRemarks, setRejectionRemarks] = useState(
    "Your license document is unclear. Please re-upload a high-resolution PDF.",
  );

  const menuItems = [
    { name: "Dashboard", icon: <FaHome /> },
    { name: "My Profile", icon: <FaUser /> },
    { name: "Documents", icon: <FaFileAlt /> },
    { name: "Application Status", icon: <FaClipboardList /> },
    { name: "Notifications", icon: <FaBell /> },
    { name: "Help & Support", icon: <FaQuestionCircle /> },
    { name: "Logout", icon: <FaSignOutAlt />, action: () => nav("/login") },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-blue-600 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col justify-between shrink-0 md:flex">
        <div className="p-6 space-y-8">
          {/* Logo Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => nav("/")}
          >
            <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-900/30">
              <FaShieldAlt className="text-lg" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block leading-none">
                ProVera
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase mt-1 block">
                Provider Portal
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {menuItems.map((item, idx) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (item.action) item.action();
                    else setActiveTab(item.name);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-medium transition-colors cursor-pointer ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"}`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Need Help Box */}
        <div className="p-4 m-4 bg-slate-900/80 border border-slate-800/80 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-white font-medium text-xs">
            <FaHeadset className="text-blue-500" />
            <span>Need Help?</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            We're here to help you
          </p>
          <p className="text-[11px] font-semibold text-white">
            +91 98765 43210
          </p>
          <a
            href="mailto:support@provera.com"
            className="text-[11px] text-blue-400 hover:underline block truncate"
          >
            support@provera.com
          </a>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="grow flex flex-col justify-between bg-slate-950 min-w-0">
        {/* Top Header Bar */}
        <header className="h-20 border-b border-slate-900 px-6 lg:px-10 flex items-center justify-between bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-white tracking-tight">
              Welcome, <span className="text-white">Akhil Sai</span> 👋
            </h1>
            <p className="text-xs text-slate-400">
              Manage your profile and track your application
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative cursor-pointer">
              <FaBell className="text-sm" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
                alt="Akhil Sai"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-600/40"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Dynamic Workspace */}
        <main className="grow p-6 lg:p-10 space-y-6 max-w-7xl w-full mx-auto">
          {/* Rejection Notice Banner (Visible only when rejected) */}
          {applicationStatus === "Rejected" && (
            <div className="bg-rose-950/40 border border-rose-900/60 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="bg-rose-900/60 text-rose-400 p-2.5 rounded-xl shrink-0 mt-0.5">
                  <FaTimesCircle className="text-lg" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-sm font-bold text-rose-200">
                    Application Rejected / Revision Required
                  </h2>
                  <p className="text-xs text-rose-300/80 leading-relaxed">
                    <strong className="text-rose-200">
                      Admin's rejection remarks:
                    </strong>{" "}
                    {rejectionRemarks}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setApplicationStatus("Not Submitted")}
                className="bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs py-2.5 px-4 rounded-xl transition-colors shrink-0 shadow-md cursor-pointer"
              >
                Edit & Resubmit
              </button>
            </div>
          )}

          {/* Top Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Completion Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between shadow-xl">
              <div className="space-y-3 grow pr-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Profile Completion
                </h3>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {profileCompletion}%
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Complete your profile to increase your chances of approval.
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-blue-950/60 border border-blue-900/40 flex items-center justify-center text-blue-400 shrink-0 text-2xl shadow-inner">
                <FaClipboardList />
              </div>
            </div>

            {/* Application Status Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between shadow-xl">
              <div className="space-y-3 grow pr-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Application Status
                </h3>
                <div className="text-xl sm:text-2xl font-bold tracking-tight">
                  {applicationStatus === "Not Submitted" && (
                    <span className="text-blue-500">Not Submitted</span>
                  )}
                  {applicationStatus === "Pending Review" && (
                    <span className="text-amber-400">Pending Review</span>
                  )}
                  {applicationStatus === "Approved" && (
                    <span className="text-emerald-400">Approved</span>
                  )}
                  {applicationStatus === "Rejected" && (
                    <span className="text-rose-500">Rejected</span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {applicationStatus === "Not Submitted" &&
                    "You have not submitted your application yet."}
                  {applicationStatus === "Pending Review" &&
                    "Your application is currently under admin audit."}
                  {applicationStatus === "Approved" &&
                    "Congratulations! Your provider badge is active."}
                  {applicationStatus === "Rejected" &&
                    "Please check admin remarks and resubmit."}
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-amber-950/40 border border-amber-900/40 flex items-center justify-center text-amber-400 shrink-0 text-2xl shadow-inner">
                <FaClock />
              </div>
            </div>
          </div>

          {/* Central Callout Card matching screenshot */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-6 shadow-xl">
            <div className="w-24 h-24 rounded-full bg-blue-950/40 border border-blue-900/40 flex items-center justify-center text-blue-500 text-4xl shadow-inner">
              <FaFileAlt />
            </div>
            <div className="space-y-2 max-w-md">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Complete Your Profile
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fill in your details, add your service information and upload
                documents to submit your application.
              </p>
            </div>
            <button
              onClick={() => {
                setProfileCompletion(100);
                setApplicationStatus("Pending Review");
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center space-x-2 cursor-pointer"
            >
              <FaUser className="text-xs" />
              <span>Complete Your Profile</span>
            </button>
          </div>

          {/* Bottom Banner Info */}
          <div className="bg-blue-950/20 border border-blue-900/40 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-900/40 text-blue-400 flex items-center justify-center text-sm shrink-0 font-bold">
                i
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white">
                  Why complete your profile?
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  A complete profile helps us verify your details quickly and
                  improves your chances of approval.
                </p>
              </div>
            </div>
            <div className="text-blue-500 text-xl pl-4 hidden sm:block">
              <FaShieldAlt />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 py-4 px-6 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} ProVera Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
