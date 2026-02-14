const PostModel = require("../models/post.model");
const CourseModel = require("../models/course.model");

class UserController {
  static async getPostData(req, res) {
    try {
      const { cource, questionType } = req.params;
      let { page = 1, limit = 10, subject = "" } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const skip = (page - 1) * limit;

      // Build filter object
      const filter = { cource };
      
      // Add questionType to filter only if provided
      if (questionType && questionType !== "") {
        filter.questionType = questionType;
      }
      
      // Add subject to filter only if provided
      if (subject && subject !== "") {
        filter.subject = subject;
      }

      const posts = await PostModel.find(filter)
        .populate("writtenBy", "username email")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await PostModel.countDocuments(filter);
      
      return res.status(200).json({ 
        success: true, 
        page,
        limit,
        total, 
        totalPages: Math.ceil(total / limit), 
        posts 
      });

    } catch (error) {
      console.error("getPostData:", error.message);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = UserController;
