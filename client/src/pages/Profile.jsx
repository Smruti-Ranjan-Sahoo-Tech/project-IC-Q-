import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { LogOut, Trash2, Edit2 } from 'lucide-react'

const Profile = () => {
  const { user, logout, deleteProfile, isInitializing, checkAuthStatus } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    // Check auth status on mount to load user data
    checkAuthStatus()
  }, [checkAuthStatus])

  useEffect(() => {
    if (!isInitializing && !user) {
      navigate('/login')
    }
  }, [user, isInitializing, navigate])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you absolutely sure? This action cannot be undone.')) {
      await deleteProfile()
      navigate('/')
    }
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            👤 My Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            View and manage your account settings
          </p>
        </div>

        {user && (
          <>
            {/* Profile Information Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-6 border border-slate-200 dark:border-slate-700">
              <div className="space-y-6">
                
                {/* Username */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    Username
                  </label>
                  <p className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                    {user.username}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    Email
                  </label>
                  <p className="text-lg text-slate-900 dark:text-white mt-2">
                    {user.email}
                  </p>
                </div>

                {/* Role */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    Role
                  </label>
                  <span className="inline-block mt-2 px-4 py-1.5 text-sm font-bold rounded-full bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-600 dark:to-blue-700 text-blue-700 dark:text-blue-100 uppercase">
                    {user.role}
                  </span>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    Phone
                  </label>
                  <p className="text-lg text-slate-900 dark:text-white mt-2">
                    {user.phone || 'Not provided'}
                  </p>
                </div>

                {/* Course */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    Course
                  </label>
                  <p className="text-lg text-slate-900 dark:text-white mt-2">
                    {user.cource || 'Not specified'}
                  </p>
                </div>

                {/* Passout Year */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    Passout Year
                  </label>
                  <p className="text-lg text-slate-900 dark:text-white mt-2">
                    {user.passoutYear ? new Date(user.passoutYear).getFullYear() : 'Not specified'}
                  </p>
                </div>

                {/* Account Status */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    Account Status
                  </label>
                  <span className={`inline-block mt-2 px-4 py-1.5 text-sm font-bold rounded-full uppercase ${
                    user.isBlocked
                      ? 'bg-red-200 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      : 'bg-green-200 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  }`}>
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </div>
              </div>
            </div>

            {/* Change Password Form */}
            {/* {showPasswordForm && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Lock size={24} />
                  Change Password
                </h3>
                
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.oldPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                      placeholder="Enter your current password"
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold rounded-lg transition-all"
                    >
                      {loading ? '⏳ Updating...' : '✓ Update Password'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPasswordForm(false)}
                      className="flex-1 px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )} */}

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Edit Profile Button */}
              <button
                onClick={() => navigate('/update-profile')}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <Edit2 size={20} />
                Edit Profile
              </button>

              {/* Change Password Button - Commented */}
              {/* <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <Lock size={20} />
                {showPasswordForm ? 'Cancel' : 'Change Password'}
              </button> */}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <LogOut size={20} />
                Logout
              </button>

              {/* Delete Account Button */}
              <button
                onClick={handleDeleteProfile}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <Trash2 size={20} />
                Delete Account
              </button>
            </div>

            {/* Warning */}
            <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-sm text-red-700 dark:text-red-300">
                ⚠️ <strong>Warning:</strong> Deleting your account is permanent and cannot be recovered. All your data will be permanently deleted.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
