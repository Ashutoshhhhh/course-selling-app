const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const PurchaseSchema = new Schema({
    courseId: { type: ObjectId, required: true, ref: "courses" }, // Reference to CourseModel
    userId: { type: ObjectId, required: true, ref: "users" }  // Reference to UserModel
});

// Create & Export the Purchase Model
const PurchaseModel = mongoose.model('purchases', PurchaseSchema);
module.exports = PurchaseModel;
