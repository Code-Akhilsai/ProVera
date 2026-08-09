import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/admin/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        const res = await axios.post(
          "http://localhost:3000/api/v1/admin/dashboard",
          null,
          {
            withCredentials: true,
          },
        );

        if (res.status === 200) {
          nav("/admin-dashboard");
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
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-lg mb-4">
            <span className="text-white font-bold text-2xl">✕</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">ProVera Admin</h1>
          <p className="text-slate-400">Service Provider Management</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white font-semibold py-2 rounded-lg hover:from-blue-700 hover:to-blue-600 transition mt-6"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
