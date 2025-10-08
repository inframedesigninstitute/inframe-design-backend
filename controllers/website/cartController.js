const Razorpay = require("razorpay");
const { onlineCourseModel } = require("../../models/onlineCourseModel");
const { offlineCourseModel } = require("../../models/offlineCourseModel");
const { userModel } = require("../../models/userModel");
const { cartModel } = require("../../models/cartModel");

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// })

const addToCart = async (req, res) => {
    const { id, itemId, main } = req.body;

    try {
        let courseData = await onlineCourseModel
            .findOne({ _id: itemId })
            .select("courseName coursePrice courseCategory courseHeadline courseImage")
            .populate("courseCategory");

        if (!courseData) {
            courseData = await offlineCourseModel
                .findOne({ _id: itemId })
                .select("courseName coursePrice courseCategory courseHeadline courseImage")
                .populate("courseCategory");
        }


        const cartObj = {
            userId: id,
            userData: await userModel.findOne({ _id: id }),
            courseDetails: courseData,
            quantity: 1,
            main
        };
        const cart = new cartModel(cartObj)
        const cartRes = await cart.save()
        res.send({
            status: 1,
            msg: "added in cart successfully !",
            cartRes
        });
    }
    catch (err) {
        res.send({
            status: 0,
            msg: "addtocart api is running",
            err
        });
    }
};


const cartEntryView = async (req, res) => {
    const staticPath = process.env.APIBASEURL + '/uploads/coursesImages/'
    const { id } = req.body
    try {
        const cartData = await cartModel.find({ userId: id })
        res.send({
            status: 1,
            msg: 'all cart entries',
            cartData,
            staticPath
        })
    }
    catch (err) {
        res.send({
            status: 0,
            msg: 'failed to fetch cart data',
            err
        })
    }

}


const removeFromCart = async (req, res) => {
    const { id } = req.body
    const { courseId } = req.body
    try {
        const removeCart = await cartModel.deleteOne({ userId: id }, { _id: courseId })
        res.send({
            status: 1,
            msg: 'course remove from cart api',
            removeCart
        })
    }
    catch (err) {
        res.send({
            status: 1,
            msg: 'something went wrong',
            err
        })
    }

}

module.exports = { addToCart, cartEntryView, removeFromCart };
