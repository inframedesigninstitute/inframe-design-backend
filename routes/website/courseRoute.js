const express = require('express')
const { onlineCourseView } = require('../../controllers/website/courseController')


const courseRoute = express.Router()

courseRoute.get('/view-online', onlineCourseView)


module.exports = { courseRoute }