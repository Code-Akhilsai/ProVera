import React, { useState } from "react";
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

export default function AdminDashboard({ providers = [], onLogout }) {
  const [currentPage, setCurrentPage] = useState("dashboard"); // dashboard, providers, detail
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [rejectionRemarks, setRejectionRemarks] = useState("");
  const [localProviders, setLocalProviders] = useState(providers);

  // Get Dashboard Stats
  const getStats = () => {
    const total = localProviders.length;
    const approved = localProviders.filter(
      (p) => p.status === "approved",
    ).length;
    const rejected = localProviders.filter(
      (p) => p.status === "rejected",
    ).length;
    const pending = localProviders.filter((p) => p.status === "pending").length;
    return { total, approved, rejected, pending };
  };

  // Filter & Search Providers
  const getFilteredProviders = () => {
    return localProviders.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchFilter = filterStatus === "all" || p.status === filterStatus;
      return matchSearch && matchFilter;
    });
  };

  // Approve Provider
  const handleApproveProvider = (id) => {
    setLocalProviders(
      localProviders.map((p) =>
        p.id === id ? { ...p, status: "approved", remarks: "" } : p,
      ),
    );
    setSelectedProvider(null);
    setCurrentPage("providers");
  };

  // Reject Provider
  const handleRejectProvider = (id) => {
    if (rejectionRemarks.trim()) {
      setLocalProviders(
        localProviders.map((p) =>
          p.id === id
            ? { ...p, status: "rejected", remarks: rejectionRemarks }
            : p,
        ),
      );
      setRejectionRemarks("");
      setSelectedProvider(null);
      setCurrentPage("providers");
    }
  };

  const stats = getStats();
  const filteredProviders = getFilteredProviders();

  // DASHBOARD PAGE
  if (currentPage === "dashboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Navbar */}
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
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              <FiLogOut size={18} /> Logout
            </button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-white">Dashboard</span>
            </h1>
            <p className="text-slate-400">Welcome back, Admin</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    Total Providers
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

          {/* Quick Actions */}
          <button
            onClick={() => setCurrentPage("providers")}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition"
          >
            Manage Providers
          </button>
        </div>
      </div>
    );
  }

  // PROVIDERS LIST PAGE
  if (currentPage === "providers") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Navbar */}
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
              onClick={onLogout}
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
            <h1 className="text-4xl font-bold">
              <span className="text-white">Manage Service Providers</span>
            </h1>
            <p className="text-slate-400 mt-2">
              Review and approve service provider applications
            </p>
          </div>

          {/* Search & Filter */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <FiSearch
                  className="absolute left-3 top-3 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by name, email, or category..."
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
                  <option value="pending">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Providers Table */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Applied Date
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
                  {filteredProviders.map((provider) => (
                    <tr
                      key={provider.id}
                      className="border-b border-slate-700 hover:bg-slate-700/30 transition"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-white">
                          {provider.name}
                        </p>
                        <p className="text-sm text-slate-400">
                          {provider.email}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {provider.category}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {provider.appliedDate}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            provider.status === "approved"
                              ? "bg-green-500/20 text-green-400"
                              : provider.status === "rejected"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {provider.status.charAt(0).toUpperCase() +
                            provider.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedProvider(provider);
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

          {filteredProviders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">
                No providers found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // PROVIDER DETAIL PAGE
  if (currentPage === "detail" && selectedProvider) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Navbar */}
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
              onClick={onLogout}
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
            ← Back to Providers
          </button>

          {/* Provider Info Card */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {selectedProvider.name}
                </h1>
                <p className="text-slate-400">
                  {selectedProvider.category} Service Provider
                </p>
              </div>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full font-semibold ${
                  selectedProvider.status === "approved"
                    ? "bg-green-500/20 text-green-400"
                    : selectedProvider.status === "rejected"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {selectedProvider.status.charAt(0).toUpperCase() +
                  selectedProvider.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-700">
              <div>
                <p className="text-slate-400 text-sm">Email</p>
                <p className="text-white font-medium">
                  {selectedProvider.email}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Phone</p>
                <p className="text-white font-medium">
                  {selectedProvider.phone}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Applied Date</p>
                <p className="text-white font-medium">
                  {selectedProvider.appliedDate}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Experience</p>
                <p className="text-white font-medium">
                  {selectedProvider.experience}
                </p>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          {selectedProvider.documents &&
            selectedProvider.documents.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 mb-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FiFileText size={24} className="text-blue-400" />
                  Uploaded Documents
                </h2>

                <div className="space-y-3">
                  {selectedProvider.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-slate-700/30 border border-slate-600 rounded-lg p-4 hover:bg-slate-700/50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <FiFileText className="text-blue-400" size={20} />
                        <div>
                          <p className="font-medium text-white">{doc.name}</p>
                          <p className="text-sm text-slate-400">{doc.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {doc.verified ? (
                          <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                            <FiCheckCircle size={16} /> Verified
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
                            <FiClock size={16} /> Pending
                          </span>
                        )}
                        <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm">
                          <FiDownload size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Action Section */}
          {selectedProvider.status === "pending" && (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Take Action
              </h2>

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
                    onClick={() => handleApproveProvider(selectedProvider.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <FiCheckCircle size={20} />
                    Approve Provider
                  </button>
                  <button
                    onClick={() => {
                      if (rejectionRemarks.trim()) {
                        handleRejectProvider(selectedProvider.id);
                      }
                    }}
                    disabled={!rejectionRemarks.trim()}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <FiXCircle size={20} />
                    Reject Provider
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Rejection Remarks Display */}
          {selectedProvider.status === "rejected" &&
            selectedProvider.remarks && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <p className="text-red-400 font-semibold mb-2">
                  Rejection Remarks:
                </p>
                <p className="text-slate-300">{selectedProvider.remarks}</p>
              </div>
            )}
        </div>
      </div>
    );
  }

  return null;
}
