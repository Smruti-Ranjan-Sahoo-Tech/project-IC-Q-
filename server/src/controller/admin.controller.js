const CourseModel = require("../models/course.model");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");


class AdminController {
    static async seeAllPost(req, res) {
        try {

            const { email, username, _id } = req.user;
            console.log(req.user)

            const posts = await PostModel.find().populate("writtenBy", "username email");

            return res.status(200).json({
                success: true,
                admin: { email, username, _id },
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
            const { question, answer, questionType, subject } = req.body;
            console.log("Creating post - req.body:", req.body)
            console.log("Creating post - req.user:", req.user)

            if (!["Interview", "Coding", "Subjective"].includes(questionType)) {
                return res.status(400).json({ success: false, message: "Invalid question type" });
            }

            const newPost = await PostModel.create({
                question,
                answer,
                questionType,
                cource,
                subject,
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
            const { cource } = req.user
            const { question, answer, questionType, subject } = req.body;

            const updatedPost = await PostModel.findByIdAndUpdate(
                id,
                { question, answer, questionType, cource, subject },
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
    static async findAllUser(req, res) {
        try {
            const cource = req.user.cource;
            const allUser = await UserModel.find({ cource: cource }).select("-password");
            res.status(200).json({
                message: "All user data find sucessfully ",
                data: allUser
            }
            )

        } catch (error) {
            console.error("findAllUserError:", error.message);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
    static async freezeUser(req, res) {
        try {
            const { id } = req.params;

            const user = await UserModel.findByIdAndUpdate(
                id,
                { isBlocked: true },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            return res.status(200).json({
                message: "User Blocked Successfully"
            });

        } catch (error) {
            console.error("freezeUserError:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }

    static async unfreezeUser(req, res) {
        try {
            const { id } = req.params;
            const user = await UserModel.findByIdAndUpdate(
                id,
                { isBlocked: false },
                { new: true }
            )
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            return res.status(200).json({
                message: "User Unblocked Successfully"
            });

        } catch (error) {
            console.error("unfreezeUserError:", error.message);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
    static async mainDashboard(req, res) {
        try {
            const { cource } = req.user;

            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

            const [
                totalUsers,
                totalCourceUsers,
                activeUsers,
                inactiveUsers,
                lastMonthRegistrations
            ] = await Promise.all([
                UserModel.countDocuments(),
                UserModel.countDocuments({ cource: cource }),
                UserModel.countDocuments({ isBlocked: false, cource: cource }),
                UserModel.countDocuments({ isBlocked: true, cource: cource }),
                UserModel.countDocuments({ createdAt: { $gte: oneMonthAgo }, cource: cource })
            ]);

            return res.status(200).json({
                success: true,
                data: {
                    totalUsers,
                    totalCourceUsers,
                    activeUsers,
                    inactiveUsers,
                    lastMonthRegistrations
                }
            });

        } catch (error) {
            console.error("mainDashboardError:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
    static async getCourseSubjects(req, res) {
    try {

       
        const requestedCourse = (req.user?.cource || '').toString().trim();

        // validation
        if (!requestedCourse) {
            return res.status(400).json({
                success: false,
                message: "Course is required",
                subjects: []
            });
        }

        // find subjects only
        const courseData = await CourseModel.findOne(
            { course: requestedCourse },
            { subjects: 1, _id: 0 }
        ).lean(); // improves performance

        // if course not found, return empty subjects instead of error
        if (!courseData) {
            return res.status(200).json({
                success: true,
                subjects: []
            });
        }

        return res.status(200).json({
            success: true,
            subjects: courseData.subjects
        });

    } catch (error) {
        console.error("getCourseSubjectsError:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            subjects: []
        });
    }
}


   static async addCourceSubject(req, res) {
    try {
        const { cource } = req.user;   // your original field name
        const { subject } = req.body;

        // validation
        if (!subject || subject.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Subject is required"
            });
        }

        // update or create course
        const courseData = await CourseModel.findOneAndUpdate(
            { course: cource.trim() },
            { $addToSet: { subjects: subject.trim() } },
            {
                new: true,
                upsert: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Subject added to course successfully",
            course: courseData
        });

    } catch (error) {
        console.error("addCourceSubjectError:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

    static async deleteCourceSubject(req, res) {
    try {
        const { cource } = req.user;
        const { id } = req.params;  // id = subject name

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Subject is required"
            });
        }

        const updatedCourse = await CourseModel.findOneAndUpdate(
            { course: cource },
            { $pull: { subjects: id.trim() } },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Subject removed successfully",
            course: updatedCourse
        });

    } catch (error) {
        console.error("deleteCourceSubjectError:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}



}
module.exports = AdminController