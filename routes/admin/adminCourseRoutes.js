const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const { addOnlineCourse, addOfflineCourse } = require('../../controllers/admin/admincourseController');
const { addCategory, fetchCategory } = require('../../controllers/website/courseController');

const courseRoute = express.Router();

// Memory storage since we will process with Sharp before saving
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to convert and save images as webp
const convertAndSaveImage = async (file, folderPath) => {
    const fileName = `${Date.now()}-${file.originalname.split('.')[0]}.webp`;
    const filePath = path.join(folderPath, fileName);

    await sharp(file.buffer)
        .webp({ quality: 80 })
        .toFile(filePath);

    return {
        originalname: file.originalname,
        filename: fileName,
        path: filePath,
        mimetype: 'image/webp',
        size: file.size,
    };
};

// Middleware to handle webp conversion
const handleImageConversion = async (req, res, next) => {
    try {
        const imageFields = ['courseImage', 'courseBannerImage', 'courseHeroImage'];
        const folderPath = path.join(__dirname, '../../uploads/coursesImages');

        if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

        for (const field of imageFields) {
            if (req.files && req.files[field]) {
                const image = await convertAndSaveImage(req.files[field][0], folderPath);
                req.body[field] = image; // Replace file info in body
            }
        }

        next();
    } catch (err) {
        console.error('Image conversion failed:', err);
        res.status(500).json({ status: 0, msg: 'Image processing failed', error: err });
    }
};

// ===== ROUTES =====

// ONLINE COURSE
courseRoute.post(
    '/add-online',
    upload.fields([
        { name: 'courseImage', maxCount: 1 },
        { name: 'courseBannerImage', maxCount: 1 },
        { name: 'courseHeroImage', maxCount: 1 },
        { name: 'courseStudyMaterials', maxCount: 50 }, // these stay in original format (PDF etc)
    ]),
    handleImageConversion,
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
    handleImageConversion,
    addOfflineCourse
);


courseRoute.post('/add-category', addCategory)
courseRoute.get('/fetch-category', fetchCategory)


module.exports = { courseRoute };
