import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { LayoutDashboard, User, LogOut } from 'lucide-react'

const UserSidebar = () => {
  const location = useLocation()
  const { logout } = useAuthStore()

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/user' },
    { label: 'Profile', icon: User, path: '/user/profile' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="w-16 md:w-64 h-full overflow-hidden bg-slate-900 border-r border-slate-800 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="h-16 flex items-center justify-center md:justify-start px-2 md:px-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white">LH</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2 md:p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-center md:justify-start gap-0 md:gap-3 px-0 md:px-4 py-3 rounded-lg transition-all duration-200 group ${
                  active
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon
                  size={20}
                  className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
                />
                <span className="hidden md:inline font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-2 md:p-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="flex items-center justify-center md:justify-start gap-0 md:gap-3 w-full px-0 md:px-4 py-3 text-slate-400 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default UserSidebar

