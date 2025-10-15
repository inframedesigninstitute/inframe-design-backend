const { cloudinary } = require("../../configs/cloudinaryConfig");
const { offlineCourseModel } = require("../../models/offlineCourseModel");
const { onlineCourseModel } = require("../../models/onlineCourseModel");




const streamifier = require('streamifier');
const uploadToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};

const addOnlineCourse = async (req, res) => {
    let allData = { ...req.body };
    const { courseName } = req.body;

    try {
        if (req.files && req.files.courseImage) {
            const uploadRes = await uploadToCloudinary(req.files.courseImage[0].buffer, 'courses/courseImage');
            allData.courseImage = uploadRes.secure_url;
        }

        if (req.files && req.files.courseBannerImage) {
            const uploadRes = await uploadToCloudinary(req.files.courseBannerImage[0].buffer, 'courses/courseBannerImage');
            allData.courseBannerImage = uploadRes.secure_url;
        }

        if (req.files && req.files.courseHeroImage) {
            const uploadRes = await uploadToCloudinary(req.files.courseHeroImage[0].buffer, 'courses/courseHeroImage');
            allData.courseHeroImage = uploadRes.secure_url;
        }

        if (req.files && req.files.courseStudyMaterials) {
            const uploadResults = await Promise.all(
                req.files.courseStudyMaterials.map(file =>
                    uploadToCloudinary(file.buffer, 'courses/courseStudyMaterials')
                )
            );
            allData.courseStudyMaterials = uploadResults.map(res => res.secure_url);
        }

        // Check if course already exists
        const courseCheckInDb = await onlineCourseModel.findOne({ courseName });

        if (!courseCheckInDb) {
            const data = new onlineCourseModel(allData);
            const dataRes = await data.save();
            res.send({
                status: 1,
                msg: "Online course added successfully",
                dataRes,
            });
        } else {
            res.send({
                status: 2,
                msg: "Course Already Exist!",
            });
        }
    } catch (err) {
        console.error(err);
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
        // Upload courseImage
        if (req.files?.courseImage?.[0]) {
            const result = await uploadToCloudinary(req.files.courseImage[0].buffer, 'courses/courseImage');
            allData.courseImage = result.secure_url;
        }

        // Upload courseBannerImage
        if (req.files?.courseBannerImage?.[0]) {
            const result = await uploadToCloudinary(req.files.courseBannerImage[0].buffer, 'courses/courseBannerImage');
            allData.courseBannerImage = result.secure_url;
        }

        // Upload courseHeroImage
        if (req.files?.courseHeroImage?.[0]) {
            const result = await uploadToCloudinary(req.files.courseHeroImage[0].buffer, 'courses/courseHeroImage');
            allData.courseHeroImage = result.secure_url;
        }

        // Upload courseStudyMaterials (multiple)
        if (req.files?.courseStudyMaterials?.length > 0) {
            const uploadResults = await Promise.all(
                req.files.courseStudyMaterials.map(file =>
                    uploadToCloudinary(file.buffer, 'courses/courseStudyMaterials')
                )
            );
            allData.courseStudyMaterials = uploadResults.map(res => res.secure_url);
        }

        // Update course in DB
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
        console.error('Update Course Error:', err);
        res.status(500).send({
            status: 0,
            msg: "Something went wrong",
            err,
        });
    }
};




const addOfflineCourse = async (req, res) => {
    let allData = { ...req.body };
    let { courseName } = req.body;

    try {
        // courseImage Cloudinary me upload karo agar file hai
        if (req.files && req.files.courseImage) {
            const uploadRes = await cloudinary.uploader.upload(req.files.courseImage[0].path, {
                folder: 'courses/offline/courseImage',
            });
            allData.courseImage = uploadRes.secure_url;
        }

        // courseBannerImage Cloudinary me upload karo agar file hai
        if (req.files && req.files.courseBannerImage) {
            const uploadRes = await cloudinary.uploader.upload(req.files.courseBannerImage[0].path, {
                folder: 'courses/offline/courseBannerImage',
            });
            allData.courseBannerImage = uploadRes.secure_url;
        }

        // courseHeroImage Cloudinary me upload karo agar file hai
        if (req.files && req.files.courseHeroImage) {
            const uploadRes = await cloudinary.uploader.upload(req.files.courseHeroImage[0].path, {
                folder: 'courses/offline/courseHeroImage',
            });
            allData.courseHeroImage = uploadRes.secure_url;
        }

        // DB me course check karo ki already exist karta hai ya nahi
        const courseCheckInDb = await offlineCourseModel.findOne({ courseName });

        if (!courseCheckInDb) {
            const data = new offlineCourseModel(allData);
            const dataRes = await data.save();
            res.send({
                status: 1,
                msg: "Offline course added successfully",
                dataRes,
            });
        } else {
            res.send({
                status: 2,
                msg: "Course Already Exist !",
            });
        }
    } catch (err) {
        console.error(err);
        res.send({
            status: 0,
            msg: "something went wrong",
            err,
        });
    }
};






const updateOfflineCourse = async (req, res) => {
    const { cId } = req.params;
    let allData = { ...req.body };

    try {
        // Agar courseImage upload hua hai to Cloudinary me upload karo
        if (req.files?.courseImage?.[0]) {
            const result = await uploadToCloudinary(req.files.courseImage[0].buffer, 'courses/offlineCourseImage');
            allData.courseImage = result.secure_url;
        }

        // Agar courseBannerImage upload hua hai to Cloudinary me upload karo
        if (req.files?.courseBannerImage?.[0]) {
            const result = await uploadToCloudinary(req.files.courseBannerImage[0].buffer, 'courses/offlineCourseBannerImage');
            allData.courseBannerImage = result.secure_url;
        }

        // Agar courseHeroImage upload hua hai to Cloudinary me upload karo
        if (req.files?.courseHeroImage?.[0]) {
            const result = await uploadToCloudinary(req.files.courseHeroImage[0].buffer, 'courses/offlineCourseHeroImage');
            allData.courseHeroImage = result.secure_url;
        }

        // DB me offline course update karo
        const updateRes = await offlineCourseModel.updateOne(
            { _id: cId },
            { $set: allData }
        );

        res.send({
            status: 1,
            msg: "Offline course updated successfully",
            updateRes,
        });

    } catch (err) {
        console.error('Update Offline Course Error:', err);
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
