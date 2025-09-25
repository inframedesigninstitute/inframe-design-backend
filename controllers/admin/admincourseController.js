const { offlineCourseModel } = require("../../models/offlineCourseModel");
const { onlineCourseModel } = require("../../models/onlineCourseModel");

const addOnlineCourse = async (req, res) => {
    let allData = { ...req.body };
    try {
        // Multiple files upload hone par req.files object hota hai
        // Form fields


        // Agar aapko courseImage file ki zarurat hai, to req.files.courseImage hoga (array)
        if (req.files && req.files.courseImage) {
            allData.courseImage = req.files.courseImage[0]; // pehli file
        }
        if (req.files && req.files.courseBannerImage) {
            allData.courseBannerImage = req.files.courseBannerImage[0];
        }
        if (req.files && req.files.courseHeroImage) {
            allData.courseHeroImage = req.files.courseHeroImage[0];
        }
        if (req.files && req.files.courseStudyMaterials) {
            allData.courseStudyMaterials = req.files.courseStudyMaterials.map(file => file.filename);
        }


        // Aap yaha apna DB saving logic daal sakte hain
        const data = new onlineCourseModel(allData)
        const dataRes = await data.save()
        res.send({
            status: 1,
            msg: 'Online course added successfully',
            dataRes
        })
    }

    catch (err) {
        res.send({
            status: 0,
            msg: 'something went wrong',
            err
        })
    }
    console.log(allData)
}



const addOfflineCourse = async (req, res) => {
    let allData = { ...req.body };

    try {
        // Multiple files upload hone par req.files object hota hai
        // Form fields

        // Agar aapko courseImage file ki zarurat hai, to req.files.courseImage hoga (array)
        if (req.files && req.files.courseImage) {
            allData.courseImage = req.files.courseImage[0]; // pehli file
        }
        if (req.files && req.files.courseBannerImage) {
            allData.courseBannerImage = req.files.courseBannerImage[0];
        }
        if (req.files && req.files.courseHeroImage) {
            allData.courseHeroImage = req.files.courseHeroImage[0];
        }


        // Aap yaha apna DB saving logic daal sakte hain
        const data = new offlineCourseModel(allData)
        const dataRes = await data.save()
        res.send({
            status: 1,
            msg: 'Online course added successfully',
            dataRes
        })
        console.log(allData)
    }
    catch (err) {
        res.send({
            status: 0,
            msg: 'something went wrong',
            err
        })
    }
}


module.exports = { addOnlineCourse, addOfflineCourse };
