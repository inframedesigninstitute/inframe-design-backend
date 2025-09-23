const express = require('express')
const { adminUserRoute } = require('./adminUserRoute')
const { adminEnquiryRoute } = require('./adminEnquiryRoutes')

const adminRoute = express.Router()

adminRoute.use('/user', adminUserRoute)
adminRoute.use('/enquiry', adminEnquiryRoute)


module.exports = { adminRoute }