const { offlineCourseModel } = require("../../models/offlineCourseModel");
const { onlineCourseModel } = require("../../models/onlineCourseModel");



const addOnlineCourse = async (req, res) => {
    let allData = { ...req.body };
    const { courseName } = req.body
    try {

        if (req.files && req.files.courseImage) {
            allData.courseImage = req.files.courseImage[0].filename;
        }
        if (req.files && req.files.courseBannerImage) {
            allData.courseBannerImage = req.files.courseBannerImage[0].filename;
        }
        if (req.files && req.files.courseHeroImage) {
            allData.courseHeroImage = req.files.courseHeroImage[0].filename;
        }
        if (req.files && req.files.courseStudyMaterials) {
            allData.courseStudyMaterials = req.files.courseStudyMaterials.map(
                (file) => file.filename
            );
        }

        const courseCheckInDb = await onlineCourseModel.findOne({ courseName })

        if (!courseCheckInDb) {
            // Aap yaha apna DB saving logic daal sakte hain
            const data = new onlineCourseModel(allData);
            const dataRes = await data.save();
            res.send({
                status: 1,
                msg: "Online course added successfully",
                dataRes,
            });
        }
        else {
            res.send({
                status: 2,
                msg: "Course Already Exist !",
            });
        }


    } catch (err) {
        res.send({
            status: 0,
            msg: "something went wrong",
            err,
        });
    }
};



const addOfflineCourse = async (req, res) => {
    let allData = { ...req.body };
    let { courseName } = req.body

    try {

        if (req.files && req.files.courseImage) {
            allData.courseImage = req.files.courseImage[0].filename;
        }
        if (req.files && req.files.courseBannerImage) {
            allData.courseBannerImage = req.files.courseBannerImage[0].filename;
        }
        if (req.files && req.files.courseHeroImage) {
            allData.courseHeroImage = req.files.courseHeroImage[0].filename;
        }


        const courseCheckInDb = await offlineCourseModel.findOne({ courseName })

        if (!courseCheckInDb) {
            // Aap yaha apna DB saving logic daal sakte hain
            const data = new offlineCourseModel(allData);
            const dataRes = await data.save();
            res.send({
                status: 1,
                msg: "Online course added successfully",
                dataRes,
            });
        }
        else {
            res.send({
                status: 2,
                msg: "Course Already Exist !",
            });
        }



    } catch (err) {
        res.send({
            status: 0,
            msg: "something went wrong",
            err,
        });
    }
};


const updateOnlineCourse = async (req, res) => {
    const { cId } = req.params;
    let allData = { ...req.body };

    try {
        // ✅ Handle new uploaded files
        if (req.files && req.files.courseImage) {
            allData.courseImage = req.files.courseImage[0].filename;
        }

        if (req.files && req.files.courseBannerImage) {
            allData.courseBannerImage = req.files.courseBannerImage[0].filename;
        }

        if (req.files && req.files.courseHeroImage) {
            allData.courseHeroImage = req.files.courseHeroImage[0].filename;
        }

        if (req.files && req.files.courseStudyMaterials) {
            allData.courseStudyMaterials = req.files.courseStudyMaterials.map(
                (file) => file.filename
            );
        }

        // ✅ Update the document
        const updateRes = await onlineCourseModel.updateOne(
            { _id: cId },
            { $set: allData }
        );

        res.send({
            status: 1,
            msg: "Online course updated successfully",
            updateRes,
        });


    } catch (err) {
        res.status(500).send({
            status: 0,
            msg: "Something went wrong",
            err,
        });
    }
};


const updateOfflineCourse = async (req, res) => {
    const { cId } = req.params;
    let allData = { ...req.body };

    try {
        // ✅ Handle new uploaded files
        if (req.files && req.files.courseImage) {
            allData.courseImage = req.files.courseImage[0].filename;
        }

        if (req.files && req.files.courseBannerImage) {
            allData.courseBannerImage = req.files.courseBannerImage[0].filename;
        }

        if (req.files && req.files.courseHeroImage) {
            allData.courseHeroImage = req.files.courseHeroImage[0].filename;
        }

        // ✅ Update the document
        const updateRes = await offlineCourseModel.updateOne(
            { _id: cId },
            { $set: allData }
        );

        res.send({
            status: 1,
            msg: "Online course updated successfully",
            updateRes,
        });


    } catch (err) {
        res.status(500).send({
            status: 0,
            msg: "Something went wrong",
            err,
        });
    }
};


