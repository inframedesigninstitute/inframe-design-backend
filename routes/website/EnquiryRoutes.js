const express = require('express')
const { enquiryAdd, enquiryView, enquiryCityView } = require('../../controllers/website/EnquiryController')
const { enquiryStateView } = require('../../controllers/admin/AdminEnquiryController')

const EnquiryRoute = express.Router()

EnquiryRoute.post('/add', enquiryAdd)
EnquiryRoute.get('/view-places', enquiryCityView)
EnquiryRoute.get('/state-view', enquiryStateView)



module.exports = { EnquiryRoute }