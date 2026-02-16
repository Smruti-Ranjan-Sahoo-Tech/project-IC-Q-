import { Routes, Route, Navigate } from 'react-router-dom'
import UserSidebar from '../components/DashboardSidebar/UserSidebar'
import UserMain from '../components/PrivateDashboardComponents/UserMain'
import UserProfile from '../components/PrivateDashboardComponents/UserProfile'
import MyQuestions from '../components/PrivateDashboardComponents/MyQuestions'

const UserDashboard = () => {
  return (
    <div className="flex h-full bg-white overflow-hidden">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto">
        <Routes>
          <Route path="/" element={<UserMain />} />
          <Route path="/my-questions" element={<MyQuestions />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/user" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default UserDashboard

