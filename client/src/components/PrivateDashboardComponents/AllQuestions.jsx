import React, { useEffect, useMemo, useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { useCourseStore } from "../../store/useCourseStore";
import {
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  ListChecks
} from "lucide-react";
import { toast } from "react-toastify";

const QUESTIONS_PER_PAGE = 8;

const getSubjectName = (subject) => {
  if (typeof subject === "string") return subject;
  return subject?.name || "";
};

const isApprovedSubject = (subject) => {
  if (typeof subject === "string") return true;
  return subject?.status === "approve";
};

const AllQuestions = () => {
  const { posts, loading, getAllPosts, updatePost, deletePost } = useAdminStore();
  const {
    subjects,
    companies,
    fetchSubjectsForCourse,
    fetchCompanies,
    addCompany,
    loading: loadingSubjects
  } = useCourseStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [editingPost, setEditingPost] = useState(null);
  const [editData, setEditData] = useState({
    question: "",
    answer: "",
    questionType: "Interview",
    subject: "",
    companyType: "Other",
    company: "",
    location: ""
  });
  const [editNewCompany, setEditNewCompany] = useState("");
  const selectableSubjects = subjects
    .filter((subject) => isApprovedSubject(subject))
    .map((subject) => getSubjectName(subject))
    .filter(Boolean);

  useEffect(() => {
    getAllPosts();
    fetchSubjectsForCourse();
    fetchCompanies();
  }, [getAllPosts, fetchSubjectsForCourse, fetchCompanies]);

  const totalPages = Math.max(1, Math.ceil((posts?.length || 0) / QUESTIONS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedPosts = useMemo(() => {
    if (!posts?.length) return [];

    const start = (currentPage - 1) * QUESTIONS_PER_PAGE;
    const end = start + QUESTIONS_PER_PAGE;
    return posts.slice(start, end);
  }, [posts, currentPage]);

  const openEditModal = (post) => {
    setEditingPost(post);
    setEditData({
      question: post.question || "",
      answer: post.answer || "",
      questionType: post.questionType || "Interview",
      subject: post.subject || "",
      companyType: post.companyType || "Other",
      company: post.company || "",
      location: post.location || ""
    });
    setEditNewCompany("");
  };

  const closeEditModal = () => {
    setEditingPost(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === "companyType") {
      setEditData((prev) => ({
        ...prev,
        companyType: value,
        company: ""
      }));
      fetchCompanies(value);
      return;
    }

    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingPost) return;

    if (
      !editData.question.trim() ||
      !editData.answer.trim() ||
      !editData.subject.trim()
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    const companyValue =
      editData.company === "__new__"
        ? editNewCompany.trim()
        : editData.company.trim();

    if (!companyValue) {
      toast.error("Please select or add a company.");
      return;
    }

    if (!editData.location.trim()) {
      toast.error("Please enter location.");
      return;
    }

    if (editData.company === "__new__") {
      await addCompany(companyValue);
    }

    const updated = await updatePost(editingPost._id, {
      question: editData.question.trim(),
      answer: editData.answer.trim(),
      questionType: editData.questionType,
      subject: editData.subject,
      companyType: editData.companyType,
      company: companyValue,
      location: editData.location.trim()
    });

    if (updated) {
      closeEditModal();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    await deletePost(id);
  };

  return (
    <div className="min-h-full p-4 sm:p-6 md:p-10 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300">
            <ListChecks size={22} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              All Questions
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Manage all questions with edit and delete controls.
            </p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-teal-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] md:min-w-[900px]">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Question</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Type</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Subject</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Company</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Location</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Course</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-2">
                        <LoaderCircle className="animate-spin" size={18} />
                        Loading questions...
                      </span>
                    </td>
                  </tr>
                ) : paginatedPosts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-slate-500 dark:text-slate-400">
                      No questions found.
                    </td>
                  </tr>
                ) : (
                  paginatedPosts.map((post) => (
                    <tr key={post._id} className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60">
                      <td className="p-4 align-top">
                        <p className="text-slate-900 dark:text-slate-100 font-medium line-clamp-2">
                          {post.question}
                        </p>
                      </td>
                      <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{post.questionType}</td>
                      <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{post.subject}</td>
                      <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{post.company || "N/A"}</td>
                      <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{post.location || "N/A"}</td>
                      <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{post.cource}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(post)}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const page = idx + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      page === currentPage
                        ? "bg-teal-600 text-white"
                        : "border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {editingPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Question</h2>
              <button
                onClick={closeEditModal}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-5 space-y-4">
              <textarea
                name="question"
                value={editData.question}
                onChange={handleEditChange}
                rows={3}
                className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
              <textarea
                name="answer"
                value={editData.answer}
                onChange={handleEditChange}
                rows={6}
                className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  name="questionType"
                  value={editData.questionType}
                  onChange={handleEditChange}
                  className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="Interview">Interview</option>
                  <option value="Coding">Coding</option>
                  <option value="Subjective">Subjective</option>
                </select>
                <select
                  name="subject"
                  value={editData.subject}
                  onChange={handleEditChange}
                  disabled={loadingSubjects}
                  className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="">{loadingSubjects ? "Loading..." : "Select subject"}</option>
                  {selectableSubjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  name="companyType"
                  value={editData.companyType}
                  onChange={handleEditChange}
                  className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="MNC">MNC</option>
                  <option value="Startup">Startup</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  name="company"
                  value={editData.company}
                  onChange={handleEditChange}
                  className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="">Select company</option>
                  {companies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                  <option value="__new__">+ Add new company</option>
                </select>

                <input
                  name="location"
                  value={editData.location}
                  onChange={handleEditChange}
                  placeholder="Location"
                  className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              {editData.company === "__new__" && (
                <input
                  value={editNewCompany}
                  onChange={(e) => setEditNewCompany(e.target.value)}
                  placeholder="Enter new company name"
                  className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-60"
                >
                  {loading ? "Updating..." : "Update Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllQuestions;
