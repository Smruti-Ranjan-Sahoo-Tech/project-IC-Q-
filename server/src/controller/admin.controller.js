const PostModel = require("../models/post.model");


class AdminController {
    static async seeAllPost(req, res) {
        try {
            // req.user comes from your auth middleware
            const { email, username, _id } = req.user;
            console.log(req.user)

            // Fetch all posts, optionally populate writtenBy info
            const posts = await PostModel.find().populate("writtenBy", "username email");

            return res.status(200).json({
                success: true,
                admin: { email, username, _id }, // optional info for frontend
                posts
            });
        } catch (error) {
            console.error("seeAllPost:", error.message);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    static async createPost(req, res) {
        try {
            const { id, cource } = req.user;
            console.log(req.user)
            const { question, answer, questionType } = req.body;

            if (!["Subjective", "Coding"].includes(questionType)) {
                return res.status(400).json({ success: false, message: "Invalid question type" });
            }

            const newPost = await PostModel.create({
                question,
                answer,
                questionType,
                cource,
                writtenBy: id
            });

            return res.status(201).json({
                success: true,
                message: "Post created successfully",
                post: newPost
            });
        } catch (error) {
            console.error("createPost:", error.message);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }


    static async updatePost(req, res) {
        try {
            const { id } = req.params;
            const { question, answer, questionType, cource } = req.body;

            const updatedPost = await PostModel.findByIdAndUpdate(
                id,
                { question, answer, questionType, cource },
                { new: true, runValidators: true }
            );

            if (!updatedPost) {
                return res.status(404).json({ success: false, message: "Post not found" });
            }

            return res.status(200).json({ success: true, message: "Post updated successfully", post: updatedPost });
        } catch (error) {
            console.error("updatePost:", error.message);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
    static async deletePost(req, res) {
        try {
            const { id } = req.params;

            const deletedPost = await PostModel.findByIdAndDelete(id);

            if (!deletedPost) {
                return res.status(404).json({ success: false, message: "Post not found" });
            }

            return res.status(200).json({ success: true, message: "Post deleted successfully" });
        } catch (error) {
            console.error("deletePost:", error.message);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

}
module.exports = AdminController