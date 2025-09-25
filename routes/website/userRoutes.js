const express = require('express')
const { userCreate, otpVerify, userLogin } = require('../../controllers/website/userAuthController')

const userRoutes = express.Router()

userRoutes.post('/register', userCreate)
userRoutes.post('/otp-verify', otpVerify)
userRoutes.post('/login', userLogin)


module.exports = { userRoutes }