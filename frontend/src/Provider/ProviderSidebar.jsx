import React from "react";
import { FaShieldAlt, FaHeadset } from "react-icons/fa";

export default function ProviderSidebar({
  menuItems,
  activeTab,
  onLogoClick,
  open,
  onClose,
  onItemClick,
  showHelp = true,
}) {
  const handleItemClick = (item) => {
    if (onItemClick) onItemClick(item);
    else item.action?.();
    onClose?.();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-900 flex flex-col justify-between shrink-0 transform transition-transform duration-300 ease-in-out lg:static lg:z-0 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-8">
          {/* Logo Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => {
              onLogoClick?.();
              onClose?.();
            }}
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
                  onClick={() => handleItemClick(item)}
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
        {showHelp && (
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
        )}
      </aside>
    </>
  );
}
