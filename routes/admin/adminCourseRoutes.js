const express = require('express');
const multer = require('multer');
const path = require('path');
const { addOnlineCourse, addOfflineCourse, viewCourseById, updateOnlineCourse, updateOfflineCourse, viewOfflineCourseById, deleteLearnPoints, deleteOnlineCoursePoints, deleteOfflineCoursePoints } = require('../../controllers/admin/admincourseController');
const { fetchOnlineCategory } = require('../../controllers/admin/adminCategoryController');
const { onlineCourseView, offlineCourseView } = require('../../controllers/website/courseController');

const adminCourseRoute = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Files ko "uploads" folder me save karo
        cb(null, 'uploads/coursesImages');
    },
    filename: function (req, file, cb) {
        // File name me current timestamp + original filename rakhte hain, taaki naam unique rahe
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Extension bhi preserve karlo
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});


const upload = multer({ storage });


adminCourseRoute.post(
    '/add-online',
    upload.fields([
        { name: 'courseImage', maxCount: 1 },
        { name: 'courseBannerImage', maxCount: 1 },
        { name: 'courseHeroImage', maxCount: 1 },
        { name: 'courseStudyMaterials', maxCount: 50 }, // these stay in original format (PDF etc)
    ]),
    addOnlineCourse
);

// OFFLINE COURSE
adminCourseRoute.post(
    '/add-offline',
    upload.fields([
        { name: 'courseImage', maxCount: 1 },
        { name: 'courseBannerImage', maxCount: 1 },
        { name: 'courseHeroImage', maxCount: 1 },
    ]),
    addOfflineCourse
);

adminCourseRoute.get('/view-online', onlineCourseView)
adminCourseRoute.get('/view-offline', offlineCourseView)


adminCourseRoute.post('/add-category', addOnlineCourse)
adminCourseRoute.get('/fetch-category', fetchOnlineCategory)

adminCourseRoute.get('/edit-course/:cId', viewCourseById)
adminCourseRoute.post('/update-course/:cId', upload.fields([
    { name: "courseImage", maxCount: 1 },
    { name: "courseBannerImage", maxCount: 1 },
    { name: "courseHeroImage", maxCount: 1 },
    { name: "courseStudyMaterials", maxCount: 50 },
]), updateOnlineCourse)



adminCourseRoute.get('/edit-course-offline/:cId', viewOfflineCourseById)

adminCourseRoute.post('/update-course-offline/:cId', upload.fields([
    { name: "courseImage", maxCount: 1 },
    { name: "courseBannerImage", maxCount: 1 },
    { name: "courseHeroImage", maxCount: 1 },
]), updateOfflineCourse)


adminCourseRoute.post('/learn-points-delete/:editId', deleteLearnPoints)

adminCourseRoute.post('/delete-online-course-points/:editId', deleteOnlineCoursePoints)
adminCourseRoute.post('/delete-offline-course-points/:editId', deleteOfflineCoursePoints)







module.exports = { adminCourseRoute };
