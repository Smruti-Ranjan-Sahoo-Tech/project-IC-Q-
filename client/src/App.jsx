import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Router from './Routes/Router'
import { useAuthStore } from './store/useAuthStore'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import Navbar from './components/NavBar/Navbar'
import Sidebar from './components/sidebar/Sidebar'

const App = () => {
  const { isInitializing, checkAuthStatus } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  if (isInitializing) {
    return <LoadingScreen />
  }

  return (
    <>
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        toggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      <Sidebar
        isOpen={mobileMenuOpen}
        toggleSidebar={() => setMobileMenuOpen(false)}
      />
      <main className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 pb-12 animate-fadeIn">
        <Router />
      </main>
      <ToastContainer />
    </>
  )
}

export default App
