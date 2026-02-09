const PostModel = require("../models/post.model");

class UserController {
  static async getPostData(req, res) {
    console.log("Hello beb")
    try {
      const { cource, questionType } = req.params;
      let { page = 1, limit = 10 } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const skip = (page - 1) * limit;

      const posts = await PostModel.find({ cource, questionType }).skip(skip).limit(limit).sort({ createdAt: -1 });
      const total = await PostModel.countDocuments({ cource, questionType });
      return res.status(200).json({ success: true, page,limit,total, totalPages: Math.ceil(total / limit), posts });

    } catch (error) {
      console.error("getPostData:", error.message);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = UserController;
