const express = require('express')
const { adminUserRoute } = require('./adminUserRoute')
const { adminEnquiryRoute } = require('./adminEnquiryRoutes')
const { adminCourseRoute } = require('./adminCourseRoutes')
const { adminCategoryRoute } = require('./adminCategoryRoute')
const { adminSliderRoute } = require('./adminSliderRoute')

const adminRoute = express.Router()

adminRoute.use('/user', adminUserRoute)
adminRoute.use('/enquiry', adminEnquiryRoute)
adminRoute.use('/course', adminCourseRoute)
adminRoute.use('/category', adminCategoryRoute)
adminRoute.use('/slider', adminSliderRoute)




module.exports = { adminRoute }