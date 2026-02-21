import React, { useState, useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useCourseStore } from "../../store/useCourseStore";

const getSubjectName = (subject) => {
  if (typeof subject === "string") return subject;
  return subject?.name || "";
};

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
  const { companies, companiesLoading, locations, locationsLoading, fetchCompanies, fetchCompanyLocations } = useCourseStore();

  const [subject, setSubject] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [companyType, setCompanyType] = useState("all");
  const [company, setCompany] = useState("all");
  const [location, setLocation] = useState("all");
  const [openQuestionId, setOpenQuestionId] = useState(null);

  const questionTypes = ["Interview", "Coding", "Subjective"];

  useEffect(() => {
    getSubjectsByCourse();
    clearPosts();
    setSubject("");
  }, [getSubjectsByCourse, clearPosts]);

  useEffect(() => {
    fetchCompanies(companyType === "all" ? "" : companyType);
    setCompany("all");
    setLocation("all");
  }, [companyType, fetchCompanies]);

  useEffect(() => {
    fetchCompanyLocations(company, companyType);
    setLocation("all");
  }, [company, companyType, fetchCompanyLocations]);

  const handleFetch = async () => {
    await getPostData({
      subject: subject || "all",
      questionType: questionType || "all",
      companyType,
      company,
      location,
      page: 1,
      limit: 10
    });
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    getPostData({
      subject: subject || "all",
      questionType: questionType || "all",
      companyType,
      company,
      location,
      page,
      limit: 10
    });
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-6">
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
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={subjectLoading}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:opacity-50"
            >
              <option value="">
                {subjectLoading ? "Loading..." : "All Subjects"}
              </option>
              {subjects.map((subj, index) => {
                const subjectName = getSubjectName(subj);
                if (!subjectName) return null;
                return (
                  <option key={`${subjectName}-${index}`} value={subjectName}>
                    {subjectName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Question Type
            </label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="">All Types</option>
              {questionTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Company Type
            </label>
            <select
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="all">All Company Types</option>
              <option value="MNC">MNC</option>
              <option value="Startup">Startup</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Company
            </label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="all">{companiesLoading ? "Loading..." : "All Companies"}</option>
              {companies.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={company === "all" || locationsLoading}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:opacity-50"
            >
              <option value="all">{locationsLoading ? "Loading..." : "All Locations"}</option>
              {locations.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleFetch}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all"
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
                            <span className="ml-2 inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                              {post?.writtenBy?.role || "admin"}
                            </span>
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              post.questionType === "Interview"
                                ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-200"
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
                        <span className="text-sm font-semibold text-teal-600 dark:text-teal-300 whitespace-nowrap">
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
        ) : (
          <div className="p-8 text-center text-slate-500">
            <p>No questions found for selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMain;
