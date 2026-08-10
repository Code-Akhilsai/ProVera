import React from "react";
import {
  FaHome,
  FaUser,
  FaFileAlt,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios";

export const providerRoutes = {
  dashboard: "/provider-dashboard",
  profile: "/profile",
  documents: "/upload-documents",
  applications: "/submit",
  home: "/",
};

export function buildProviderMenuItems({ nav, setActiveTab, page }) {
  const setTab = (tabName) => {
    if (setActiveTab) {
      setActiveTab(tabName);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/logout", {}, { withCredentials: true });

      nav(providerRoutes.home);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return [
    {
      name: "Dashboard",
      icon: <FaHome />,
      action:
        page === "dashboard"
          ? () => setTab("Dashboard")
          : () => nav(providerRoutes.dashboard),
    },
    {
      name: "My Profile",
      icon: <FaUser />,
      action:
        page === "profile"
          ? () => setTab("My Profile")
          : () => nav(providerRoutes.profile),
    },
    {
      name: "Documents",
      icon: <FaFileAlt />,
      action:
        page === "documents"
          ? () => setTab("Documents")
          : () => nav(providerRoutes.documents),
    },
    {
      name: "My Applications",
      icon: <FaClipboardList />,
      action:
        page === "dashboard"
          ? () => setTab("My Applications")
          : () =>
              nav(providerRoutes.dashboard, {
                state: { tab: "My Applications" },
              }),
    },
    {
      name: "Logout",
      icon: <FaSignOutAlt />,
      action: handleLogout,
    },
  ];
}
