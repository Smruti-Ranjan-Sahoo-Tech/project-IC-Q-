import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'

const Navbar = ({ mobileMenuOpen, toggleMenu }) => {
  const { isLoggedIn, role, user } = useAuthStore()

  const getInitial = () => {
    return user?.username ? user.username.charAt(0).toUpperCase() : '?'
  }

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 gap-4">
        
        {/* Left Section */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extrabold text-slate-800 hover:text-blue-700 transition-colors duration-300 whitespace-nowrap"
          >
            LH
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 font-medium hover:text-blue-700 transition-colors duration-300 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/services" className="text-gray-700 font-medium hover:text-blue-700 transition-colors duration-300 relative group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="text-gray-700 font-medium hover:text-blue-700 transition-colors duration-300 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="text-gray-700 font-medium hover:text-blue-700 transition-colors duration-300 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme toggle removed (app uses light theme) */}

          {isLoggedIn ? (
            <>
              <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 uppercase tracking-wider border border-emerald-200">
                {role?.toUpperCase()}
              </span>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-lg shadow-sm transition-all duration-300 cursor-pointer">
                {getInitial()}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-slate-700 font-semibold rounded-lg border border-slate-300 hover:border-blue-700 hover:text-blue-700 transition-colors duration-300">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-300">
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

