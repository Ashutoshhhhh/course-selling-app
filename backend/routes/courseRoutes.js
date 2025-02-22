const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const { userPurchases, courses, coursePurchase } = require('../controllers/courseController.js');
router.get('/userPurchases', auth, userPurchases)
router.post('/Course/Purchase', auth, coursePurchase)
router.get('/courses', courses);
module.exports = router;
