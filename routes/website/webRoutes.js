const express = require('express')
const { userRoutes } = require('./userRoutes')
const { EnquiryRoute } = require('./EnquiryRoutes')

const websiteRoute = express.Router()

websiteRoute.use('/user', userRoutes)
websiteRoute.use('/enquiry', EnquiryRoute)



module.exports = { websiteRoute }