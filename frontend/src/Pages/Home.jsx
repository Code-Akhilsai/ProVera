import React, { useState } from "react";
import {
  FaTools,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaShieldAlt,
  FaUserPlus,
  FaFileAlt,
  FaClipboardList,
  FaCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("register");
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
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
            <a href="#workflow" className="hover:text-white transition-colors">
              Workflow
            </a>
            <a href="#portal" className="hover:text-white transition-colors">
              Onboarding Portal
            </a>
            <a
              href="#compliance"
              className="hover:text-white transition-colors"
            >
              Security & Compliance
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => nav("/login")}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all"
            >
              Sign In
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-400 hover:text-white focus:outline-none p-2"
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
              href="#workflow"
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
              href="#compliance"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 font-medium"
            >
              Security & Compliance
            </a>
            <div className="pt-4 flex flex-col space-y-2">
              <a
                href="#signin"
                className="text-center py-2.5 text-slate-300 font-medium border border-slate-800 rounded-xl"
              >
                Sign In
              </a>
              <a
                href="#portal"
                className="text-center py-2.5 bg-blue-600 text-white font-medium rounded-xl"
              >
                Sign In
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-20 pb-28 lg:pt-32 lg:pb-36 overflow-hidden border-b border-slate-800/60">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center -mt-15 space-y-8">
            <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-slate-300 text-xs font-semibold tracking-wide shadow-inner">
              <span className="h-2 w-2 rounded-full  bg-blue-500 animate-pulse"></span>
              <span>Enterprise Infrastructure for Service Marketplaces</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Service Provider <br />
              <span className="bg-linear-to-r from-blue-400 via-indigo-300 to-indigo-500 bg-clip-text text-transparent">
                Onboarding & Compliance
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Automate provider registration, secure document vaults, and
              multi-tier administrative approvals for high-scale service
              platforms.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={() => nav("/register")}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-xl shadow-blue-600/20 transition-all group"
              >
                <span>Get Started</span>
              </button>
              <button className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold px-8 py-4 rounded-xl border border-slate-800 transition-colors">
                View Architecture
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-12 grid grid-cols-3 gap-4 max-w-xl mx-auto border-t border-slate-800/80 text-left">
              <div>
                <p className="text-2xl font-bold text-white">99.9%</p>
                <p className="text-xs text-slate-500 mt-0.5">Uptime SLA</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">AES-256</p>
                <p className="text-xs text-slate-500 mt-0.5">Encrypted Vault</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">&lt; 15 min</p>
                <p className="text-xs text-slate-500 mt-0.5">Review Cycle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE PORTAL SIMULATOR SECTION ================= */}
      <section id="portal" className="py-24 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-xs font-bold text-blue-500 tracking-widest uppercase">
              Interactive Preview
            </h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Onboarding Pipeline Control
            </h3>
            <p className="text-slate-400 text-sm">
              Experience the precise workflow your providers and administrators
              interact with daily.
            </p>
          </div>

          {/* Interactive State Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Simulator Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto">
              <button
                onClick={() => setActiveTab("register")}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === "register" ? "border-blue-500 text-white bg-slate-900/80" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                <FaUserPlus className="text-blue-500" />
                <span>1. Provider Registration</span>
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === "documents" ? "border-blue-500 text-white bg-slate-900/80" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                <FaShieldAlt className="text-blue-500" />
                <span>2. Document Vault</span>
              </button>
              <button
                onClick={() => setActiveTab("admin")}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === "admin" ? "border-blue-500 text-white bg-slate-900/80" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                <FaClipboardList className="text-blue-500" />
                <span>3. Admin Verification Panel</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 sm:p-10 min-h-95 flex items-center">
              {activeTab === "register" && (
                <div className="w-full grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 px-3 py-1 rounded-md border border-blue-800/50">
                      Step 01
                    </span>
                    <h4 className="text-2xl font-bold text-white">
                      Streamlined Professional Profile Setup
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Providers register with identity confirmation, service
                      trade selection (e.g., HVAC, Electrical, Plumbing), and
                      operational zip-code boundary mapping.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>OTP-secured phone & email signup</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>Multi-trade categorization taxonomy</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>Geographic service radius configurations</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-400">
                        Full Legal Name
                      </label>
                      <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-300">
                        Marcus Sterling
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-400">
                        Primary Trade
                      </label>
                      <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-300 flex justify-between items-center">
                        <span>Master Electrical & Wiring</span>
                        <span className="text-xs text-blue-400 bg-blue-950 px-2 py-0.5 rounded">
                          Verified Tier
                        </span>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg text-sm transition-colors">
                      Save & Continue to Vault
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
                      Secure Credential & ID Upload Vault
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Applicants upload necessary legal paperwork including
                      government-issued identification, trade licenses,
                      liability insurance, and residential proof.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>
                          Instant client-side file format validation (PDF, JPG,
                          PNG)
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>Encrypted object storage mapping</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>
                          Automated expiry tracking for licensed trades
                        </span>
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
                            Govt_ID_Passport.pdf
                          </p>
                          <p className="text-[10px] text-slate-500">
                            2.4 MB • Uploaded successfully
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-900/50">
                        Ready
                      </span>
                    </div>

                    <div className="bg-slate-900 border border-slate-800/80 p-3.5 rounded-lg flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-blue-950 flex items-center justify-center text-blue-400 text-xs font-bold">
                          PDF
                        </div>
                        <div>
                          <p className="font-medium text-white text-xs">
                            Electrical_License_State.pdf
                          </p>
                          <p className="text-[10px] text-slate-500">
                            1.8 MB • Uploaded successfully
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-900/50">
                        Ready
                      </span>
                    </div>

                    <div className="pt-2">
                      <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors border border-slate-700">
                        Submit Application for Review
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
                      Centralized Admin Review & Adjudication
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Operations managers inspect credentials, cross-reference
                      data points, and execute granular status updates (Approve,
                      Request Revision, or Reject).
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>Role-based access control (RBAC) dashboard</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>One-click audit trail logging</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FaCheck className="text-blue-500 text-xs" />
                        <span>
                          Automated SMS/Email status trigger notifications
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Applicant ID: #PRV-8821
                        </p>
                        <p className="font-bold text-white text-sm">
                          Marcus Sterling
                        </p>
                      </div>
                      <span className="bg-amber-950/80 text-amber-400 border border-amber-800/50 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        Pending Admin Audit
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded-lg text-xs transition-colors">
                        Approve Provider
                      </button>
                      <button className="bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 font-medium py-2 rounded-lg text-xs transition-colors">
                        Request Revision
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ARCHITECTURE WORKFLOW ================= */}
      <section id="workflow" className="py-24 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-blue-500 tracking-widest uppercase">
              System Architecture
            </h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Structured End-to-End Pipeline
            </h3>
            <p className="text-slate-400 text-sm">
              Designed for robust data integrity and frictionless scaling across
              regional markets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-800/50">
                01
              </div>
              <h4 className="text-lg font-bold text-white">
                Intake & Verification
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Captures professional credentials, validates tax IDs, and
                normalizes location-based metadata through strict input schemas.
              </p>
            </div>

            <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-800/50">
                02
              </div>
              <h4 className="text-lg font-bold text-white">
                Secure Document Vault
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Isolates sensitive identification records behind encrypted cloud
                storage buckets with strict tokenized access boundaries.
              </p>
            </div>

            <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-800/50">
                03
              </div>
              <h4 className="text-lg font-bold text-white">
                Adjudication & Dispatch
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Enables operations teams to verify credentials and automatically
                push active provider keys to marketplace booking engines.
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
            <span className="font-bold">ProVera Enterprise Infrastructure</span>
          </div>
          <div>
            <p className="text-xs">
              © {new Date().getFullYear()} ProVera Inc. All production rights
              reserved.
            </p>
          </div>
          <div className="flex space-x-6 text-xs">
            <a
              href="#privacy"
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Schema
            </a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </a>
            <a
              href="#security"
              className="hover:text-slate-300 transition-colors"
            >
              Security Whitepaper
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
