import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { logout, deleteProfile } = useAuthStore()
  const navigate = useNavigate()

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-md mx-auto">
        
        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl dark:shadow-2xl p-8 border border-gray-200 dark:border-gray-800">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              👤 My Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account settings
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button 
              onClick={handleLogout}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
            >
              🚪 Logout
            </button>

            <button 
              onClick={handleDeleteProfile}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
            >
              🗑️ Delete Account
            </button>
          </div>

          {/* Warning */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
            ⚠️ Deleting your account is permanent and cannot be recovered.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
