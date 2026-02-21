import React, { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";

const UserReviewHistory = () => {
  const { getReview, pendingReviews, approvedReviews, reviewHistoryLoading } = useUserStore();

  useEffect(() => {
    getReview();
  }, [getReview]);

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">See All Reviews</h1>
          <p className="text-slate-600 dark:text-slate-400">Track your pending, rejected, and approved submissions</p>
        </div>

        {reviewHistoryLoading ? (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-slate-200 dark:border-slate-700 text-slate-500">
            Loading reviews...
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Pending / Rejected</h2>
              {pendingReviews.length === 0 ? (
                <p className="text-slate-500">No pending or rejected reviews</p>
              ) : (
                <div className="space-y-3">
                  {pendingReviews.map((item) => (
                    <div key={item._id} className="p-4 rounded-lg bg-slate-100 dark:bg-slate-900 flex justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{item.question}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {item.company} ({item.companyType}) - {item.location}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {item.subject} | {item.questionType}
                        </p>
                        {item.status === "rejected" && item.rejectReason && (
                          <p className="text-xs text-rose-600 mt-1">Reason: {item.rejectReason}</p>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full h-fit ${item.status === "rejected" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Approved (Published)</h2>
              {approvedReviews.length === 0 ? (
                <p className="text-slate-500">No approved reviews yet</p>
              ) : (
                <div className="space-y-3">
                  {approvedReviews.map((item) => (
                    <div key={item._id} className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{item.question}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {item.company} ({item.companyType}) - {item.location}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {item.subject} | {item.questionType}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full h-fit bg-emerald-100 text-emerald-700">
                        approved
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserReviewHistory;
