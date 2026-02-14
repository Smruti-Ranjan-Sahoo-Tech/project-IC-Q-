const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    course: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    subjects: {
        type: [String],
        default: []
    }
})

const CourseModel = mongoose.model('Course', courseSchema)

module.exports = CourseModel
