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
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <Routes>
        <Route path="/" element={<AdminMain />} />
        <Route path="/all-users" element={<AllUser />} />
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/cource-subject" element={<CourseSubject />} />
        <Route path="/profile" element={<AdminProfile />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </div>
  )
}

export default AdminDashboard



  // Open create modal
  const handleCreate = () => {

    setEditingId(null);

    setFormData({
      question: "",
      answer: "",
      questionType: "Interview",
      cource: "",
    });

    setShowModal(true);

  };



  // Open edit modal

