const { offlineCourseModel } = require("../../models/offlineCourseModel");
const { onlineCourseModel } = require("../../models/onlineCourseModel")

const onlineCourseView = async (req, res) => {
    try {
        const onlineCourseData = await onlineCourseModel
            .find()
            .populate("courseCategory", "categoryName");  // courseCategory field ko populate karega, sirf categoryName laayega

        res.send({
            status: 1,
            msg: "online course data",
            onlineCourseData,
        });
    } catch (err) {
        res.send({
            status: 0,
            msg: "kuch galat ho gaya",
            err,
        });
    }
};


const offlineCourseView = async (req, res) => {
    try {
        const offlineCourseData = await offlineCourseModel
            .find()
            .populate("courseCategory", "categoryName");  // courseCategory field ko populate karega, sirf categoryName laayega
        res.send({
            status: 1,
            msg: "offline course data",
            offlineCourseData,
        });
    } catch (err) {
        res.send({
            status: 0,
            msg: "kuch galat ho gaya",
            err,
        });
    }
};










module.exports = { onlineCourseView, offlineCourseView }