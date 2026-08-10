import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children, role }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const endpoint =
          role === "admin"
            ? "http://localhost:3000/api/v1/admin/dashboard"
            : "http://localhost:3000/api/v1/profile";

        const res = await axios.post(endpoint, null, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [role]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={role === "admin" ? "/adminlogin" : "/login"} replace />
    );
  }

  return children;
}
