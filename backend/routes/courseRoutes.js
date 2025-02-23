const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const {  courses, deleteCourse,createcourse } = require('../controllers/courseController.js');
router.delete('/delete/course', auth, deleteCourse)
router.get('/courses',auth, courses);
router.post('/createcourse',auth ,createcourse)
module.exports = router;
