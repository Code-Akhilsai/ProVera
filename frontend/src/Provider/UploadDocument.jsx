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
  FaFileUpload,
  FaEye,
  FaLock,
  FaShieldVirus,
  FaAward,
  FaIdCard,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UploadDocument() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("Documents");

  // File upload states matching the design mockup
  const [documents, setDocuments] = useState({
    aadhaar: { status: "Uploaded", fileName: "Aadhaar_Front.jpg" },
    pan: { status: "Uploaded", fileName: "PAN_Card.jpg" },
    experience: { status: "Pending", fileName: null },
    address: { status: "Pending", fileName: null },
    profilePhoto: { status: "Pending", fileName: null },
  });

  const handleSimulateUpload = (docKey, sampleName) => {
    setDocuments((prev) => ({
      ...prev,
      [docKey]: { status: "Uploaded", fileName: sampleName },
    }));
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, action: () => nav("/dashboard") },
    { name: "My Profile", icon: <FaUser />, action: () => nav("/profile") },
    { name: "Documents", icon: <FaFileAlt /> },
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

        {/* Upload Documents Content Workspace */}
        <main className="grow p-6 lg:p-10 space-y-6 max-w-5xl w-full mx-auto">
          {/* Header Title & Steps */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Upload Documents
              </h1>
              <p className="text-xs text-slate-400">
                Upload required documents to verify your identity and skills.
              </p>
            </div>

            {/* Step Progress Bar Header matching mockup */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
              <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800 z-0"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 z-0 w-3/4"></div>

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
                    3
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-semibold text-blue-400 block">
                      Documents
                    </span>
                    <span className="text-[10px] text-blue-400 font-medium block">
                      In Progress
                    </span>
                  </div>
                </div>
                {/* Step 4 */}
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-bold text-xs flex items-center justify-center">
                    4
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-medium text-slate-400 block">
                      Review & Submit
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Pending
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Vault Container */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Required Documents Header */}
            <div className="flex items-center space-x-3 border-b border-slate-800/80 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center text-sm">
                <FaFileAlt />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-wide">
                  Required Documents
                </h2>
                <p className="text-[11px] text-slate-400">
                  Please upload clear and valid documents. File size should be
                  less than 5MB. Accepted formats: JPG, PNG, PDF.
                </p>
              </div>
            </div>

            {/* Document Cards List */}
            <div className="space-y-4">
              {/* 1. Aadhaar Card */}
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-900/40 text-blue-400 flex items-center justify-center text-lg shrink-0">
                    <FaIdCard />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-white flex items-center space-x-1.5">
                      <span>Aadhaar Card</span>
                      <span className="text-rose-500">*</span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Upload front or back side of your Audhaar card
                    </p>
                    {documents.aadhaar.status === "Uploaded" && (
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-900/50 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center space-x-1">
                          <FaCheck className="text-[9px]" />
                          <span>Uploaded</span>
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {documents.aadhaar.fileName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0">
                  <FaEye className="text-xs" />
                </button>
              </div>

              {/* 2. PAN Card */}
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 flex items-center justify-center text-lg shrink-0">
                    <FaShieldAlt />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-white flex items-center space-x-1.5">
                      <span>PAN Card</span>
                      <span className="text-rose-500">*</span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Upload a clear copy of your PAN card
                    </p>
                    {documents.pan.status === "Uploaded" && (
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-900/50 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center space-x-1">
                          <FaCheck className="text-[9px]" />
                          <span>Uploaded</span>
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {documents.pan.fileName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0">
                  <FaEye className="text-xs" />
                </button>
              </div>

              {/* 3. Experience Certificate (if any) */}
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-900/40 text-purple-400 flex items-center justify-center text-lg shrink-0">
                    <FaAward />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-white">
                      Experience Certificate (if any)
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Upload your experience certificate or any relevant proof
                    </p>
                    {documents.experience.status === "Uploaded" && (
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-900/50 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center space-x-1">
                          <FaCheck className="text-[9px]" />
                          <span>Uploaded</span>
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {documents.experience.fileName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {documents.experience.status === "Pending" ? (
                  <button
                    onClick={() =>
                      handleSimulateUpload("experience", "Experience_Cert.pdf")
                    }
                    className="border border-dashed border-slate-700 hover:border-blue-500 bg-slate-900 hover:bg-blue-950/30 px-6 py-3 rounded-xl flex items-center space-x-2 text-slate-300 hover:text-blue-400 text-xs font-medium transition-colors cursor-pointer shrink-0"
                  >
                    <FaFileUpload className="text-blue-500" />
                    <span>Upload File or drag and drop</span>
                  </button>
                ) : (
                  <button className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0">
                    <FaEye className="text-xs" />
                  </button>
                )}
              </div>

              {/* 4. Address Proof */}
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-amber-950/40 border border-amber-900/40 text-amber-400 flex items-center justify-center text-lg shrink-0">
                    <FaHome />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-white flex items-center space-x-1.5">
                      <span>Address Proof</span>
                      <span className="text-rose-500">*</span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Upload any government issued address proof
                    </p>
                    {documents.address.status === "Uploaded" && (
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-900/50 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center space-x-1">
                          <FaCheck className="text-[9px]" />
                          <span>Uploaded</span>
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {documents.address.fileName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {documents.address.status === "Pending" ? (
                  <button
                    onClick={() =>
                      handleSimulateUpload("address", "Address_Proof.pdf")
                    }
                    className="border border-dashed border-slate-700 hover:border-blue-500 bg-slate-900 hover:bg-blue-950/30 px-6 py-3 rounded-xl flex items-center space-x-2 text-slate-300 hover:text-blue-400 text-xs font-medium transition-colors cursor-pointer shrink-0"
                  >
                    <FaFileUpload className="text-blue-500" />
                    <span>Upload File or drag and drop</span>
                  </button>
                ) : (
                  <button className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0">
                    <FaEye className="text-xs" />
                  </button>
                )}
              </div>

              {/* 5. Profile Photo */}
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-rose-950/40 border border-rose-900/40 text-rose-400 flex items-center justify-center text-lg shrink-0">
                    <FaUser />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-white flex items-center space-x-1.5">
                      <span>Profile Photo</span>
                      <span className="text-rose-500">*</span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Upload a clear recent photo
                    </p>
                    {documents.profilePhoto.status === "Uploaded" && (
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-900/50 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center space-x-1">
                          <FaCheck className="text-[9px]" />
                          <span>Uploaded</span>
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {documents.profilePhoto.fileName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {documents.profilePhoto.status === "Pending" ? (
                  <button
                    onClick={() =>
                      handleSimulateUpload("profilePhoto", "Profile_Akhil.jpg")
                    }
                    className="border border-dashed border-slate-700 hover:border-blue-500 bg-slate-900 hover:bg-blue-950/30 px-6 py-3 rounded-xl flex items-center space-x-2 text-slate-300 hover:text-blue-400 text-xs font-medium transition-colors cursor-pointer shrink-0"
                  >
                    <FaFileUpload className="text-blue-500" />
                    <span>Upload File or drag and drop</span>
                  </button>
                ) : (
                  <button className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0">
                    <FaEye className="text-xs" />
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Actions Footer */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-8 h-8 rounded-full bg-blue-950 text-blue-400 flex items-center justify-center text-xs shrink-0 font-bold">
                  i
                </div>
                <p className="text-xs text-slate-400">
                  Make sure all documents are clearly visible and not expired.
                </p>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => nav("/profile")}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium text-xs py-3 px-6 rounded-xl transition-colors cursor-pointer"
                >
                  &lt; Previous
                </button>
                <button
                  onClick={() =>
                    alert(
                      "Documents saved successfully! Ready for final review.",
                    )
                  }
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Save & Continue</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
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
