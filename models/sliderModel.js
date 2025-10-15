const { Schema, default: mongoose } = require("mongoose");

const sliderSchema = new Schema({
    sliderImage: Object,
    sliderHeadlineFirst: String,
    sliderHeadlineSecond: String,
    sliderDescription: String
})

const sliderModel = mongoose.model('slider', sliderSchema)


module.exports = { sliderModel }