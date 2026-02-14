import React, { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { Users, GraduationCap, UserX, UserPlus } from "lucide-react";

const AdminMain = () => {
  const { dashBoardData, getDashboardData } = useAdminStore();

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  /* ----------------------------- Stats Data ----------------------------- */

  const stats = [
    {
      label: "Total Users",
      value: dashBoardData?.totalUsers || 0,
      icon: Users,
      color: "blue",
      description: "Total number of registered users on the platform.",
    },
    {
      label: "Course Enrollment",
      value: dashBoardData?.totalCourceUsers || 0,
      icon: GraduationCap,
      color: "green",
      description: "Students currently enrolled in your assigned course.",
    },
    {
      label: "Blocked Accounts",
      value: dashBoardData?.blockedUsers || 0,
      icon: UserX,
      color: "red",
      description: "Accounts restricted due to policy or administrative action.",
    },
    {
      label: "New Registrations",
      value: dashBoardData?.lastMonthRegistrations || 0,
      icon: UserPlus,
      color: "purple",
      description: "Users who registered within the last 30 days.",
    },
  ];

  /* ----------------------------- Color Classes ----------------------------- */

  const colorClasses = {
    blue: {
      border: "border-blue-500",
      iconBg:
        "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    green: {
      border: "border-green-500",
      iconBg:
        "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    red: {
      border: "border-red-500",
      iconBg:
        "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-600 dark:text-red-400",
    },
    purple: {
      border: "border-purple-500",
      iconBg:
        "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  };

  /* ----------------------------- UI ----------------------------- */

  return (
    <div className="flex-1 min-h-screen p-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">

      {/* Header */}

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Monitor platform activity, manage users, and oversee course operations.
        </p>
      </div>

      {/* Stats Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = colorClasses[stat.color];

          return (
            <div
              key={index}
              className={`
                group
                bg-white dark:bg-slate-800
                border-l-4 ${colors.border}
                rounded-xl
                p-6
                shadow-sm hover:shadow-lg
                transition-all duration-300
                hover:-translate-y-1
              `}
            >

              <div className="flex items-start justify-between">

                {/* Text */}

                <div>

                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>

                  <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                    {stat.description}
                  </p>

                </div>

                {/* Icon */}

                <div
                  className={`
                    ${colors.iconBg}
                    ${colors.iconColor}
                    p-3
                    rounded-lg
                    transition-all duration-300
                    group-hover:scale-110
                  `}
                >
                  <Icon size={26} />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Admin Overview Section */}

      <div className="
        bg-white dark:bg-slate-800
        rounded-xl
        p-8
        shadow-sm hover:shadow-md
        transition-all duration-300
      ">

        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Administration Overview
        </h2>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          This dashboard provides real-time insights into platform usage and student engagement.
          Administrators can monitor registrations, manage user access, and ensure the system
          operates efficiently within their assigned course environment.
        </p>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Use the available tools to maintain platform integrity, support academic activities,
          and manage student accounts effectively. Regular monitoring helps ensure smooth and
          secure system performance.
        </p>

      </div>

    </div>
  );
};

export default AdminMain;
