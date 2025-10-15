
const express = require('express')
const { addOnlineCategory, addOfflineCategory, fetchOnlineCategory, fetchOfflineCategory, fetchById } = require('../../controllers/admin/adminCategoryController')

const adminCategoryRoute = express.Router()

adminCategoryRoute.post(`/add-online-category`, addOnlineCategory)
adminCategoryRoute.get(`/view-online-category`, fetchOnlineCategory)
adminCategoryRoute.post(`/add-offline-category`, addOfflineCategory)
adminCategoryRoute.get(`/view-offline-category`, fetchOfflineCategory)


adminCategoryRoute.get('/fetch-category-by-id/:courseId', fetchById)




module.exports = { adminCategoryRoute }