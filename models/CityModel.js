const { default: mongoose } = require("mongoose");

const citySchema = mongoose.Schema({
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'state' },
    cityName: String,
})


const cityModel = mongoose.model('city', citySchema)

module.exports = { cityModel }