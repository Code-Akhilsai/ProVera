import React from "react";
import { FaFileAlt } from "react-icons/fa";

export default function MyApplications({
  nav,
  setActiveTab,
  application,
  applicationStatus,
  documentEntries,
}) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 lg:p-8 shadow-xl space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            My Applications
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your current application and uploaded documents are shown here.
          </p>
        </div>
        <button
          onClick={() => nav("/submit")}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm py-3 px-5 rounded-xl transition-all shadow-lg shadow-blue-600/25 cursor-pointer"
        >
          Open Submit Page
        </button>
      </div>

      {application ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Application Summary
              </h3>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-950/50 text-blue-300 border border-blue-900/40">
                {applicationStatus}
              </span>
            </div>
            <div className="space-y-3 text-xs text-slate-300">
              <p>
                <span className="text-slate-500">Phone:</span>{" "}
                {application.phone || "N/A"}
              </p>
              <p>
                <span className="text-slate-500">Service:</span>{" "}
                {application.service_info?.service || "N/A"}
              </p>
              <p>
                <span className="text-slate-500">Experience:</span>{" "}
                {application.service_info?.experience || "N/A"}
              </p>
              <p>
                <span className="text-slate-500">Skills:</span>{" "}
                {application.service_info?.skills || "N/A"}
              </p>
              <p>
                <span className="text-slate-500">Location:</span>{" "}
                {[
                  application.location_info?.city,
                  application.location_info?.state,
                ]
                  .filter(Boolean)
                  .join(", ") || "N/A"}
              </p>
              <p>
                <span className="text-slate-500">Submitted:</span>{" "}
                {application.submittedAt
                  ? new Date(application.submittedAt).toLocaleString()
                  : "Not submitted yet"}
              </p>
            </div>
          </div>

          <div className="space-y-4 bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Uploaded Documents
            </h3>
            {documentEntries.length > 0 ? (
              <div className="space-y-3">
                {documentEntries.map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-xs text-slate-200 hover:border-blue-600/50 hover:bg-slate-900 transition-colors"
                  >
                    <span className="capitalize">
                      {name.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span className="text-blue-400">View</span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No documents uploaded yet.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/60 p-8 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-950/40 border border-blue-900/40 flex items-center justify-center text-blue-400 text-2xl">
            <FaFileAlt />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">
              No application found yet
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete your profile and upload documents to create your first
              application.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
