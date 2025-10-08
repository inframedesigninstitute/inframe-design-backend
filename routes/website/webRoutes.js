const express = require('express')
const { userRoutes } = require('./userRoutes')
const { EnquiryRoute } = require('./EnquiryRoutes')
const { categoryRoute } = require('./categoryRoute')
const { courseRoute } = require('./courseRoute')
const { cartRoute } = require('./cartRoute')

const websiteRoute = express.Router()

websiteRoute.use('/user', userRoutes)
websiteRoute.use('/enquiry', EnquiryRoute)
websiteRoute.use('/category', categoryRoute)
websiteRoute.use('/course', courseRoute)
websiteRoute.use('/cart',cartRoute)









module.exports = { websiteRoute }