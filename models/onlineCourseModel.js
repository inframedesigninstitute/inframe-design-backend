const { Schema, default: mongoose } = require("mongoose")

const onlineCourseSchema = new mongoose.Schema({
    courseName: String,
    courseCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'onlineCategory', // 👈 Reference to Category model
        required: true
    },
    courseImage: Object,
    cousreHeadline: String,
    courseAbout: String,
    courseBannerImage: Object,
    coursePoints: Array,
    coursePrice: String,
    courseHeroImage: Object,
    courseRecordingTitle: Array,
    courseRecordingDuration: Array,
    courseRecordingUrl: Array,
    courseStudyMaterialName: Array,
    courseStudyMaterials: Object,
    courseLearnPoints: Array,
    courseFaqsQuestions: Array,
    courseFaqsAnswer: Array
})

const onlineCourseModel = mongoose.model('online-course', onlineCourseSchema)


module.exports = { onlineCourseModel }

