const { default: mongoose } = require("mongoose");

const EnquirySchema = mongoose.Schema({
    enquiryName: String,
    enquiryEmail: String,
    enquiryPhone: String,
    enquiryState: String,
    enquiryCity: String,
    enquiryProgram: String,
    enquiryCourse: String,
    enquiryIsMarked: Boolean
})

const enquiryModel = mongoose.model('enquiry', EnquirySchema)

module.exports = { enquiryModel }