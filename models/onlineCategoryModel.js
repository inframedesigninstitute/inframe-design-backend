const { default: mongoose } = require("mongoose");

const onlineCategorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true,
    }
})

const onlineCategoryModel = mongoose.model('onlineCategory', onlineCategorySchema)

module.exports = { onlineCategoryModel }