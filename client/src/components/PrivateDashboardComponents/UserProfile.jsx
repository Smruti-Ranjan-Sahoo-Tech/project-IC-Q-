import React, { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { toast } from 'react-toastify'

const UserProfile = () => {
  const { user, role } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    cource: user?.cource || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement profile update API call
    toast('Profile update functionality to be implemented')
    setIsEditing(false)
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          My Profile
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          View and manage your profile information
        </p>
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-teal-100 dark:border-slate-800">
            
            {/* Header Banner */}
            <div className="h-32 bg-gradient-to-r from-teal-600 to-amber-500"></div>

            {/* Profile Content */}
            <div className="px-6 py-8">
              
              {/* Avatar & Name */}
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-amber-500 flex items-center justify-center text-white text-3xl font-bold -mt-16 border-4 border-white dark:border-slate-800 shadow-lg">
                  {user?.username?.charAt(0)?.toUpperCase()}
                </div>
                <div className="ml-6 flex-1">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{user?.username || 'N/A'}</h2>
                  <p className="text-slate-600 dark:text-slate-400 capitalize font-semibold">📚 {role}</p>
                </div>
              </div>

              {/* Form */}
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      👤 Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      📧 Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-600 text-slate-900 dark:text-white rounded-lg opacity-50 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Email cannot be changed</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      📱 Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                  </div>

                  {/* Course */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      📚 Course
                    </label>
                    <input
                      type="text"
                      name="cource"
                      value={formData.cource}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all"
                    >
                      ✓ Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-6 py-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 text-slate-900 dark:text-white font-semibold rounded-lg transition-all"
                    >
                      ✕ Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {/* Profile Details */}
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-xs text-slate-600 dark:text-slate-400">Email</p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{user?.email || 'N/A'}</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-xs text-slate-600 dark:text-slate-400">Phone</p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{user?.phone || 'N/A'}</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-xs text-slate-600 dark:text-slate-400">Course</p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{user?.cource || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full mt-6 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all"
                  >
                    ✏️ Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-4">
          {/* Account Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔐 Security</h3>
            <button className="w-full mb-3 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold rounded-lg transition-all">
              Change Password
            </button>
            <button className="w-full px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg transition-all">
              View Activity
            </button>
          </div>

          {/* Session Info */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-900 dark:text-green-200 mb-3">ℹ️ Account Info</h3>
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>Role:</strong> Learner
            </p>
            <p className="text-sm text-green-800 dark:text-green-300 mt-2">
              <strong>Member Since:</strong> {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
