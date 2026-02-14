import React, { useState, useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";

const UserMain = () => {
  const { posts, loading, pagination, getPostData } = useUserStore();
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const courses = ["MERN", "PYTHON", "JAVA", "TESTING"];
  const questionTypes = ["Interview", "Coding", "Subjective"];

  // Fetch subjects when course changes
  useEffect(() => {
    if (course) {
      fetchSubjects();
    } else {
      setSubjects([]);
      setSubject("");
    }
  }, [course]);

  const fetchSubjects = async () => {
    setLoadingSubjects(true);
    try {
      const response = await fetch("http://localhost:5000/admin/getCourseSubjects", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      setSubjects(data.subjects || []);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
      setSubjects([]);
    } finally {
      setLoadingSubjects(false);
    }
  };

  const handleFetch = async () => {
    if (!course) return;
    await getPostData(course, questionType, 1, 10, subject);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    getPostData(course, questionType, page, 10, subject);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Learning Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Browse and manage learning questions
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-end">
          {/* Course */}
          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              📚 Course
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              🎯 Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={!course || loadingSubjects}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="">
                {loadingSubjects ? "Loading..." : "All Subjects"}
              </option>
              {subjects.map((subj) => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>

          {/* Question Type */}
          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              ❓ Question Type
            </label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {questionTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Fetch Button */}
          <button
            onClick={handleFetch}
            disabled={!course}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold rounded-lg transition-all"
          >
            🔍 Search
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Questions ({posts?.length || 0})
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">
            <p>Loading questions...</p>
          </div>
        ) : posts && posts.length > 0 ? (
          <>
            <div className="p-6 space-y-4">
              {posts.map((post, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">
                        {post.question}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                        <strong>Answer:</strong> {post.answer}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          post.questionType === 'Interview'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : post.questionType === 'Coding'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                            : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200'
                        }`}>
                          {post.questionType}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200">
                          {post.subject}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
                          {post.cource}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg disabled:opacity-50"
              >
                ← Previous
              </button>
              <span className="px-4 py-2 text-slate-900 dark:text-white">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </>
        ) : course ? (
          <div className="p-8 text-center text-slate-500">
            <p>No questions found for {course} - {questionType}</p>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500">
            <p>Select a course and question type to view questions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMain;