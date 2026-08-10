import React, { useState } from "react";
import {
  FaTools,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Password validation state rules
  const validations = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
    match: formData.password && formData.password === formData.confirmPassword,
  };

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
    setSuccessMsg("");

    // Validate all requirements before making API call
    if (
      !validations.length ||
      !validations.uppercase ||
      !validations.number ||
      !validations.special
    ) {
      setErrorMsg("Please meet all password security requirements.");
      return;
    }

    if (!validations.match) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

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
        setIsSubmitting(false);
        return;
      }

      setSuccessMsg("Account created successfully! Redirecting...");
      setTimeout(() => {
        nav("/provider-dashboard");
      }, 1200);
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response?.data?.message || "Registration failed");
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
      <main className="grow grid lg:grid-cols-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 items-center gap-12">
        {/* Left Side: Professional Platform Content */}
        <div className="lg:col-span-7 space-y-6 text-left hidden lg:block pr-6">
          <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-slate-300 text-xs font-semibold tracking-wide shadow-inner">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>Secure Provider Onboarding Infrastructure</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Join the Premier Network for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
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
          <div className="max-w-md w-full bg-slate-900 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl">
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

            {successMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                <p className="text-emerald-400 text-xs">{successMsg}</p>
              </div>
            )}

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
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none cursor-pointer"
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
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="text-xs" />
                    ) : (
                      <FaEye className="text-xs" />
                    )}
                  </button>
                </div>
              </div>

              {/* Real-time Password Strength and Validation Feedback */}
              {formData.password && (
                <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 space-y-1.5 text-[11px]">
                  <p className="text-slate-400 font-medium mb-1">
                    Password requirements:
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div
                      className={`flex items-center space-x-1.5 ${validations.length ? "text-emerald-400" : "text-slate-500"}`}
                    >
                      {validations.length ? (
                        <FaCheck className="text-[10px]" />
                      ) : (
                        <FaTimes className="text-[10px]" />
                      )}
                      <span>At least 8 characters</span>
                    </div>
                    <div
                      className={`flex items-center space-x-1.5 ${validations.uppercase ? "text-emerald-400" : "text-slate-500"}`}
                    >
                      {validations.uppercase ? (
                        <FaCheck className="text-[10px]" />
                      ) : (
                        <FaTimes className="text-[10px]" />
                      )}
                      <span>One uppercase letter</span>
                    </div>
                    <div
                      className={`flex items-center space-x-1.5 ${validations.number ? "text-emerald-400" : "text-slate-500"}`}
                    >
                      {validations.number ? (
                        <FaCheck className="text-[10px]" />
                      ) : (
                        <FaTimes className="text-[10px]" />
                      )}
                      <span>One number</span>
                    </div>
                    <div
                      className={`flex items-center space-x-1.5 ${validations.special ? "text-emerald-400" : "text-slate-500"}`}
                    >
                      {validations.special ? (
                        <FaCheck className="text-[10px]" />
                      ) : (
                        <FaTimes className="text-[10px]" />
                      )}
                      <span>One special character</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Password Match Indicator */}
              {formData.confirmPassword && (
                <div
                  className={`text-[11px] flex items-center space-x-1.5 px-1 ${validations.match ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {validations.match ? (
                    <FaCheck className="text-[10px]" />
                  ) : (
                    <FaTimes className="text-[10px]" />
                  )}
                  <span>
                    {validations.match
                      ? "Passwords match perfectly"
                      : "Passwords do not match"}
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-medium py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/20 mt-2 cursor-pointer"
              >
                <span>
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </span>
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
