import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminSidebar from '../components/DashboardSidebar/AdminSidebar'
import AdminMain from '../components/PrivateDashboardComponents/AdminMain'
import AllUser from '../components/PrivateDashboardComponents/AllUser'
import AddQuestion from '../components/PrivateDashboardComponents/AddQuestion'
import AdminProfile from '../components/PrivateDashboardComponents/AdminProfile'
import CourseSubject from '../components/PrivateDashboardComponents/CourseSubject'

const AdminDashboard = () => {
  return (
    <div className="flex h-full bg-white overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto">
        <Routes>
          <Route path="/" element={<AdminMain />} />
          <Route path="/all-users" element={<AllUser />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/cource-subject" element={<CourseSubject />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default AdminDashboard

