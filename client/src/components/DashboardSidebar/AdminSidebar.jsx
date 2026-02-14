import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import {
  LayoutDashboard,
  Users,
  PlusCircle,
  User,
  BookOpen,
  LogOut
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuthStore();

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      label: "All Users",
      icon: Users,
      path: "/admin/all-users",
    },
    {
      label: "Course Subjects",
      icon: BookOpen,
      path: "/admin/cource-subject",
    },
    {
      label: "Add Question",
      icon: PlusCircle,
      path: "/admin/add-question",
    },
    {
      label: "Profile",
      icon: User,
      path: "/admin/profile",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col justify-between">

      {/* Logo */}
      <div>
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <h1 className="text-xl font-semibold text-white tracking-wide">
            Admin Panel
          </h1>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                ${active
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                <Icon
                  size={20}
                  className={`${active ? "text-white" : "text-slate-400 group-hover:text-white"
                    }`}
                />

                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
