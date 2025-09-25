const express = require('express')
const { adminUserRoute } = require('./adminUserRoute')
const { adminEnquiryRoute } = require('./adminEnquiryRoutes')
const { courseRoute } = require('./adminCourseRoutes')

const adminRoute = express.Router()

adminRoute.use('/user', adminUserRoute)
adminRoute.use('/enquiry', adminEnquiryRoute)
adminRoute.use('/course', courseRoute)


module.exports = { adminRoute }