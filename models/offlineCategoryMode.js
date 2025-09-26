const { default: mongoose } = require("mongoose");

const offlineCategorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true,
    }
})

const offlineCategoryModel = mongoose.model('offlineCategory', offlineCategorySchema)

module.exports = { offlineCategoryModel }