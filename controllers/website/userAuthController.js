const { userModel } = require("../../models/userModel")
const bcrypt = require('bcrypt');
const saltRounds = 10;
let jwt = require("jsonwebtoken");
const { transporter } = require("../../configs/mailConfig");
let myOtp = new Map();

let userCreate = async (req, res) => {

    let { userEmail, userPassword, userPhone, userName } = req.body

    let obj = {
        userName,
        userEmail,
        userPhone,
        userPassword
    }
    let userRes = await userModel.findOne({ userEmail: userEmail })
    if (!userRes) {
        try {
            const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP

            myOtp.set(userEmail, otp)  //key name - userEmail stored - otp

            const info = await transporter.sendMail({
                from: '"OTP mail" <inframedesigninstitute@gmail.com>',
                to: userEmail,
                subject: "OTP mail",
                text: "", // plain‑text body
                html: ` <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #FF5733;">Your OTP Code</h2>
                        <p>Use the following <b style="font-size: 24px; color: #000;">${otp}</b> to complete your verification.</p>
                        <p style="font-size: 14px; color: #777;">This OTP is valid for 10 minutes.</p>
                        <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
                        <p style="font-size: 12px; color: #999;">If you did not request this, please ignore this email.</p>
                    </div>`, // HTML body
            });
            res.send({
                status: 1,
                msg: "Otp Sent",
                // userRes
            })
        }
        catch (error) {
            res.send({
                status: 0,
                msg: "Something Went wrong try with different Email !",
                error
            })
        }
    }
    else {
        res.send({
            status: 2,
            msg: 'User already exists, Please Login !'
        })
    }
}


let otpVerify = async (req, res) => {
    let { userEmail, userPassword, userPhone, otpValue, userName } = req.body
    let dbPassword = await bcrypt.hash(userPassword, saltRounds)
    let obj = {
        userName,
        userEmail,
        userphone: userPhone,
        userPassword: dbPassword
    }
    let storeOtp = myOtp.get(userEmail)

    if (storeOtp === otpValue) {
        try {
            let user = await userModel(obj)
            let userRes = await user.save()
            res.send({
                status: 1,
                msg: "User Created",
                userRes
            })
        }
        catch (error) {
            res.send({
                status: 0,
                msg: "Something went wrong try again later",
                error
            })
        }
    }
    else {
        res.send({
            status: 2,
            msg: "Invalid Otp try again later"
        })
    }
}



let userLogin = async (req, res) => {
    let { userEmail, userPassword } = req.body
    let userData = await userModel.findOne({ userEmail: userEmail })


    if (userData) {
        let dbPassword = userData.userPassword
        let isMatch = await bcrypt.compare(userPassword, dbPassword)
        if (isMatch) {
            const token = jwt.sign(
                { id: userData._id, userEmail: userData.userEmail },
                process.env.TOKENKEY
            );

            res.send({
                status: 1,
                msg: "User login successfully",
                userData,
                token
            })
        }
        else {
            res.send({
                status: 2,
                msg: "Invalid Password"
            })
        }
    }
    else {
        res.send({
            status: 3,
            msg: "User not found, Please register !"
        })
    }
}

module.exports = { userCreate, otpVerify, userLogin }