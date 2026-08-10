import React, { useState } from "react";
import {
  FaTools,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        },
      );

      if (response.status !== 200) {
        throw new Error("Login failed");
      }

      setSuccessMsg("Signed in successfully! Redirecting...");
      setTimeout(() => {
        nav("/provider-dashboard", { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg(
        error.response?.data?.message ||
          "Invalid email or password. Please try again.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Minimal Header */}
      <header className="w-full border-b border-slate-800/60 bg-slate-950/80 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="flex items-center space-x-2.5">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <FaTools className="text-sm" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              ProVera<span className="text-blue-500">.</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Split Layout Container */}
      <main className="grow grid lg:grid-cols-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 items-center gap-12">
        {/* Left Side: Professional Platform Content */}
        <div className="lg:col-span-7 space-y-6 text-left hidden lg:block pr-6">
          <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-slate-300 text-xs font-semibold tracking-wide shadow-inner">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>Secure Provider Portal Gateway</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Welcome Back to Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Management Hub
            </span>
          </h1>

          <p className="text-slate-400 text-sm xl:text-base leading-relaxed max-w-xl">
            Access your verification pipeline, update credential documents, and
            manage incoming service appointments securely in real-time.
          </p>

          <div className="space-y-3.5 pt-4">
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <div className="w-6 h-6 rounded-full bg-blue-950 flex items-center justify-center text-blue-400 text-xs shrink-0">
                <FaCheck />
              </div>
              <span>Real-time tracking of admin document audit states</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <div className="w-6 h-6 rounded-full bg-blue-950 flex items-center justify-center text-blue-400 text-xs shrink-0">
                <FaCheck />
              </div>
              <span>
                Encrypted access to your professional credentials vault
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <div className="w-6 h-6 rounded-full bg-blue-950 flex items-center justify-center text-blue-400 text-xs shrink-0">
                <FaCheck />
              </div>
              <span>Instant client booking dispatch notifications</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Box */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div className="max-w-sm w-full bg-slate-900 border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="space-y-1 text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Sign in to your account
              </h2>
              <p className="text-slate-400 text-xs">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-xs">{errorMsg}</p>
              </div>
            )}

            {successMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                <p className="text-emerald-400 text-xs">{successMsg}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <FaEnvelope className="text-xs" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 pl-10 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <FaLock className="text-xs" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-xs" />
                    ) : (
                      <FaEye className="text-xs" />
                    )}
                  </button>
                </div>
                {/* Forgot Password below the password field */}
                <div className="flex justify-end pt-1">
                  <a
                    href="#forgot"
                    className="text-[11px] text-blue-400 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-medium py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25 mt-1 cursor-pointer"
              >
                <span>{isSubmitting ? "Signing in..." : "Sign In"}</span>
              </button>
            </form>

            {/* Don't have an account link */}
            <div className="text-center pt-2.5 border-t border-slate-800/80">
              <p className="text-xs text-slate-400">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-blue-400 font-medium hover:underline"
                >
                  Create account
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
