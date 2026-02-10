import { useState, useEffect } from 'react'
import { useAdminStore } from '../store/useAdminStore'

const AdminDashboard = () => {
  const { posts, loading, getAllPosts, createPost, updatePost, deletePost } = useAdminStore()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    questionType: 'Subjective',
    cource: ''
  })

  useEffect(() => {
    getAllPosts()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await updatePost(editingId, formData)
      setEditingId(null)
    } else {
      await createPost(formData)
    }
    setFormData({ question: '', answer: '', questionType: 'Subjective', cource: '' })
    setShowForm(false)
  }

  const handleEdit = (post) => {
    setFormData({
      question: post.question,
      answer: post.answer,
      questionType: post.questionType,
      cource: post.cource
    })
    setEditingId(post._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deletePost(id)
    }
  }

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 transition-colors duration-300">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob-delay-1"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
          Admin Dashboard
        </h1>

        {/* Create/Cancel Button */}
        <button 
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ question: '', answer: '', questionType: 'Subjective', cource: '' })
          }}
          className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
        >
          {showForm ? '✕ Cancel' : '+ Create Post'}
        </button>

        {/* Create/Edit Form */}
        {showForm && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl dark:shadow-2xl p-8 mb-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {editingId ? 'Edit Post' : 'Create New Post'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Question</label>
                <input
                  type="text"
                  name="question"
                  placeholder="Enter the question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Answer</label>
                <textarea
                  name="answer"
                  placeholder="Enter the answer"
                  value={formData.answer}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Question Type</label>
                  <select
                    name="questionType"
                    value={formData.questionType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300"
                  >
                    <option value="Subjective">Subjective</option>
                    <option value="Coding">Coding</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Course</label>
                  <input
                    type="text"
                    name="cource"
                    placeholder="Enter course name"
                    value={formData.cource}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '⏳ Processing...' : editingId ? '✏️ Update Post' : '➕ Create Post'}
              </button>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            All Posts <span className="text-blue-600 dark:text-blue-400">({posts.length})</span>
          </h2>

          {loading && !showForm && (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">⏳ Loading posts...</p>
            </div>
          )}

          {posts.length === 0 && !loading && (
            <div className="flex items-center justify-center py-12 bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No posts yet. Create one to get started!</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {posts.map(post => (
              <div 
                key={post._id} 
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex-1">
                    {post.question}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                    post.questionType === 'Coding' 
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  }`}>
                    {post.questionType}
                  </span>
                </div>

                {/* Course */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  📚 <span className="font-semibold">{post.cource}</span>
                </p>

                {/* Answer Preview */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                    {post.answer}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleEdit(post)}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(post._id)}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
