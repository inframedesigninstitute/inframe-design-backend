const { default: mongoose, Schema } = require("mongoose");

const cartSchema = new Schema({
    userId: String,
    userData: Object,
    courseDetails: Object,
    quantity: Number,
    main : String
})

const cartModel = mongoose.model('cart', cartSchema)

module.exports = { cartModel }