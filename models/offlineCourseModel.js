const { Schema, default: mongoose } = require("mongoose")

const offlineCourse = new mongoose.Schema({
    courseName: String,
    courseImage: Object,
    cousreHeadline: String,
    courseAbout: String,
    courseBannerImage: Object,
    coursePoints: Array,
    coursePrice: String,
    courseHeroImage: Object,
    courseFaqsQuestions: Array,
    courseFaqsAnswer: Array
})

const offlineCourseModel = mongoose.model('offline-course', offlineCourse)


module.exports = { offlineCourseModel }

