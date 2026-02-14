import React, { useEffect, useState } from "react";
import { useCourseStore } from "../../store/useCourseStore";

const CourseSubject = () => {

  const {
    subjects,
    loading,
    fetchSubjects,
    addSubject,
    deleteSubject
  } = useCourseStore();

  const [newSubject, setNewSubject] = useState("");

  /* ================= FETCH ON LOAD ================= */

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);


  /* ================= ADD SUBJECT ================= */

  const handleAdd = () => {

    if (!newSubject.trim()) return;

    addSubject(newSubject.trim());

    setNewSubject("");

  };


  /* ================= DELETE SUBJECT ================= */

  const handleDelete = (subject) => {
    deleteSubject(subject);
  };


  return (

    <div className="flex-1 p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 min-h-screen">

      {/* HEADER */}
      <div className="mb-6">

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Course Subjects
        </h1>

        <p className="text-slate-600 dark:text-slate-400">
          Manage subjects for your course
        </p>

      </div>


      {/* ADD SUBJECT CARD */}

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-6">

        <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
          Add New Subject
        </h2>

        <div className="flex gap-3">

          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Enter subject name"
            className="flex-1 px-4 py-2 border rounded-lg 
            dark:bg-slate-900 
            dark:border-slate-700 
            dark:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Add
          </button>

        </div>

      </div>


      {/* SUBJECT LIST */}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg">

        <div className="p-6 border-b dark:border-slate-700">

          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            All Subjects
          </h2>

        </div>


        {/* LOADING */}

        {loading && (

          <p className="p-6 text-center text-slate-500">
            Loading subjects...
          </p>

        )}


        {/* EMPTY */}

        {!loading && subjects.length === 0 && (

          <p className="p-6 text-center text-slate-500">
            No subjects found
          </p>

        )}


        {/* SUBJECT GRID */}

        {!loading && subjects.length > 0 && (

          <div className="p-6 grid md:grid-cols-3 gap-4">

            {subjects.map((subject, index) => (

              <div
                key={index}
                className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 p-4 rounded-lg hover:shadow-md transition"
              >

                <span className="font-medium text-slate-800 dark:text-white">
                  {subject}
                </span>

                <button
                  onClick={() => handleDelete(subject)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default CourseSubject;
