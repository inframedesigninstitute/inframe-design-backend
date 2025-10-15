const { Schema, default: mongoose } = require("mongoose")

const offlineCourseSchema = new mongoose.Schema({
    courseName: String,
    courseCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'offlineCategory', // 👈 Reference to Category model
        required: true
    },
    courseImage: String,
    cousreHeadline: String,
    courseAbout: String,
    courseBannerImage: String,
    coursePoints: Array,
    coursePrice: String,
    courseHeroImage: String,
    courseFaqsQuestions: Array,
    courseFaqsAnswer: Array,
    courseMetaTitle: String,
    courseMetaDescription: String
})

const offlineCourseModel = mongoose.model('offline-course', offlineCourseSchema)


module.exports = { offlineCourseModel }

