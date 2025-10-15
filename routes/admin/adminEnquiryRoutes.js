const express = require('express')
const { enquiryStateAdd, enquiryStateView, enquiryCityAdd, enquiryCityView, enquiryEntriesView } = require('../../controllers/admin/AdminEnquiryController')

const adminEnquiryRoute = express.Router()

adminEnquiryRoute.post('/add-state', enquiryStateAdd)
adminEnquiryRoute.get('/view-state', enquiryStateView)
adminEnquiryRoute.post('/add-city', enquiryCityAdd)
adminEnquiryRoute.get('/view-city', enquiryCityView)
adminEnquiryRoute.get('/all-entries', enquiryEntriesView)
adminEnquiryRoute.get('/all-entries', enquiryEntriesView)



module.exports = { adminEnquiryRoute }