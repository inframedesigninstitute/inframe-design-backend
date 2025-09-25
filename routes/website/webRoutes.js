const express = require('express')
const { userRoutes } = require('./userRoutes')
const { EnquiryRoute } = require('./EnquiryRoutes')
const { courseRoute } = require('./courseRoute')

const websiteRoute = express.Router()

websiteRoute.use('/user', userRoutes)
websiteRoute.use('/enquiry', EnquiryRoute)
websiteRoute.use('/course', courseRoute)




module.exports = { websiteRoute }