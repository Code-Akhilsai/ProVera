import React, { useState } from "react";
import {
  FaTools,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaShieldAlt,
  FaUserPlus,
  FaClipboardList,
  FaCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("register");
  const nav = useNavigate();

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const blockBack = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", blockBack);
    return () => window.removeEventListener("popstate", blockBack);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white scroll-smooth">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-900/30">
              <FaTools className="text-lg" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              ProVera<span className="text-blue-500">.</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            <a href="#portal" className="hover:text-white transition-colors">
              Workflow
            </a>
            <a href="#portal" className="hover:text-white transition-colors">
              Onboarding Portal
            </a>
            <a
              href="#requirements"
              className="hover:text-white transition-colors"
            >
              Requirements
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => nav("/login")}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
            >
              Sign In
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-400 hover:text-white focus:outline-none p-2 cursor-pointer"
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-4 pb-6 space-y-3">
            <a
              href="#portal"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 font-medium"
            >
              Workflow
            </a>
            <a
              href="#portal"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 font-medium"
            >
              Onboarding Portal
            </a>
            <a
              href="#requirements"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 font-medium"
            >
              Requirements
            </a>
            <div className="pt-4 flex flex-col space-y-2">
              <button
                onClick={() => nav("/login")}
                className="w-full text-center py-2.5 bg-blue-600 text-white font-medium rounded-xl cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-20 pb-28 lg:pt-32 lg:pb-36 overflow-hidden border-b border-slate-800/60">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-slate-300 text-xs font-semibold tracking-wide shadow-inner">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span>Service Provider Onboarding Portal</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Manage Service Providers <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-indigo-500 bg-clip-text text-transparent">
                Seamlessly & Securely
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A complete platform allowing service providers to register,
              complete profiles, upload verification documents, and submit
              applications for admin verification[cite: 1].
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <a
                href="#portal"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-xl shadow-blue-600/20 transition-all cursor-pointer group space-x-2"
              >
                <span>Get Started</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => nav("/login")}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold px-8 py-4 rounded-xl border border-slate-800 transition-colors cursor-pointer"
              >
                Sign In to Portal
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-12 grid grid-cols-3 gap-4 max-w-xl mx-auto border-t border-slate-800/80 text-left">
              <div>
                <p className="text-2xl font-bold text-white">MERN</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Stack Architecture
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">JWT</p>
                <p className="text-xs text-slate-500 mt-0.5">Secure Auth</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Role-Based</p>
                <p className="text-xs text-slate-500 mt-0.5">Access Control</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE PORTAL SIMULATOR SECTION ================= */}
      <section id="portal" className="py-24 bg-slate-900/50 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-xs font-bold text-blue-500 tracking-widest uppercase">
              Interactive Preview
            </h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Onboarding Pipeline Control
            </h3>
            <p className="text-slate-400 text-sm">
              Experience the core workflows built for service providers and
              administrators[cite: 1].
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto">
              <button
                onClick={() => setActiveTab("register")}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === "register" ? "border-blue-500 text-white bg-slate-900/80" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                <FaUserPlus className="text-blue-500" />
                <span>1. Provider Registration</span>
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === "documents" ? "border-blue-500 text-white bg-slate-900/80" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                <FaShieldAlt className="text-blue-500" />
                <span>2. Profile & Documents</span>
              </button>
              <button
                onClick={() => setActiveTab("admin")}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === "admin" ? "border-blue-500 text-white bg-slate-900/80" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                <FaClipboardList className="text-blue-500" />
                <span>3. Admin Verification</span>
              </button>
            </div>

            <div className="p-6 sm:p-10 min-h-[380px] flex items-center">
              {activeTab === "register" && (
                <div className="w-full grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 px-3 py-1 rounded-md border border-blue-800/50">
                      Step 01
                    </span>
                    <h4 className="text-2xl font-bold text-white">
                      Register & Complete Profile
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Providers register securely, select service categories,
                      define skills & experience, and specify service
                      locations[cite: 1].
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>Secure JWT Authentication</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>Service categories & trade selection</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>Editable profile before final approval</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-400">
                        Full Name
                      </label>
                      <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-300">
                        Akhil Sai
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-400">
                        Selected Service Category
                      </label>
                      <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-300 flex justify-between items-center">
                        <span>Master Electrical & Wiring</span>
                        <span className="text-xs text-blue-400 bg-blue-950 px-2 py-0.5 rounded">
                          Active
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => nav("/register")}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="w-full grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 px-3 py-1 rounded-md border border-blue-800/50">
                      Step 02
                    </span>
                    <h4 className="text-2xl font-bold text-white">
                      Upload Verification Documents
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Service providers upload profile photos and official
                      verification documents required for review[cite: 1].
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>Profile Photo & ID Proofs</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>Real-time Application Status Tracking</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>Proper Error Handling & Validation</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
                    <div className="bg-slate-900 border border-slate-800/80 p-3.5 rounded-lg flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-blue-950 flex items-center justify-center text-blue-400 text-xs font-bold">
                          PDF
                        </div>
                        <div>
                          <p className="font-medium text-white text-xs">
                            Verification_ID.pdf
                          </p>
                          <p className="text-[10px] text-slate-500">
                            Uploaded successfully
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-900/50">
                        Ready
                      </span>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => nav("/login")}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors border border-slate-700 cursor-pointer"
                      >
                        Submit Application
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "admin" && (
                <div className="w-full grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 px-3 py-1 rounded-md border border-blue-800/50">
                      Step 03
                    </span>
                    <h4 className="text-2xl font-bold text-white">
                      Admin Review & Adjudication
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Admins can view all providers, search & filter records,
                      review uploaded documents, and approve or reject
                      applications with remarks[cite: 1].
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>Comprehensive Dashboard Statistics</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>Search and Filter Providers</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>Approve / Reject with Remarks</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Provider Application
                        </p>
                        <p className="font-bold text-white text-sm">
                          Akhil Sai
                        </p>
                      </div>
                      <span className="bg-amber-950/80 text-amber-400 border border-amber-800/50 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        Pending Review
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        onClick={() => nav("/adminlogin")}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        Approve Provider
                      </button>
                      <button
                        onClick={() => nav("/adminlogin")}
                        className="bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 font-medium py-2 rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        Reject Application
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= REQUIREMENTS SECTION ================= */}
      <section
        id="requirements"
        className="py-24 border-t border-slate-800/60 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-blue-500 tracking-widest uppercase">
              System Specifications
            </h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Technical & Functional Highlights
            </h3>
            <p className="text-slate-400 text-sm">
              Engineered following clean modular standards and full
              responsiveness.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-800/50">
                01
              </div>
              <h4 className="text-lg font-bold text-white">
                Service Provider Portal
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Complete profile management, service category selections, skill
                lists, location info, and live status feedback[cite: 1].
              </p>
            </div>

            <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-800/50">
                02
              </div>
              <h4 className="text-lg font-bold text-white">
                Admin Control Center
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Central dashboard with aggregated statistics, document previews,
                instant search filters, and rejection remarks[cite: 1].
              </p>
            </div>

            <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-800/50">
                03
              </div>
              <h4 className="text-lg font-bold text-white">
                Robust Tech Stack
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Built using React, Node.js, Express, and MongoDB with secure JWT
                authentication and protected routing[cite: 1].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-white">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <FaTools className="text-xs" />
            </div>
            <span className="font-bold">ProVera Onboarding Portal</span>
          </div>
          <div>
            <p className="text-xs">
              © {new Date().getFullYear()} ProVera Inc. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6 text-xs">
            <a
              href="#portal"
              className="hover:text-slate-300 transition-colors"
            >
              Portal Preview
            </a>
            <a
              href="#requirements"
              className="hover:text-slate-300 transition-colors"
            >
              Requirements
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
