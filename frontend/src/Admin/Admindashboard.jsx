import React, { useState, useEffect } from "react";
import {
  FiLogOut,
  FiSearch,
  FiFilter,
  FiEye,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiFileText,
  FiDownload,
} from "react-icons/fi";
import axios from "axios";
import { FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [rejectionRemarks, setRejectionRemarks] = useState("");
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        "http://localhost:3000/api/v1/fetch/applications",
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        setApplications(response.data.applications || []);
        setStats({
          total: response.data.count_of_applications || 0,
          approved: response.data.approved_applications || 0,
          rejected: response.data.rejected_applications || 0,
          pending: response.data.pending_applications || 0,
        });
      }
    } catch (err) {
      setError("Failed to fetch applications");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredApplications = () => {
    return applications.filter((app) => {
      const fullName = app.userId?.full_name || "";
      const userEmail = app.userId?.email || "";
      const service = app.service_info?.service || "";
      const city = app.location_info?.city || "";
      const state = app.location_info?.state || "";

      const matchSearch =
        fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.toLowerCase().includes(searchQuery.toLowerCase());

      const matchFilter = filterStatus === "all" || app.status === filterStatus;

      return matchSearch && matchFilter;
    });
  };

  const handleApproveApplication = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/admin/applications/${id}/approve`,
        {},
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        const updatedApp = response.data.application;
        setApplications(
          applications.map((app) =>
            app._id === id
              ? { ...app, ...updatedApp, status: "Approved" }
              : app,
          ),
        );
        setStats((prev) => ({
          ...prev,
          pending: Math.max(0, prev.pending - 1),
          approved: prev.approved + 1,
        }));
        setSelectedApplication(null);
        setCurrentPage("providers");
        fetchApplications();
      }
    } catch (err) {
      setError("Failed to approve application");
      console.error("Error:", err);
    }
  };

  const handleRejectApplication = async (id) => {
    if (!rejectionRemarks.trim()) return;

    try {
      const response = await axios.post(
        `/api/v1/admin/applications/${id}/reject`,
        { remarks: rejectionRemarks },
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        const updatedApp = response.data.application;
        setApplications(
          applications.map((app) =>
            app._id === id
              ? {
                  ...app,
                  ...updatedApp,
                  status: "Rejected",
                  remarks: rejectionRemarks,
                }
              : app,
          ),
        );
        setStats((prev) => ({
          ...prev,
          pending: Math.max(0, prev.pending - 1),
          rejected: prev.rejected + 1,
        }));
        setRejectionRemarks("");
        setSelectedApplication(null);
        setCurrentPage("providers");
        fetchApplications();
      }
    } catch (err) {
      setError("Failed to reject application");
      console.error("Error:", err);
    }
  };

  const handleLogout = () => {
    axios
      .post(
        "http://localhost:3000/api/v1/logout",
        {},
        {
          withCredentials: true,
        },
      )
      .then(() => {
        navigate("/adminlogin", { replace: true });
      })
      .catch((err) => console.error("Logout error:", err));
  };

  const filteredApplications = getFilteredApplications();

  // DASHBOARD PAGE
  if (currentPage === "dashboard") {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <nav className="bg-slate-800/80 backdrop-blur border-b border-slate-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-900/30">
                <FaTools className="text-lg" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                ProVera<span className="text-blue-500">.</span>
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              <FiLogOut size={18} /> Logout
            </button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2 text-white">Dashboard</h1>
            <p className="text-slate-400">Welcome back, Admin</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    Total Applications
                  </p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {stats.total}
                  </p>
                </div>
                <FiUsers className="text-blue-500" size={32} />
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Approved</p>
                  <p className="text-3xl font-bold text-green-400 mt-2">
                    {stats.approved}
                  </p>
                </div>
                <FiCheckCircle className="text-green-500" size={32} />
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Rejected</p>
                  <p className="text-3xl font-bold text-red-400 mt-2">
                    {stats.rejected}
                  </p>
                </div>
                <FiXCircle className="text-red-500" size={32} />
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    Pending Review
                  </p>
                  <p className="text-3xl font-bold text-yellow-400 mt-2">
                    {stats.pending}
                  </p>
                </div>
                <FiClock className="text-yellow-500" size={32} />
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage("providers")}
            className="bg-linear-to-r from-blue-600 to-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition"
          >
            Manage Applications
          </button>
        </div>
      </div>
    );
  }

  // APPLICATIONS LIST PAGE
  if (currentPage === "providers") {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <nav className="bg-slate-800/80 backdrop-blur border-b border-slate-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-900/30">
                <FaTools className="text-lg" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                ProVera<span className="text-blue-500">.</span>
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              <FiLogOut size={18} /> Logout
            </button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <button
              onClick={() => setCurrentPage("dashboard")}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium mb-4"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-white">
              Manage Applications
            </h1>
            <p className="text-slate-400 mt-2">
              Review and approve service provider applications
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <FiSearch
                  className="absolute left-3 top-3 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by full name, email, service, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div className="flex items-center gap-2">
                <FiFilter size={20} className="text-slate-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                >
                  <option value="all">All Status</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">Loading applications...</p>
            </div>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Applicant
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Service Details
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr
                        key={app._id}
                        className="border-b border-slate-700 hover:bg-slate-700/30 transition"
                      >
                        <td className="px-6 py-4">
                          <p className="font-medium text-white">
                            {app.userId?.full_name || "N/A"}
                          </p>
                          <p className="text-sm text-slate-400">
                            {app.userId?.email || "N/A"}
                          </p>
                          <p className="text-xs text-slate-500">
                            Phone: {app.phone || "N/A"}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-slate-300">
                          <p className="font-medium text-white">
                            {app.service_info?.service || "N/A"}
                          </p>
                          <p className="text-sm text-slate-400">
                            Exp: {app.service_info?.experience || "N/A"}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-slate-300">
                          <p className="text-sm text-white">
                            {app.location_info?.city || "N/A"},{" "}
                            {app.location_info?.state || "N/A"}
                          </p>
                          <p className="text-xs text-slate-400">
                            Pincode: {app.location_info?.pincode || "N/A"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              app.status === "Approved"
                                ? "bg-green-500/20 text-green-400"
                                : app.status === "Rejected"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              setSelectedApplication(app);
                              setCurrentPage("detail");
                            }}
                            className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium"
                          >
                            <FiEye size={16} /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredApplications.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">
                No applications found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // APPLICATION DETAIL PAGE
  if (currentPage === "detail" && selectedApplication) {
    const docs = selectedApplication.documents || {};
    const skills = selectedApplication.service_info?.skills || [];

    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <nav className="bg-slate-800/80 backdrop-blur border-b border-slate-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">✕</span>
              </div>
              <span className="text-white font-bold text-lg">
                ProVera Admin
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              <FiLogOut size={18} /> Logout
            </button>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <button
            onClick={() => setCurrentPage("providers")}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium mb-6"
          >
            ← Back to Applications
          </button>

          {/* Applicant & Service Summary Card */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  {selectedApplication.userId?.full_name || "N/A"}
                </h1>
                <p className="text-blue-400 font-medium">
                  Service: {selectedApplication.service_info?.service || "N/A"}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full font-semibold ${
                  selectedApplication.status === "Approved"
                    ? "bg-green-500/20 text-green-400"
                    : selectedApplication.status === "Rejected"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {selectedApplication.status}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-700 mb-6">
              <div>
                <p className="text-slate-400 text-sm">Full Name</p>
                <p className="text-white font-medium">
                  {selectedApplication.userId?.full_name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Email</p>
                <p className="text-white font-medium break-all">
                  {selectedApplication.userId?.email || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Phone</p>
                <p className="text-white font-medium">
                  {selectedApplication.phone || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Experience</p>
                <p className="text-white font-medium">
                  {selectedApplication.service_info?.experience || "N/A"}
                </p>
              </div>
            </div>

            {/* Skills Badges */}
            {skills.length > 0 && (
              <div className="pt-4 border-t border-slate-700">
                <p className="text-slate-400 text-sm mb-2 font-medium">
                  Skills & Specializations
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-600/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-lg text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Location Info */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Location Info</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-slate-400 text-sm">State</p>
                <p className="text-white font-medium">
                  {selectedApplication.location_info?.state || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">City</p>
                <p className="text-white font-medium">
                  {selectedApplication.location_info?.city || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Address</p>
                <p className="text-white font-medium">
                  {selectedApplication.location_info?.Address || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Pincode</p>
                <p className="text-white font-medium">
                  {selectedApplication.location_info?.pincode || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          {Object.keys(docs).length > 0 && (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 mb-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FiFileText size={22} className="text-blue-400" />
                Uploaded Documents
              </h2>

              <div className="space-y-3">
                {Object.entries(docs).map(([key, url]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between bg-slate-700/30 border border-slate-600 rounded-lg p-4 hover:bg-slate-700/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <FiFileText className="text-blue-400" size={20} />
                      <div>
                        <p className="font-medium text-white capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="text-sm text-slate-400">
                          {url ? "Uploaded" : "Pending"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {url ? (
                        <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                          <FiCheckCircle size={16} /> Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
                          <FiClock size={16} /> Pending
                        </span>
                      )}
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm"
                        >
                          <FiDownload size={16} /> View
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Section */}
          {selectedApplication.status === "Pending Review" && (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Take Action</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-3">
                    Add Rejection Remarks (if rejecting)
                  </label>
                  <textarea
                    value={rejectionRemarks}
                    onChange={(e) => setRejectionRemarks(e.target.value)}
                    placeholder="Enter specific reasons for rejection..."
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      handleApproveApplication(selectedApplication._id)
                    }
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <FiCheckCircle size={20} />
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleRejectApplication(selectedApplication._id)
                    }
                    disabled={!rejectionRemarks.trim()}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <FiXCircle size={20} />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Rejection Remarks Display */}
          {selectedApplication.status === "Rejected" &&
            selectedApplication.remarks && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <p className="text-red-400 font-semibold mb-2">
                  Rejection Remarks:
                </p>
                <p className="text-slate-300">{selectedApplication.remarks}</p>
              </div>
            )}
        </div>
      </div>
    );
  }

  return null;
}
