import React, { useState, useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";

const UserMain = () => {
  const {
    posts,
    subjects,
    loading,
    subjectLoading,
    pagination,
    getPostData,
    getSubjectsByCourse,
    clearPosts
  } = useUserStore();

  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [openQuestionId, setOpenQuestionId] = useState(null);

  const courses = ["MERN", "PYTHON", "JAVA", "TESTING"];
  const questionTypes = ["Interview", "Coding", "Subjective"];

  useEffect(() => {
    if (course) {
      getSubjectsByCourse(course);
      setSubject("");
    } else {
      setSubject("");
      clearPosts();
    }
  }, [course]);

  const handleFetch = async () => {
    if (!course) return;
    await getPostData(course, subject, questionType, 1, 10);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages || !course) return;
    getPostData(course, subject, questionType, page, 10);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Learning Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Browse and manage learning questions
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Course
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

          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={!course || subjectLoading}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="">
                {subjectLoading ? "Loading..." : "All Subjects"}
              </option>
              {subjects.map((subj) => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Question Type
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

          <button
            onClick={handleFetch}
            disabled={!course}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold rounded-lg transition-all"
          >
            Search
          </button>
        </div>
      </div>

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
              {posts.map((post) => {
                const isOpen = openQuestionId === post._id;
                return (
                  <div
                    key={post._id}
                    className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenQuestionId(isOpen ? null : post._id)}
                      className="w-full text-left p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                            {post.question}
                          </h3>
                          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Added by: <span className="font-medium text-slate-700 dark:text-slate-300">{post?.writtenBy?.username || "Admin"}</span>
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              post.questionType === "Interview"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                                : post.questionType === "Coding"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                                : "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
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
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-300 whitespace-nowrap">
                          {isOpen ? "Hide Answer" : "View Answer"}
                        </span>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 border-t border-slate-200 dark:border-slate-700">
                        <p className="pt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                          {post.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-slate-900 dark:text-white">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : course ? (
          <div className="p-8 text-center text-slate-500">
            <p>No questions found for selected filters.</p>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500">
            <p>Select a course and filters to view questions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMain;
