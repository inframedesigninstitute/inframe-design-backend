const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const { websiteRoute } = require('./routes/website/webRoutes')
const connectDB = require('./configs/dbConfig')
const { adminModel } = require('./models/adminModel')
const { adminRoute } = require('./routes/admin/adminRoutes')
const app = express()
app.use(express.json())


const allowedOrigins = [
    'https://inframedesigninstitute.com',
    'https://inframe-design-admin.vercel.app',
    'https://design-institute.vercel.app/',
    'http://localhost:3000',
    'http://localhost:3001',
];

app.use(cors({
    origin: function (origin, callback) {
        console.log('CORS origin:', origin); // ⬅️ Add this
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));



app.use('/web', websiteRoute)
app.use('/admin', adminRoute)

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


