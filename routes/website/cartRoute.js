const express = require('express')
const { addToCart, cartEntryView, removeFromCart } = require('../../controllers/website/cartController')
const { checkToken } = require('../../middleware/checkTokenMid')

const cartRoute = express.Router()

cartRoute.post('/add-to-cart', checkToken, addToCart)
cartRoute.post('/view-cart', checkToken, cartEntryView)
cartRoute.post('/remove-from-cart', checkToken, removeFromCart)




module.exports = { cartRoute }