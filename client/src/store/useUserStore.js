import { create } from "zustand"
import { axiosInstance } from "../API/axiosInstace"
import { toast } from "react-toastify"

export const useUserStore = create((set) => ({
    posts: [],
    loading: false,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    },

    getPostData: async (cource, questionType, page = 1, limit = 10, subject = "") => {
        set({ loading: true })
        try {
            const res = await axiosInstance.get(`/user/getpostdata/${cource}/${questionType}`, {
                params: { page, limit, subject }
            })
            set({
                posts: res.data.posts,
                pagination: {
                    page: res.data.page,
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

    clearPosts: () => set({ posts: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } })
}))
