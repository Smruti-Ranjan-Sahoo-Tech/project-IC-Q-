import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

const UserSidebar = () => {
  const location = useLocation()
  const { logout } = useAuthStore()

  const menuItems = [
    { label: 'Dashboard', icon: '📚', path: '/user' },
    // { label: 'My Questions', icon: '📝', path: '/user/my-questions' },
    { label: 'Profile', icon: '👤', path: '/user/profile' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen sticky top-0 shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          LH
        </h1>
        <p className="text-xs text-slate-400 mt-1">Learning Dashboard</p>
      </div>

      {/* Navigation Menu */}
      <nav className="py-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 transition-all border-l-4 ${
              isActive(item.path)
                ? 'bg-gradient-to-r from-green-600 to-blue-600 border-green-400 text-white'
                : 'border-transparent hover:bg-slate-700 text-slate-300'
            }`}
          >
            <span className="text-xl mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-slate-700"></div>

      {/* Logout Button */}
      <div className="p-6">
        <button
          onClick={logout}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  )
}

export default UserSidebar
