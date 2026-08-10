import React, { useState } from "react";
import {
  FaTools,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/register",
        {
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        },
      );

      if (res.status !== 201) {
        setErrorMsg("User failed to register");
        return;
      }

      nav("/provider-dashboard");
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response?.data?.message || "Registration failed");
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
      <main className="grow grid lg:grid-cols-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 items-center gap-12">
        {/* Left Side: Professional Platform Content */}
        <div className="lg:col-span-7 space-y-6 text-left hidden lg:block pr-6">
          <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-slate-300 text-xs font-semibold tracking-wide shadow-inner">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>Secure Provider Onboarding Infrastructure</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Join the Premier Network for{" "}
            <span className="bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Verified Professionals
            </span>
          </h1>

          <p className="text-slate-400 text-sm xl:text-base leading-relaxed max-w-xl">
            Register your practice, submit credential documentation to our
            encrypted vault, and fast-track your profile verification to accept
            high-value local gigs.
          </p>

          <div className="space-y-3.5 pt-4">
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <div className="w-6 h-6 rounded-full bg-blue-950 flex items-center justify-center text-blue-400 text-xs shrink-0">
                <FaCheck />
              </div>
              <span>Fast-track 24-hour verification review cycles</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <div className="w-6 h-6 rounded-full bg-blue-950 flex items-center justify-center text-blue-400 text-xs shrink-0">
                <FaCheck />
              </div>
              <span>
                AES-256 encrypted document storage for your licenses and IDs
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <div className="w-6 h-6 rounded-full bg-blue-950 flex items-center justify-center text-blue-400 text-xs shrink-0">
                <FaCheck />
              </div>
              <span>
                Centralized portal dashboard to manage client appointments
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Signup Box */}
        <div className="lg:col-span-5 w-full flex justify-center lg:-mt-3">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-3 shadow-2xl">
            <div className="space-y-1 text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Create an account
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Enter your details to register as a service provider.
              </p>
            </div>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-xs">{errorMsg}</p>
              </div>
            )}

            {/* Google Signup Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center space-x-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors shadow-sm"
            >
              <FcGoogle className="text-base" />
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center space-x-4">
              <div className="grow border-t border-slate-800"></div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                Or with email
              </span>
              <div className="grow border-t border-slate-800"></div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <FaUser className="text-xs" />
                  </div>
                  <input
                    type="text"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

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
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-xs" />
                    ) : (
                      <FaEye className="text-xs" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <FaLock className="text-xs" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="text-xs" />
                    ) : (
                      <FaEye className="text-xs" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center space-x-2 pt-2 shadow-lg shadow-blue-600/20 mt-1"
              >
                <span>Create Account</span>
              </button>
            </form>

            {/* Already Registered Link */}
            <div className="text-center pt-3 border-t border-slate-800/80">
              <p className="text-xs text-slate-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-400 font-medium hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
