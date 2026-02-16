const PostModel = require("../models/post.model");
const CourseModel = require("../models/course.model");

class UserController {
  static async getPostData(req, res) {
    try {
      const { cource,subject, questionType } = req.params;
      let { page = 1, limit = 10 } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const skip = (page - 1) * limit;

      // Build filter object
      const filter = { cource };
      
      // Add questionType to filter only if provided
      if (questionType && questionType !== "" && questionType !== "all") {
        filter.questionType = questionType;
      }
      
      // Add subject to filter only if provided
      if (subject && subject !== "" && subject !== "all") {
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
  static async getSubjectName(req,res){
    try {
      const { cource } = req.params;
      const subjects = await CourseModel.findOne({ course: cource }).select("subjects -_id");
      if (!subjects) {
        return res.status(404).json({ success: false, message: "Course not found" });
      }
      return res.status(200).json({ success: true, subjects: subjects.subjects });
      
    } catch (error) {
       console.error("getSubjectName:", error.message);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = UserController;
