import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { useTheme } from '../../context/ThemeContext'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'

const Navbar = ({ mobileMenuOpen, toggleMenu }) => {
  const { isLoggedIn, role, logout } = useAuthStore()
  const { isDark, toggleTheme } = useTheme()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 gap-4">
        
        {/* Left Section */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 whitespace-nowrap"
          >
            LH
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/services" className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          {/* <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:rotate-20"
          >
            {isDark ? '☀️' : '🌙'}
          </button> */}

          {isLoggedIn ? (
            <>
              <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-emerald-200 to-emerald-300 dark:from-emerald-600 dark:to-emerald-700 text-emerald-700 dark:text-emerald-100 uppercase tracking-wider shadow-md dark:shadow-lg transition-all duration-300">
                {role?.toUpperCase()}
              </span>
              <Link to="/profile" className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <HamburgerMenu
          isOpen={mobileMenuOpen}
          toggleMenu={toggleMenu}
        />
      </div>
    </nav>
  )
}

export default Navbar
