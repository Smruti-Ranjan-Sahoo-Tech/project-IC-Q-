const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
      <div className="flex flex-col items-center gap-8 text-center">
        
        {/* Logo */}
        <div className="flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-white shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
          <span className="bg-gradient-to-br from-blue-500 to-blue-600 bg-clip-text text-4xl font-bold text-transparent">
            LH
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white">
          Learning Hub
        </h2>

        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />

        {/* Subtitle */}
        <p className="text-base text-white/90">
          Verifying your session...
        </p>
      </div>
    </div>
  )
}

export default LoadingScreen
