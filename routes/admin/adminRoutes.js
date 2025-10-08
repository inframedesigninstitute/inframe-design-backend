const express = require('express')
const { adminUserRoute } = require('./adminUserRoute')
const { adminEnquiryRoute } = require('./adminEnquiryRoutes')
const { courseRoute, adminCourseRoute } = require('./adminCourseRoutes')
const { adminCategoryRoute } = require('./adminCategoryRoute')

const adminRoute = express.Router()

adminRoute.use('/user', adminUserRoute)
adminRoute.use('/enquiry', adminEnquiryRoute)
adminRoute.use('/course', adminCourseRoute)
adminRoute.use('/category', adminCategoryRoute)



module.exports = { adminRoute }