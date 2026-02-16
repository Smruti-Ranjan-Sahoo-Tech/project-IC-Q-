import React, { useState, useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { useCourseStore } from "../../store/useCourseStore";
import { Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const AddQuestion = () => {
  const {
    createPost,
    getAllPosts,
    posts,
    updatePost,
    deletePost
  } = useAdminStore();

  const {
    subjects,
    fetchSubjectsForCourse,
    loading: loadingSubjects
  } = useCourseStore();

  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    questionType: "Interview",
    subject: ""
  });

  /* ================= PAGINATION ================= */

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    fetchSubjectsForCourse();
    getAllPosts();
  }, []);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /* ================= HANDLE SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.question.trim() ||
      !formData.answer.trim() ||
      !formData.subject
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        await updatePost(editingId, formData);
        setEditingId(null);
      } else {
        await createPost(formData);
      }

      setFormData({
        question: "",
        answer: "",
        questionType: "Interview",
        subject: ""
      });

      getAllPosts();
    } catch (error) {
      console.error(error);
      alert("Failed to save question");
    } finally {
      setLoading(false);
    }
  };

  /* ================= HANDLE EDIT ================= */

  const handleEdit = (post) => {
    setFormData({
      question: post.question,
      answer: post.answer,
      questionType: post.questionType,
      subject: post.subject
    });

    fetchSubjectsForCourse();

    setEditingId(post._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  /* ================= HANDLE DELETE ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;

    await deletePost(id);
    getAllPosts();
  };

  /* ================= CANCEL EDIT ================= */

  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      question: "",
      answer: "",
      questionType: "Interview",
      subject: ""
    });
  };

  /* ================= PAGINATION ================= */

  const filteredPosts = posts || [];
  const totalPosts = filteredPosts.length;

  const totalPages =
    postsPerPage === "all"
      ? 1
      : Math.ceil(totalPosts / postsPerPage);

  const startIndex =
    postsPerPage === "all"
      ? 0
      : (currentPage - 1) * postsPerPage;

  const endIndex =
    postsPerPage === "all"
      ? totalPosts
      : startIndex + parseInt(postsPerPage);

  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="flex-1 h-full overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          {editingId ? "Edit Question" : "Add Question"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* FORM */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* QUESTION */}
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Enter question..."
              rows={4}
              className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
            />

            {/* ANSWER */}
            <textarea
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="Enter answer..."
              rows={4}
              className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
            />

            {/* TYPE SUBJECT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* TYPE */}
              <select
                name="questionType"
                value={formData.questionType}
                onChange={handleChange}
                className="p-3 border rounded-lg dark:bg-slate-700"
              >
                <option value="Interview">Interview</option>
                <option value="Coding">Coding</option>
                <option value="Subjective">Subjective</option>
              </select>

              {/* SUBJECT */}
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={loadingSubjects}
                className="p-3 border rounded-lg dark:bg-slate-700"
              >
                <option value="">
                  {loadingSubjects ? "Loading..." : "Select Subject"}
                </option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Question"
                  : "Add Question"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-6 rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* POSTS LIST */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            All Questions
          </h2>

          {paginatedPosts.map((post) => (
            <div
              key={post._id}
              className="bg-slate-50 dark:bg-slate-900 p-5 rounded-lg mb-4 shadow"
            >
              <div className="flex justify-between gap-3">
                <div>
                  <h3 className="font-bold text-lg dark:text-white">
                    {post.question}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {post.cource} - {post.subject}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 bg-blue-500 text-white rounded"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(post._id)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
