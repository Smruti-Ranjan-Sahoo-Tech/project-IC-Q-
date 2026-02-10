import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import Rudra from '../components/Rudra'

const Home = () => {
  const { isLoggedIn, role } = useAuthStore()

  return (
    <div className="w-full">
      {/* Hero Section with Animated Background */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 animate-gradient-shift bg-400%"></div>
        
        {/* Animated Blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-1"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-2"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to Learning Hub
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-2xl mx-auto">
            Master programming with curated questions from industry experts
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {isLoggedIn ? (
              <Link 
                to={role === 'admin' ? '/admin' : '/user'} 
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 active:translate-y-0"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 active:translate-y-0"
                >
                  Get Started
                </Link>
                <Link 
                  to="/login" 
                  className="px-8 py-4 bg-transparent text-white border-2 border-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <h3 className="text-4xl md:text-5xl font-bold mb-2">1000+</h3>
              <p className="text-lg opacity-90">Questions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <h3 className="text-4xl md:text-5xl font-bold mb-2">500+</h3>
              <p className="text-lg opacity-90">Users</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <h3 className="text-4xl md:text-5xl font-bold mb-2">10+</h3>
              <p className="text-lg opacity-90">Courses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Why Choose Learning Hub?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { icon: '📚', title: 'Comprehensive Content', desc: 'Access thousands of carefully curated questions covering all major programming topics.' },
            { icon: '🎯', title: 'Targeted Learning', desc: 'Filter questions by course and difficulty level to focus on what you need.' },
            { icon: '💡', title: 'Expert Solutions', desc: 'Every question includes detailed answers written by experienced developers.' },
            { icon: '🚀', title: 'Progress Tracking', desc: 'Monitor your learning journey and track progress across different courses.' },
            { icon: '👥', title: 'Community Support', desc: 'Join thousands of learners and grow together through shared knowledge.' },
            { icon: '⚡', title: 'Fast & Reliable', desc: 'Lightning-fast platform built for optimal performance and seamless experience.' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Section with Gradient Background */}
      <section className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Popular Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {['Express.js', 'React', 'Node.js', 'MongoDB', 'JavaScript', 'Web Development'].map(course => (
              <div 
                key={course} 
                className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-8 rounded-xl border border-white/20 hover:border-blue-400 hover:bg-white/15 transition-all duration-300 text-center text-white"
              >
                <div className="text-5xl mb-4">📖</div>
                <h3 className="text-2xl font-semibold mb-2">{course}</h3>
                <p className="text-white/80 mb-6">Master the fundamentals and advanced concepts</p>
                {isLoggedIn ? (
                  <Link 
                    to="/user" 
                    className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
                  >
                    Learn Now
                  </Link>
                ) : (
                  <Link 
                    to="/register" 
                    className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
                  >
                    Explore
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Animated Background */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-shift bg-400%"></div>
        
        <div className="absolute top-0 right-20 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-1"></div>

        <div className="relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Accelerate Your Learning?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-2xl mx-auto">
            Join thousands of developers already learning on Learning Hub
          </p>
          {!isLoggedIn && (
            <Link 
              to="/register" 
              className="inline-block px-10 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
            >
              Start Learning Today
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
