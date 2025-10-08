const { offlineCategoryModel } = require("../../models/offlineCategoryMode");
const { onlineCategoryModel } = require("../../models/onlineCategoryModel");

const addOnlineCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const categoryCheckInDb = await onlineCategoryModel.findOne({ categoryName });
        if (!categoryCheckInDb) {
            const category = new onlineCategoryModel({ categoryName });
            const categoryRes = await category.save();
            res.send({
                status: 1,
                msg: "category api",
                categoryRes,
            });
        } else {
            res.send({
                status: 2,
                msg: "category already exist ",
            });
        }
    } catch (err) {
        res.send({
            status: 1,
            msg: "something went wrong",
            err,
        });
    }
};

const fetchOnlineCategory = async (req, res) => {
    try {
        const categoryData = await onlineCategoryModel.find();
        res.send({
            status: 1,
            msg: "category data",
            categoryData,
        });
    } catch (err) {
        res.send({
            status: 0,
            msg: "something went wrong",
            err,
        });
    }
};

const addOfflineCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const categoryCheckInDb = await offlineCategoryModel.findOne({ categoryName });
        if (!categoryCheckInDb) {
            const category = new offlineCategoryModel({ categoryName });
            const categoryRes = await category.save();
            res.send({
                status: 1,
                msg: "category api",
                categoryRes,
            });
        } else {
            res.send({
                status: 2,
                msg: "category already exist ",
            });
        }
    } catch (err) {
        res.send({
            status: 1,
            msg: "something went wrong",
            err,
        });
    }
};

const fetchOfflineCategory = async (req, res) => {
    try {
        const categoryData = await offlineCategoryModel.find();
        res.send({
            status: 1,
            msg: "category data",
            categoryData,
        });
    } catch (err) {
        res.send({
            status: 0,
            msg: "something went wrong",
            err,
        });
    }
};

const fetchById = async (req, res) => {
    const { courseId } = req.params
    const category = await onlineCategoryModel.findOne({ courseCategory: courseId })
    res.send({
        status : 1,
        msg : 'category fetched by id successfully',
        category
    })
}



module.exports = {
    addOnlineCategory,
    fetchOnlineCategory,
    addOfflineCategory,
    fetchById,
    fetchOfflineCategory
}