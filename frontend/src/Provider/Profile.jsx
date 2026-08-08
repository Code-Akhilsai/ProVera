import React, { useState } from "react";
import {
  FaShieldAlt,
  FaHome,
  FaUser,
  FaFileAlt,
  FaClipboardList,
  FaBell,
  FaQuestionCircle,
  FaSignOutAlt,
  FaHeadset,
  FaArrowRight,
  FaLock,
  FaCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("My Profile");

  // Form State matching the design
  const [formData, setFormData] = useState({
    fullName: "Akhil Sai",
    email: "akhilsai@example.com",
    phone: "",
    serviceCategory: "",
    experience: "",
    skills: {
      installation: false,
      repair: false,
      maintenance: false,
      troubleshooting: false,
      other: false,
    },
    state: "",
    city: "",
    address: "",
    pincode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillToggle = (skillKey) => {
    setFormData({
      ...formData,
      skills: { ...formData.skills, [skillKey]: !formData.skills[skillKey] },
    });
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, action: () => nav("/dashboard") },
    { name: "My Profile", icon: <FaUser /> },
    { name: "Documents", icon: <FaFileAlt />, action: () => nav("/documents") },
    {
      name: "Application Status",
      icon: <FaClipboardList />,
      action: () => nav("/status"),
    },
    { name: "Notifications", icon: <FaBell /> },
    { name: "Help & Support", icon: <FaQuestionCircle /> },
    { name: "Logout", icon: <FaSignOutAlt />, action: () => nav("/login") },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-blue-600 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col justify-between shrink-0 md:flex">
        <div className="p-6 space-y-8">
          {/* Logo Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => nav("/")}
          >
            <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-900/30">
              <FaShieldAlt className="text-lg" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block leading-none">
                ProVera
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase mt-1 block">
                Provider Portal
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {menuItems.map((item, idx) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (item.action) item.action();
                    else setActiveTab(item.name);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-medium transition-colors cursor-pointer ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"}`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Need Help Box */}
        <div className="p-4 m-4 bg-slate-900/80 border border-slate-800/80 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-white font-medium text-xs">
            <FaHeadset className="text-blue-500" />
            <span>Need Help?</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            We're here to help you
          </p>
          <p className="text-[11px] font-semibold text-white">
            +91 98765 43210
          </p>
          <a
            href="mailto:support@provera.com"
            className="text-[11px] text-blue-400 hover:underline block truncate"
          >
            support@provera.com
          </a>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="grow flex flex-col justify-between bg-slate-950 min-w-0">
        {/* Top Header Bar */}
        <header className="h-20 border-b border-slate-900 px-6 lg:px-10 flex items-center justify-between bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => nav("/dashboard")}
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
                alt="Akhil Sai"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-600/40"
              />
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-white block">
                  Akhil Sai
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Profile Content Workspace */}
        <main className="grow p-6 lg:p-10 space-y-6 max-w-5xl w-full mx-auto">
          {/* Header Title & Steps */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Complete Your Profile
              </h1>
              <p className="text-xs text-slate-400">
                Fill in your details to complete your profile and continue your
                application.
              </p>
            </div>

            {/* Step Progress Bar Header */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
              <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800 z-0"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 z-0 w-1/3"></div>

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-lg shadow-blue-600/30">
                    1
                  </div>
                  <span className="text-xs font-semibold text-white">
                    Basic Details
                  </span>
                </div>
                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-bold text-xs flex items-center justify-center">
                    2
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    Service Details
                  </span>
                </div>
                {/* Step 3 */}
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-bold text-xs flex items-center justify-center">
                    3
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    Documents
                  </span>
                </div>
                {/* Step 4 */}
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-bold text-xs flex items-center justify-center">
                    4
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    Review & Submit
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Profile details saved successfully!");
              nav("/dashboard");
            }}
            className="space-y-6"
          >
            {/* Section 1: Personal Information */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center space-x-3 border-b border-slate-800/80 pb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center text-sm">
                  <FaUser />
                </div>
                <h2 className="text-sm font-bold text-white tracking-wide">
                  Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Service Information */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center space-x-3 border-b border-slate-800/80 pb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center text-sm">
                  <FaShieldAlt />
                </div>
                <h2 className="text-sm font-bold text-white tracking-wide">
                  Service Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-300">
                    Select Service Category
                  </label>
                  <select
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-400 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Choose your service</option>
                    <option value="electrical">
                      Master Electrical & Wiring
                    </option>
                    <option value="plumbing">Plumbing & Pipe Fitting</option>
                    <option value="hvac">HVAC Maintenance</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-300">
                    Years of Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-400 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0 - 1 Years</option>
                    <option value="1-3">1 - 3 Years</option>
                    <option value="3-5">3 - 5 Years</option>
                    <option value="5+">5+ Years</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[11px] font-medium text-slate-300 block">
                  Skills (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { key: "installation", label: "Installation" },
                    { key: "repair", label: "Repair" },
                    { key: "maintenance", label: "Maintenance" },
                    { key: "troubleshooting", label: "Troubleshooting" },
                    { key: "other", label: "Other" },
                  ].map((skill) => {
                    const isChecked = formData.skills[skill.key];
                    return (
                      <button
                        type="button"
                        key={skill.key}
                        onClick={() => handleSkillToggle(skill.key)}
                        className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${isChecked ? "bg-blue-950/60 border-blue-600 text-white" : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"}`}
                      >
                        <span
                          className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? "bg-blue-600 border-blue-600 text-white" : "border-slate-700 bg-slate-900"}`}
                        >
                          {isChecked && <FaCheck className="text-[10px]" />}
                        </span>
                        <span>{skill.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 3: Location Information */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center space-x-3 border-b border-slate-800/80 pb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center text-sm">
                  <FaHome />
                </div>
                <h2 className="text-sm font-bold text-white tracking-wide">
                  Location Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-300">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-400 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select state</option>
                    <option value="telangana">Telangana</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="karnataka">Karnataka</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-300">
                    City
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-400 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select city</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="secunderabad">Secunderabad</option>
                    <option value="warangal">Warangal</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-slate-300">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your full address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5 max-w-xs">
                <label className="text-[11px] font-medium text-slate-300">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Bottom Footer Notice & Submit CTA */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-900/40 text-blue-400 flex items-center justify-center text-lg shrink-0">
                  <FaShieldAlt />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-white">
                    Please fill all the details
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Accurate information helps us verify your profile faster and
                    improve your chances of approval.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-1.5 w-full sm:w-auto shrink-0">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Save & Continue</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 justify-center w-full">
                  <FaLock className="text-[9px]" />
                  <span>Your information is secure with us</span>
                </div>
              </div>
            </div>
          </form>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 py-4 px-6 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} ProVera Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
