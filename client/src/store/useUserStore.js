import { create } from "zustand"
import { axiosInstance } from "../API/axiosInstace"
import { toast } from "react-toastify"

export const useUserStore = create((set) => ({
    posts: [],
    subjects: [],
    loading: false,
    subjectLoading: false,
    pagination: {
        currentPage: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    },

    getPostData: async (cource, subject = "", questionType = "", page = 1, limit = 10) => {
        set({ loading: true })
        try {
            const subjectParam = subject || "all"
            const questionTypeParam = questionType || "all"
            const res = await axiosInstance.get(`/user/getpostdata/${cource}/${subjectParam}/${questionTypeParam}`, {
                params: { page, limit }
            })
            set({
                posts: res.data.posts,
                pagination: {
                    currentPage: res.data.page,
                    limit: res.data.limit,
                    total: res.data.total,
                    totalPages: res.data.totalPages
                }
            })
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            set({ loading: false })
        }
    },

    getSubjectsByCourse: async (cource) => {
        if (!cource) {
            set({ subjects: [] })
            return
        }
        set({ subjectLoading: true })
        try {
            const res = await axiosInstance.get(`/user/getSubjectName/${cource}`)
            set({ subjects: res.data.subjects || [] })
        } catch (error) {
            set({ subjects: [] })
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            set({ subjectLoading: false })
        }
    },

    clearPosts: () => set({
        posts: [],
        subjects: [],
        pagination: { currentPage: 1, limit: 10, total: 0, totalPages: 0 }
    })
}))
