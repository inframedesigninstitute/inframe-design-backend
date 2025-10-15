const express = require('express')
const { webSlider } = require('../../controllers/website/webSliderController')

const sliderRoute = express.Router()

sliderRoute.get('/view',webSlider)

module.exports={sliderRoute}