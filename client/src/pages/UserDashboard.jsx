import { useState, useEffect } from 'react'
import { useUserStore } from '../store/useUserStore'

const UserDashboard = () => {
  const { posts, loading, pagination, getPostData } = useUserStore()
  const [cource, setCourse] = useState('')
  const [questionType, setQuestionType] = useState('Subjective')
  const [selectedPost, setSelectedPost] = useState(null)
  const [courses, setCourses] = useState(['MERN', 'PYTHON', 'JAVA', 'TESTING'])

  const handleFetch = async () => {
    if (cource.trim()) {
      await getPostData(cource, questionType, 1, 10)
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      getPostData(cource, questionType, newPage, 10)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
          🎓 Learning Dashboard
        </h1>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-2xl p-6 md:p-8 mb-8 border border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Course Select */}
            <div>
              <label htmlFor="course" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                📚 Select Course
              </label>
              <select
                id="course"
                value={cource}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300"
              >
                <option value="">-- Choose a Course --</option>
                {courses.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Question Type Select */}
            <div>
              <label htmlFor="type" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                ❓ Question Type
              </label>
              <select
                id="type"
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300"
              >
                <option value="Subjective">Subjective</option>
                <option value="Coding">Coding</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button 
                onClick={handleFetch}
                disabled={!cource || loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '⏳ Loading...' : '🔍 Search'}
              </button>
            </div>
          </div>
        </div>

        {/* Posts Container */}
        <div className="space-y-4">
          
          {loading && (
            <div className="flex items-center justify-center py-12 bg-white dark:bg-gray-900 rounded-xl">
              <p className="text-gray-600 dark:text-gray-400 text-lg">⏳ Loading posts...</p>
            </div>
          )}

          {!loading && posts.length === 0 && cource && (
            <div className="flex items-center justify-center py-12 bg-white dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No {questionType} questions found for {cource}
              </p>
            </div>
          )}

          {!loading && cource === '' && (
            <div className="flex items-center justify-center py-12 bg-white dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Select a course to view questions
              </p>
            </div>
          )}

          {posts.map(post => (
            <div key={post._id}>
              {/* Post Card */}
              <div
                onClick={() => setSelectedPost(selectedPost?._id === post._id ? null : post)}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
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

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  👤 <span className="font-semibold">{post.writtenBy?.username || 'Admin'}</span> | 📚 <span className="font-semibold">{post.cource}</span>
                </p>

                {/* Expanded Answer */}
                {selectedPost?._id === post._id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Answer:</h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {post.answer}
                    </p>
                  </div>
                )}

                {/* Expand Hint */}
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  {selectedPost?._id === post._id ? '▲ Click to collapse' : '▼ Click to expand answer'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {posts.length > 0 && (
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1 || loading}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <span className="px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-800">
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
            </span>

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages || loading}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        )}

        {/* Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl dark:shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto p-8 relative border border-gray-200 dark:border-gray-800">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                ✕
              </button>

              {/* Modal Content */}
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedPost.question}
              </h2>
              
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedPost.questionType === 'Coding' 
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                }`}>
                  {selectedPost.questionType}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-2">
                📚 Course: <span className="font-semibold">{selectedPost.cource}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                👤 By: <span className="font-semibold">{selectedPost.writtenBy?.username || 'Admin'}</span>
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Answer:</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedPost.answer}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard
