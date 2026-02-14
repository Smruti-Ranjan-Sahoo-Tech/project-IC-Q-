const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    questionType: {
      type: String,
      required: true,
      enum: [ "Interview", "Coding", "Subjective"],
    },
    cource:{
        type:String,
        required:true
    },
    subject:{
          type:String,
          required:true
    },
    writtenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
