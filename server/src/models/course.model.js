const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'approve'],
        default: 'pending'
    }
}, { _id: true })

const courseSchema = new mongoose.Schema({
    course: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    subjects: {
        type: [subjectSchema],
        default: []
    },
    company: {
        type: [String],
        default: []
    }
})

const CourseModel = mongoose.model('Course', courseSchema)

module.exports = CourseModel