const express = require('express')
const { onlineCourseView, offlineCourseView } = require('../../controllers/website/courseController')


const courseRoute = express.Router()

courseRoute.get('/view-online', onlineCourseView)
courseRoute.get('/view-offline', offlineCourseView)





module.exports = { courseRoute }