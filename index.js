const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const { websiteRoute } = require('./routes/website/webRoutes')
const connectDB = require('./configs/dbConfig')
const { adminModel } = require('./models/adminModel')
const { adminRoute } = require('./routes/admin/adminRoutes')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())

app.use('/web', websiteRoute)
app.use('/admin', adminRoute)



app.use('/uploads/coursesImages', express.static('uploads/coursesImages'))



connectDB().then(async () => {
    //one time password working
    const adminExist = await adminModel.find()
    if (adminExist.length == 0) {
        const hashedPassword = await bcrypt.hash("admin123", 10); // 10 = salt rounds
        await adminModel.insertOne({
            admin_userEmail: "admin@123",
            admin_userPassword: hashedPassword
        })
    }
    app.listen(process.env.PORT, () => {
        console.log(process.env.PORT)
    })
})


//onlineCourse