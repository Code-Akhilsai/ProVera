import React, { useEffect, useState } from "react";
import { FaUser, FaFileAlt, FaBars } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { buildProviderMenuItems } from "./providerNavigation.jsx";
import MyApplications from "./MyApplications.jsx";
import ProviderSidebar from "./ProviderSidebar.jsx";

export default function ProviderDashboard() {
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const blockBack = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", blockBack);
    return () => window.removeEventListener("popstate", blockBack);
  }, []);
  const nav = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.tab || "Dashboard",
  );
  const [profileName, setProfileName] = useState("");
  const [application, setApplication] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState("Not Submitted");
  const [profileCompletion, setProfileCompletion] = useState(20);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = buildProviderMenuItems({
    nav,
    setActiveTab,
    page: "dashboard",
  });

  useEffect(() => {
    const loadDashboardState = async () => {
      try {
        const response = await axios.get("/api/v1/application/me", {
          withCredentials: true,
        });

        const currentApplication = response.data.application;
        const username = response.data.username;
        setProfileName(username.full_name);

        if (!currentApplication) {
          return;
        }

        setApplication(currentApplication);
        setApplicationStatus(currentApplication.status || "Not Submitted");

        const isComplete = Boolean(
          currentApplication.phone &&
          currentApplication.service_info?.service &&
          currentApplication.service_info?.experience &&
          currentApplication.service_info?.skills &&
          currentApplication.location_info?.state &&
          currentApplication.location_info?.city &&
          currentApplication.location_info?.Address &&
          currentApplication.location_info?.pincode &&
          currentApplication.documents &&
          Object.values(currentApplication.documents).some(Boolean) &&
          currentApplication.status !== "Not Submitted",
        );

        setProfileCompletion(isComplete ? 100 : 20);

        const firstName =
          currentApplication.firstName || currentApplication.userId?.firstName;
        const lastName =
          currentApplication.lastName || currentApplication.userId?.lastName;

        if (firstName || lastName) {
          setProfileName(`${firstName || ""} ${lastName || ""}`.trim());
        }
      } catch (error) {
        console.error("Failed to load dashboard state", error);
      }
    };

    loadDashboardState();
  }, []);

  const documentEntries = application?.documents
    ? Object.entries(application.documents).filter(([, value]) =>
        Boolean(value),
      )
    : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-blue-600 selection:text-white">
      <ProviderSidebar
        menuItems={menuItems}
        activeTab={activeTab}
        onLogoClick={() => setActiveTab("Dashboard")}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        showHelp={false}
      />

      <div className="grow flex flex-col justify-between bg-slate-950 min-w-0">
        <header className="h-20 border-b border-slate-900 px-4 sm:px-6 lg:px-10 flex items-center justify-between bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center space-x-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 shrink-0 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <FaBars className="text-sm" />
            </button>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight truncate">
                Welcome,{" "}
                <span className="text-white">{profileName?.slice(0, 6)}</span>
              </h1>
              <p className="text-xs text-slate-400 truncate">
                Manage your profile and track your application
              </p>
            </div>
          </div>
        </header>

        <main className="grow p-4 sm:p-6 lg:p-10 space-y-6 max-w-7xl w-full mx-auto">
          {activeTab === "Dashboard" && (
            <>
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Profile Completion
                  </h3>
                  <div className="text-3xl font-extrabold text-white tracking-tight">
                    {profileCompletion}%
                  </div>
                </div>
                <div className="mt-4 w-full space-y-3">
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${profileCompletion}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {profileCompletion === 100
                      ? "Everything is complete. Your application is ready for review."
                      : "Complete your profile and documents to reach 100%."}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-6 shadow-xl">
                <div className="w-24 h-24 rounded-full bg-blue-950/40 border border-blue-900/40 flex items-center justify-center text-blue-500 text-4xl shadow-inner">
                  <FaFileAlt />
                </div>
                <div className="space-y-2 max-w-md">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Complete Your Profile
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Fill in your details, add your service information and
                    upload documents to submit your application.
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === "My Profile" && (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 lg:p-8 shadow-xl space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  My Profile
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Review the details currently attached to your application.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3 text-xs text-slate-300 bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5">
                  <p>
                    <span className="text-slate-500">Name:</span> {profileName}
                  </p>
                  <p>
                    <span className="text-slate-500">Phone:</span>{" "}
                    {application?.phone || "N/A"}
                  </p>
                  <p>
                    <span className="text-slate-500">Service:</span>{" "}
                    {application?.service_info?.service || "N/A"}
                  </p>
                  <p>
                    <span className="text-slate-500">Experience:</span>{" "}
                    {application?.service_info?.experience || "N/A"}
                  </p>
                  <p>
                    <span className="text-slate-500">Skills:</span>{" "}
                    {application?.service_info?.skills || "N/A"}
                  </p>
                </div>
                <div className="space-y-3 text-xs text-slate-300 bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5">
                  <p>
                    <span className="text-slate-500">City:</span>{" "}
                    {application?.location_info?.city || "N/A"}
                  </p>
                  <p>
                    <span className="text-slate-500">State:</span>{" "}
                    {application?.location_info?.state || "N/A"}
                  </p>
                  <p>
                    <span className="text-slate-500">Address:</span>{" "}
                    {application?.location_info?.Address || "N/A"}
                  </p>
                  <p>
                    <span className="text-slate-500">Pincode:</span>{" "}
                    {application?.location_info?.pincode || "N/A"}
                  </p>
                  <p>
                    <span className="text-slate-500">Status:</span>{" "}
                    {applicationStatus}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "My Applications" && (
            <MyApplications
              nav={nav}
              setActiveTab={setActiveTab}
              application={application}
              applicationStatus={applicationStatus}
              documentEntries={documentEntries}
            />
          )}
        </main>

        <footer className="border-t border-slate-900 py-4 px-6 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} ProVera Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
