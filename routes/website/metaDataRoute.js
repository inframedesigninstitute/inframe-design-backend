const express = require('express')
const { metaDataFetchOffline, metaDataFetchOnline } = require('../../controllers/website/metaDataController')

const metaDataRoute = express.Router()

metaDataRoute.get('/fetch-online/:slug', metaDataFetchOnline)

metaDataRoute.get('/fetch-offline/:slug', metaDataFetchOffline)


module.exports = { metaDataRoute }