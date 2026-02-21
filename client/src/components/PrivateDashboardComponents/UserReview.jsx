import React, { useEffect, useMemo, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useCourseStore } from "../../store/useCourseStore";
import { toast } from "react-toastify";

const getSubjectName = (subject) => {
  if (typeof subject === "string") return subject;
  return subject?.name || "";
};

const isApprovedSubject = (subject) => {
  if (typeof subject === "string") return true;
  return subject?.status === "approve";
};

const initialState = {
  question: "",
  answer: "",
  questionType: "Interview",
  subject: "",
  companyType: "Other",
  company: "",
  location: ""
};

const UserReview = () => {
  const { addReview, getReview, pendingReviews, approvedReviews, reviewLoading, reviewHistoryLoading } = useUserStore();
  const { subjects, companies, fetchSubjectsForCourse, fetchCompanies, companiesLoading } = useCourseStore();

  const [formData, setFormData] = useState(initialState);
  const [newCompany, setNewCompany] = useState("");

  const selectableSubjects = useMemo(
    () =>
      subjects
        .filter((item) => isApprovedSubject(item))
        .map((item) => getSubjectName(item))
        .filter(Boolean),
    [subjects]
  );

  useEffect(() => {
    fetchSubjectsForCourse();
    fetchCompanies();
    getReview();
  }, [fetchSubjectsForCourse, fetchCompanies, getReview]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "companyType") {
      setFormData((prev) => ({ ...prev, companyType: value, company: "" }));
      fetchCompanies(value);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyValue = formData.company === "__new__" ? newCompany.trim() : formData.company.trim();
    if (!companyValue) {
      toast.error("Please select or add company");
      return;
    }

    const created = await addReview({
      ...formData,
      company: companyValue
    });

    if (created) {
      setFormData(initialState);
      setNewCompany("");
      fetchCompanies();
      getReview();
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Submit Company Review</h1>
          <p className="text-slate-600 dark:text-slate-400">Share interview questions asked in your visited company. SuperAdmin will verify before publishing.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 space-y-4">
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Question asked in interview"
            required
            rows={3}
            className="w-full p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
          />
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            placeholder="Your answer or explanation"
            required
            rows={4}
            className="w-full p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
          />

          <div className="grid md:grid-cols-3 gap-3">
            <select name="questionType" value={formData.questionType} onChange={handleChange} className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white">
              <option value="Interview">Interview</option>
              <option value="Coding">Coding</option>
              <option value="Subjective">Subjective</option>
            </select>

            <select name="subject" value={formData.subject} onChange={handleChange} required className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white">
              <option value="">Select subject</option>
              {selectableSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              required
              className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <select name="companyType" value={formData.companyType} onChange={handleChange} className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white">
              <option value="MNC">MNC</option>
              <option value="Startup">Startup</option>
              <option value="Other">Other</option>
            </select>

            <select name="company" value={formData.company} onChange={handleChange} required className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white">
              <option value="">{companiesLoading ? "Loading companies..." : "Select company"}</option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
              <option value="__new__">+ Add new company</option>
            </select>
          </div>

          {formData.company === "__new__" && (
            <input
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              placeholder="Enter company name"
              required
              className="w-full p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            />
          )}

          <button type="submit" disabled={reviewLoading} className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg disabled:opacity-60">
            {reviewLoading ? "Submitting..." : "Submit Review"}
          </button>
        </form>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">My Review Status</h2>

          {reviewHistoryLoading ? (
            <p className="text-slate-500">Loading review history...</p>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Pending / Rejected</h3>
                {pendingReviews.length === 0 ? (
                  <p className="text-slate-500">No pending or rejected reviews</p>
                ) : (
                  <div className="space-y-2">
                    {pendingReviews.map((item) => (
                      <div key={item._id} className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 flex justify-between gap-3">
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">{item.question}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{item.company} - {item.location}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full h-fit ${item.status === "rejected" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Approved (Published)</h3>
                {approvedReviews.length === 0 ? (
                  <p className="text-slate-500">No approved reviews yet</p>
                ) : (
                  <div className="space-y-2">
                    {approvedReviews.map((item) => (
                      <div key={item._id} className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex justify-between gap-3">
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">{item.question}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{item.company} - {item.location}</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full h-fit bg-emerald-100 text-emerald-700">approved</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserReview;