const viewCourseById = async (req, res) => {
    const { cId } = req.params;
    try {
        const findCourseById = await onlineCourseModel.findOne({ _id: cId })
        const staticPath = process.env.APIBASEURL + '/uploads/coursesImages/'
        if (findCourseById) {
            res.send({
                status: 1,
                msg: 'course fetched for edit',
                findCourseById,
                staticPath
            })
        }
        else {
            res.send({
                status: 0,
                msg: 'course not found'
            })
        }
    }
    catch (err) {
        res.send({
            status: 0,
            msg: 'something went wrong'
        })
    }
}


const viewOfflineCourseById = async (req, res) => {
    const { cId } = req.params;
    const findCourseById = await offlineCourseModel.findOne({ _id: cId })
    const staticPath = process.env.APIBASEURL + '/uploads/coursesImages/'
    if (findCourseById) {
        res.send({
            status: 1,
            msg: 'course fetched for edit',
            findCourseById,
            staticPath
        })
    }
    else {
        res.send({
            status: 0,
            msg: 'course not found'
        })
    }
}
const deleteLearnPoints = async (req, res) => {
    try {
        const { windex } = req.body; // index to remove
        const { editId } = req.params; // course _id

        const course = await onlineCourseModel.findById(editId);

        if (!course) {
            return res.status(404).send({ status: 0, msg: 'Course not found' });
        }

        // Check if index is valid
        if (windex < 0 || windex >= course.courseLearnPoints.length) {
            return res.status(400).send({ status: 0, msg: 'Invalid index' });
        }

        // Remove item at given index
        course.courseLearnPoints.splice(windex, 1);

        // Save changes
        await course.save();

        res.send({
            status: 1,
            msg: 'Point deleted successfully',
            updatedPoints: course.courseLearnPoints
        });

    } catch (error) {
        res.status(500).send({ status: 0, msg: 'Server error' });
    }
};

const deleteOnlineCoursePoints = async (req, res) => {
    try {
        const { cIndex } = req.body; // index to remove
        const { editId } = req.params; // course _id

        const course = await onlineCourseModel.findById(editId);

        if (!course) {
            return res.status(404).send({ status: 0, msg: 'Course not found' });
        }

        // Check if index is valid
        if (cIndex < 0 || cIndex >= course.coursePoints.length) {
            return res.status(400).send({ status: 0, msg: 'Invalid index' });
        }

        // Remove item at given index
        course.coursePoints.splice(cIndex, 1);

        // Save changes
        await course.save();

        res.send({
            status: 1,
            msg: 'Point deleted successfully',
            updatedPoints: course.coursePoints
        });

    } catch (error) {
        res.status(500).send({ status: 0, msg: 'Server error' });
    }
}


const deleteOfflineCoursePoints = async (req, res) => {
    try {
        const { cIndex } = req.body; // index to remove
        const { editId } = req.params; // course _id

        const course = await offlineCourseModel.findById(editId);

        if (!course) {
            return res.status(404).send({ status: 0, msg: 'Course not found' });
        }

        // Check if index is valid
        if (cIndex < 0 || cIndex >= course.coursePoints.length) {
            return res.status(400).send({ status: 0, msg: 'Invalid index' });
        }

        // Remove item at given index
        course.coursePoints.splice(cIndex, 1);

        // Save changes
        await course.save();

        res.send({
            status: 1,
            msg: 'Point deleted successfully',
            updatedPoints: course.coursePoints
        });

    } catch (error) {
        res.status(500).send({ status: 0, msg: 'Server error' });
    }
}



module.exports = {
    addOnlineCourse,
    updateOnlineCourse,
    deleteOnlineCoursePoints,
    addOfflineCourse,
    viewCourseById,
    viewOfflineCourseById,
    updateOfflineCourse,
    deleteLearnPoints,
    deleteOfflineCoursePoints
};
