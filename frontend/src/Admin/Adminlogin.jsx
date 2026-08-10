import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTools, FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/v1/admin/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        const res = await axios.post("/api/v1/admin/dashboard", null, {
          withCredentials: true,
        });

        if (res.status === 200) {
          nav("/admin-dashboard", { replace: true });
        }
      }
    } catch (error) {
      console.log("Error:", error);
      console.log("Server response:", error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="bg-blue-600 text-white p-3.5 rounded-2xl shadow-xl shadow-blue-900/30">
              <FaTools className="text-2xl" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">ProVera Admin</h1>
          <p className="text-slate-400">Service Provider Management</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 pr-10 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white font-semibold py-2 rounded-lg hover:from-blue-700 hover:to-blue-600 transition mt-6"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
