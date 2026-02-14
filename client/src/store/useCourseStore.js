import { create } from "zustand";
import { axiosInstance } from "../API/axiosInstace";
import { toast } from "react-toastify";

export const useCourseStore = create((set) => ({

  subjects: [],
  loading: false,

  /* ================= FETCH SUBJECTS ================= */

  fetchSubjects: async (course = "") => {
    try {

      set({ loading: true });

      const res = await axiosInstance.get(
        "/admin/getCourseSubjects",
        { params: course ? { course } : {} }
      );

      set({
        subjects: res.data.subjects || [],
        loading: false
      });

    } catch (error) {

      set({ loading: false });

      toast.error(
        error?.response?.data?.message ||
        "Failed to fetch subjects"
      );

    }
  },

  /* ================= ADD SUBJECT ================= */

  addSubject: async (subject) => {
    try {

      const res = await axiosInstance.post(
        "/admin/addCourceSubject",
        { subject }
      );

      toast.success(res.data.message);

      // Direct update (no refetch needed)
      set({
        subjects: res.data.course.subjects
      });

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Failed to add subject"
      );

    }
  },

  /* ================= DELETE SUBJECT ================= */

  deleteSubject: async (subject) => {
    try {

      const res = await axiosInstance.delete(
        `/admin/deleteCourceSubject/${subject}`
      );

      toast.success(res.data.message);

      // Direct update (no refetch needed)
      set({
        subjects: res.data.course.subjects
      });

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Failed to delete subject"
      );

    }
  }

}));
