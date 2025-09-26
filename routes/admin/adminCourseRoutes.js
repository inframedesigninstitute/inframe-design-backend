const express = require('express');
const multer = require('multer');
const path = require('path');
const { addOnlineCourse, addOfflineCourse } = require('../../controllers/admin/admincourseController');
const { fetchOnlineCategory } = require('../../controllers/admin/adminCategoryController');

const courseRoute = express.Router();

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


courseRoute.post(
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
courseRoute.post(
    '/add-offline',
    upload.fields([
        { name: 'courseImage', maxCount: 1 },
        { name: 'courseBannerImage', maxCount: 1 },
        { name: 'courseHeroImage', maxCount: 1 },
    ]),
    addOfflineCourse
);


courseRoute.post('/add-category', addOnlineCourse)
courseRoute.get('/fetch-category', fetchOnlineCategory)


module.exports = { courseRoute };
