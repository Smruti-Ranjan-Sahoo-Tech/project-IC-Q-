import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('')
  const resetPassword = useAuthStore(state => state.resetPassword)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/forgotpassword')
    }
  }, [token, navigate])

  const submit = async (e) => {
    e.preventDefault()
    await resetPassword(token, password, navigate)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-200 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 flex items-center justify-center p-4 transition-colors duration-300 overflow-hidden">
      
      {/* Animated Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-1"></div>

      {/* Auth Card */}
      <div className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-2xl p-8 md:p-12 w-full max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Enter your new password below.
        </p>

        <form onSubmit={submit} className="space-y-5">
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="New password" 
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300"
          />
          <button 
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
          >
            Set New Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
