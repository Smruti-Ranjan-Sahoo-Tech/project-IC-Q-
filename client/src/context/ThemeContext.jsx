import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  // Force light theme across the app.
  // Keep a stable API shape so components using the hook don't break.
  const [isDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    // Ensure any leftover dark class is removed
    root.classList.remove('dark')
    try {
      localStorage.setItem('theme', 'light')
    } catch (e) {
      // ignore localStorage errors in non-browser environments
    }
  }, [])

  // No-op toggle to preserve consumers calling it
  const toggleTheme = () => {}

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
