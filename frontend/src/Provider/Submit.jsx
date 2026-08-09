import React, { useEffect, useState } from "react";
import {
  FaShieldAlt,
  FaHome,
  FaUser,
  FaFileAlt,
  FaBell,
  FaCheck,
  FaEdit,
  FaPaperPlane,
  FaLock,
  FaExclamationTriangle,
  FaBars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { buildProviderMenuItems } from "./providerNavigation.jsx";
import ProviderSidebar from "./ProviderSidebar.jsx";

export default function Submit() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("Review & Submit");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileResponse, applicationResponse] = await Promise.all([
          axios.post(
            "http://localhost:3000/api/v1/profile",
            {},
            { withCredentials: true },
          ),
          axios.get("http://localhost:3000/api/v1/application/me", {
            withCredentials: true,
          }),
        ]);

        setProfile(profileResponse.data.user);
        setApplication(applicationResponse.data.application);
      } catch (error) {
        console.error("Failed to load submit data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmitApplication = async () => {
    try {
      setSubmitting(true);
      await axios.post(
        "http://localhost:3000/api/v1/application/submit",
        {},
        { withCredentials: true },
      );
      nav("/provider-dashboard");
    } catch (error) {
      console.error("Failed to submit application", error);
    } finally {
      setSubmitting(false);
    }
  };

  const menuItems = buildProviderMenuItems({
    nav,
    setActiveTab,
    page: "submit",
  });

  const serviceInfo = application?.service_info || {};
  const locationInfo = application?.location_info || {};
  const documents = application?.documents || {};
  const status = application?.status || "Draft";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-blue-600 selection:text-white">
      <ProviderSidebar
        menuItems={menuItems}
        activeTab={activeTab}
        onLogoClick={() => nav("/")}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="grow flex flex-col justify-between bg-slate-950 min-w-0">
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
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-600/40"
              />
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-white block">
                  {profile?.full_name || "Loading..."}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="grow p-4 sm:p-6 lg:p-10 space-y-6 max-w-5xl w-full mx-auto">
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Review & Submit
              </h1>
              <p className="text-xs text-slate-400">
                Review the live data loaded from your application before
                submitting.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
              <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800 z-0"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 z-0 w-full"></div>
                {[
                  "Basic Details",
                  "Service Details",
                  "Documents",
                  "Review & Submit",
                ].map((label, index) => (
                  <div
                    key={label}
                    className="relative z-10 flex flex-col items-center space-y-2"
                  >
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-lg shadow-blue-600/30">
                      {index < 3 ? <FaCheck className="text-xs" /> : 4}
                    </div>
                    <div className="text-center">
                      <span
                        className={`text-xs font-semibold block ${index === 3 ? "text-blue-400" : "text-white"}`}
                      >
                        {label}
                      </span>
                      <span
                        className={`text-[10px] block ${index === 3 ? "text-blue-400 font-medium" : "text-slate-400"}`}
                      >
                        {index === 3 ? "Current Step" : "Completed"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-sm text-slate-400">Loading application...</div>
          ) : (
            <div className="space-y-6">
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
                      {profile?.full_name || "Not added"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Email Address
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {profile?.email || "Not added"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Phone Number
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {application?.phone || "Not added"}
                    </span>
                  </div>
                </div>
              </div>

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
                      {serviceInfo.service || "Not added"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Skills
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {serviceInfo.skills?.length
                        ? serviceInfo.skills.join(", ")
                        : "Not added"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Years of Experience
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {serviceInfo.experience || "Not added"}
                    </span>
                  </div>
                </div>
              </div>

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
                      {locationInfo.state || "Not added"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      City
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {locationInfo.city || "Not added"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Address
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {locationInfo.Address || "Not added"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Pincode
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {locationInfo.pincode || "Not added"}
                    </span>
                  </div>
                </div>
              </div>

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
                    onClick={() => nav("/upload-documents")}
                    className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <FaEdit className="text-[11px]" />
                    <span>Edit</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1">
                  {[
                    ["Aadhaar Card", documents.aadhaar],
                    ["PAN Card", documents.pan],
                    ["Experience Certificate", documents.experienceCertificate],
                    ["Address Proof", documents.addressProof],
                    ["Profile Photo", documents.profilePhoto],
                  ].map(([name, file]) => (
                    <div
                      key={name}
                      className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl space-y-1"
                    >
                      <div className="flex items-center space-x-1.5 text-blue-400 text-xs font-semibold truncate">
                        <FaFileAlt className="text-[10px] shrink-0" />
                        <span className="truncate">{name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {file ? "Uploaded" : "Not uploaded"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-950/20 border border-amber-900/40 rounded-2xl p-4 sm:p-5 flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-900/40 text-amber-400 flex items-center justify-center text-base shrink-0">
                  <FaExclamationTriangle />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-amber-200">
                    Please verify your details carefully
                  </h4>
                  <p className="text-[11px] text-amber-300/80 leading-relaxed">
                    Submitting will mark your application as Pending Review.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="text-xs text-slate-400">
                  Current status:{" "}
                  <span className="text-white font-semibold">{status}</span>
                </div>

                <div className="flex flex-col items-end space-y-1.5 w-full sm:w-auto shrink-0">
                  <button
                    onClick={handleSubmitApplication}
                    disabled={loading || submitting}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold text-xs sm:text-sm py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>
                      {submitting ? "Submitting..." : "Submit Application"}
                    </span>
                    <FaPaperPlane className="text-xs" />
                  </button>
                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 justify-center w-full">
                    <FaLock className="text-[9px]" />
                    <span>Your information is secure with us</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="border-t border-slate-900 py-4 px-6 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} ProVera Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
