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
  FaArrowRight,
  FaCheck,
  FaEdit,
  FaPaperPlane,
  FaLock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Submit() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("Review & Submit");

  const handleSubmitApplication = () => {
    alert(
      "Application submitted successfully! Your status is now Pending Review.",
    );
    nav("/dashboard");
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, action: () => nav("/dashboard") },
    { name: "My Profile", icon: <FaUser />, action: () => nav("/profile") },
    { name: "Documents", icon: <FaFileAlt />, action: () => nav("/documents") },
    {
      name: "Application Status",
      icon: <FaClipboardList />,
      action: () => nav("/status"),
    },
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
          <div className="flex items-center space-x-4">
            <button
              onClick={() => nav("/dashboard")}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
            >
              <span>&lt; Back to Dashboard</span>
            </button>
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
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-white block">
                  Akhil Sai
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Review & Submit Content Workspace */}
        <main className="grow p-6 lg:p-10 space-y-6 max-w-5xl w-full mx-auto">
          {/* Header Title & Steps */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Review & Submit
              </h1>
              <p className="text-xs text-slate-400">
                Please review all your details before submitting your
                application.
              </p>
            </div>

            {/* Step Progress Bar Header matching mockup */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
              <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800 z-0"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 z-0 w-full"></div>

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <FaCheck className="text-xs" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-semibold text-white block">
                      Basic Details
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Completed
                    </span>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <FaCheck className="text-xs" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-semibold text-white block">
                      Service Details
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Completed
                    </span>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <FaCheck className="text-xs" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-semibold text-white block">
                      Documents
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Completed
                    </span>
                  </div>
                </div>
                {/* Step 4 */}
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-lg shadow-blue-600/30">
                    4
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-semibold text-blue-400 block">
                      Review & Submit
                    </span>
                    <span className="text-[10px] text-blue-400 font-medium block">
                      Current Step
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Cards Container */}
          <div className="space-y-6">
            {/* 1. Personal Information Review Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center text-sm">
                    <FaUser />
                  </div>
                  <h2 className="text-sm font-bold text-white tracking-wide">
                    1. Personal Information
                  </h2>
                </div>
                <button
                  onClick={() => nav("/profile")}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <FaEdit className="text-[11px]" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Full Name
                  </span>
                  <span className="text-xs font-semibold text-white">
                    Akhil Sai
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Email Address
                  </span>
                  <span className="text-xs font-semibold text-white">
                    akhilsai@exemple.com
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Phone Number
                  </span>
                  <span className="text-xs font-semibold text-white">
                    +91 98765 43210
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Service Information Review Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/60 text-emerald-400 flex items-center justify-center text-sm">
                    <FaShieldAlt />
                  </div>
                  <h2 className="text-sm font-bold text-white tracking-wide">
                    2. Service Information
                  </h2>
                </div>
                <button
                  onClick={() => nav("/profile")}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <FaEdit className="text-[11px]" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Service Category
                  </span>
                  <span className="text-xs font-semibold text-white">
                    Electrician
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Skills
                  </span>
                  <span className="text-xs font-semibold text-white">
                    Installation, Repair, Maintenance
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Years of Experience
                  </span>
                  <span className="text-xs font-semibold text-white">
                    2 Years
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Location Information Review Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-950/60 text-purple-400 flex items-center justify-center text-sm">
                    <FaHome />
                  </div>
                  <h2 className="text-sm font-bold text-white tracking-wide">
                    3. Location Information
                  </h2>
                </div>
                <button
                  onClick={() => nav("/profile")}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <FaEdit className="text-[11px]" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    State
                  </span>
                  <span className="text-xs font-semibold text-white">
                    Telangana
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    City
                  </span>
                  <span className="text-xs font-semibold text-white">
                    Hyderabad
                  </span>
                </div>
                <div className="md:col-span-1">
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Address
                  </span>
                  <span className="text-xs font-semibold text-white">
                    H.No 12-3-45, Near Main Road, L.B. Nagar, Hyderabad
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Pincode
                  </span>
                  <span className="text-xs font-semibold text-white">
                    500074
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Uploaded Documents Review Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-950/60 text-amber-400 flex items-center justify-center text-sm">
                    <FaFileAlt />
                  </div>
                  <h2 className="text-sm font-bold text-white tracking-wide">
                    4. Uploaded Documents
                  </h2>
                </div>
                <button
                  onClick={() => nav("/documents")}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <FaEdit className="text-[11px]" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1">
                {[
                  { name: "Aadhaar Card", file: "Aadhaar_Front.jpg" },
                  { name: "PAN Card", file: "PAN_Card.jpg" },
                  { name: "Experience Certificate", file: "Experience.pdf" },
                  { name: "Address Proof", file: "Address_Proof.jpg" },
                  { name: "Profile Photo", file: "Profile.jpg" },
                ].map((doc, i) => (
                  <div
                    key={i}
                    className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl space-y-1"
                  >
                    <div className="flex items-center space-x-1.5 text-blue-400 text-xs font-semibold truncate">
                      <FaFileAlt className="text-[10px] shrink-0" />
                      <span className="truncate">{doc.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {doc.file}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Verification Banner */}
            <div className="bg-amber-950/20 border border-amber-900/40 rounded-2xl p-4 sm:p-5 flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-900/40 text-amber-400 flex items-center justify-center text-base shrink-0">
                <FaExclamationTriangle />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-amber-200">
                  Please verify your details carefully
                </h4>
                <p className="text-[11px] text-amber-300/80 leading-relaxed">
                  Once you submit your application, you will not be able to
                  change the information until it is reviewed by our team.
                </p>
              </div>
            </div>

            {/* Bottom Actions Footer */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <button
                onClick={() => nav("/documents")}
                className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-medium text-xs py-3.5 px-6 rounded-xl transition-colors cursor-pointer"
              >
                &lt; Previous
              </button>

              <div className="flex flex-col items-end space-y-1.5 w-full sm:w-auto shrink-0">
                <button
                  onClick={handleSubmitApplication}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Submit Application</span>
                  <FaPaperPlane className="text-xs" />
                </button>
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 justify-center w-full">
                  <FaLock className="text-[9px]" />
                  <span>Your information is secure with us</span>
                </div>
              </div>
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
