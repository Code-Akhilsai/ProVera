import React, { useState } from "react";
import {
  FaShieldAlt,
  FaHome,
  FaUser,
  FaFileAlt,
  FaBell,
  FaArrowRight,
  FaCheck,
  FaFileUpload,
  FaAward,
  FaIdCard,
  FaBars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { buildProviderMenuItems } from "./providerNavigation.jsx";
import ProviderSidebar from "./ProviderSidebar.jsx";

export default function UploadDocument() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("Documents");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = buildProviderMenuItems({
    nav,
    setActiveTab,
    page: "documents",
  });

  // File upload states matching the design mockup
  const [documents, setDocuments] = useState({
    aadhaar: { status: "Pending", fileName: null, file: null },
    pan: { status: "Pending", fileName: null, file: null },
    experience: { status: "Pending", fileName: null, file: null },
    address: { status: "Pending", fileName: null, file: null },
    profilePhoto: { status: "Pending", fileName: null, file: null },
  });

  const documentFieldMap = {
    aadhaar: "aadhaar",
    pan: "pan",
    experience: "experienceCertificate",
    address: "addressProof",
    profilePhoto: "profilePhoto",
  };

  const handleFileSelect = (docKey, file) => {
    if (!file) return;
    setDocuments((prev) => ({
      ...prev,
      [docKey]: {
        status: "Selected",
        fileName: file.name,
        file,
      },
    }));
  };

  const renderUploadControl = (docKey) => {
    return (
      <label className="border border-dashed border-slate-700 hover:border-blue-500 bg-slate-900 hover:bg-blue-950/30 px-6 py-3 rounded-xl flex items-center space-x-2 text-slate-300 hover:text-blue-400 text-xs font-medium transition-colors cursor-pointer shrink-0">
        <FaFileUpload className="text-blue-500" />
        <span>Upload File</span>
        <input
          type="file"
          accept="image/*,application/pdf"
          className="hidden"
          onChange={(event) =>
            handleFileSelect(docKey, event.target.files?.[0])
          }
        />
      </label>
    );
  };

  const saveDocuments = async () => {
    const formData = new FormData();
    let hasAnyFile = false;

    Object.entries(documentFieldMap).forEach(([stateKey, fieldName]) => {
      const file = documents[stateKey].file;
      if (file) {
        hasAnyFile = true;
        formData.append(fieldName, file);
      }
    });

    if (!hasAnyFile) {
      alert("Select at least one document to upload.");
      return;
    }

    await axios.post("http://localhost:3000/api/v1/application", formData, {
      withCredentials: true,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-blue-600 selection:text-white">
      {/* Sidebar Navigation */}
      <ProviderSidebar
        menuItems={menuItems}
        activeTab={activeTab}
        onLogoClick={() => nav("/provider-dashboard")}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Wrapper */}
      <div className="grow flex flex-col justify-between bg-slate-950 min-w-0">
        {/* Top Header Bar */}
        <header className="h-20 border-b border-slate-900 px-4 sm:px-6 lg:px-10 flex items-center justify-between bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 shrink-0 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <FaBars className="text-sm" />
            </button>
            <button
              onClick={() => nav("/provider-dashboard")}
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
        <main className="grow p-4 sm:p-6 lg:p-10 space-y-6 max-w-5xl w-full mx-auto">
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
            {/* Documents Header */}
            <div className="flex items-center space-x-3 border-b border-slate-800/80 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center text-sm">
                <FaFileAlt />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-wide">
                  Documents
                </h2>
                <p className="text-[11px] text-slate-400">
                  Upload any documents you have. File size should be less than
                  5MB. Accepted formats: JPG, PNG, PDF.
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
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Upload front or back side of your Audhaar card
                    </p>
                    {documents.aadhaar.status !== "Pending" && (
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-900/50 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center space-x-1">
                          <FaCheck className="text-[9px]" />
                          <span>Selected</span>
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {documents.aadhaar.fileName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {renderUploadControl("aadhaar")}
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
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Upload a clear copy of your PAN card
                    </p>
                    {documents.pan.status !== "Pending" && (
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-900/50 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center space-x-1">
                          <FaCheck className="text-[9px]" />
                          <span>Selected</span>
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {documents.pan.fileName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {renderUploadControl("pan")}
              </div>

              {/* 3. Experience Certificate (if any) */}
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-900/40 text-purple-400 flex items-center justify-center text-lg shrink-0">
                    <FaAward />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-white">
                      Experience Certificate
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Upload your experience certificate or any relevant proof
                    </p>
                    {documents.experience.status !== "Pending" && (
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-900/50 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center space-x-1">
                          <FaCheck className="text-[9px]" />
                          <span>Selected</span>
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {documents.experience.fileName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {renderUploadControl("experience")}
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
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Upload any government issued address proof
                    </p>
                    {documents.address.status !== "Pending" && (
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-900/50 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center space-x-1">
                          <FaCheck className="text-[9px]" />
                          <span>Selected</span>
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {documents.address.fileName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {renderUploadControl("address")}
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
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Upload a clear recent photo
                    </p>
                    {documents.profilePhoto.status !== "Pending" && (
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-900/50 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center space-x-1">
                          <FaCheck className="text-[9px]" />
                          <span>Selected</span>
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {documents.profilePhoto.fileName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {renderUploadControl("profilePhoto")}
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
                  onClick={async () => {
                    try {
                      await saveDocuments();
                      nav("/submit");
                    } catch (error) {
                      console.error("Failed to save documents", error);
                    }
                  }}
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
