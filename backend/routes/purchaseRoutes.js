const express=require('express');
const auth=require('../middlewares/auth');
const router=express.Router();
const {purchaseCourse,userPurchases}=require('../controllers/purchaseController');

router.get('/userpurchases', auth,userPurchases);
router.post('/purchasecourse',auth,purchaseCourse);

module.exports=router;