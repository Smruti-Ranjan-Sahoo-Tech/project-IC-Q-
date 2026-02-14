import { Routes, Route, Navigate } from 'react-router-dom'
import UserSidebar from '../components/DashboardSidebar/UserSidebar'
import UserMain from '../components/PrivateDashboardComponents/UserMain'
import UserProfile from '../components/PrivateDashboardComponents/UserProfile'
import MyQuestions from '../components/PrivateDashboardComponents/MyQuestions'

const UserDashboard = () => {
  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <UserSidebar />
      
      {/* Main Content */}
      <Routes>
        <Route path="/" element={<UserMain />} />
        <Route path="/my-questions" element={<MyQuestions />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/user" replace />} />
      </Routes>
    </div>
  )
}

export default UserDashboard
