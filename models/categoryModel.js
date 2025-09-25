const { default: mongoose } = require("mongoose");

const categorySchema = mongoose.Schema({
    categoryName: ({
        type: String,
        unique: true,
        required: true,
    })
})

const categoryModel = mongoose.model('category',categorySchema)


module.exports = { categoryModel }