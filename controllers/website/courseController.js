const { categoryModel } = require("../../models/categoryModel")
const { onlineCourseModel } = require("../../models/onlineCourseModel")

const onlineCourseView = async (req, res) => {
    try {
        const onlineCourseData = await onlineCourseModel.find().populate('courseCategory')
        res.send({
            status: 1,
            msg: 'online course data',
            onlineCourseData
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

const addCategory = async (req, res) => {

    try {
        const { categoryName } = req.body
        const categoryCheckInDb = await categoryModel.findOne({ categoryName })
        if (!categoryCheckInDb) {
            const category = new categoryModel({ categoryName })
            const categoryRes = await category.save()
            res.send({
                status: 1,
                msg: 'category api',
                categoryRes

            })
        }
        else {
            res.send({
                status: 2,
                msg: 'category already exist ',
            })
        }

    }
    catch (err) {
        res.send({
            status: 1,
            msg: 'something went wrong',
            err

        })
    }
}

const fetchCategory = async (req, res) => {
    try {
        const categoryData = await categoryModel.find()
        res.send({
            status: 1,
            msg: 'category data',
            categoryData
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


module.exports = { onlineCourseView, addCategory, fetchCategory }