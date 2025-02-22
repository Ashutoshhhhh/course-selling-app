const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// ✅ Load environment variables first
dotenv.config();

// ✅ Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
    console.error("❌ Error: MONGO_URI is not defined in .env file!");
    process.exit(1); // Stop the server
}

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Import Routes
const userRoutes = require('./routes/userRoutes');
app.use('/user/api', userRoutes);
const courseRoutes=require('./routes/courseRoutes');
app.use('/course/api',courseRoutes);
const adminRoutes=require('./routes/adminRoutes');
app.use('/admin/api',adminRoutes);

// ✅ Connect to MongoDB with error handling
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
        console.error(`❌ MongoDB Connection Error: ${err.message}`);
        process.exit(1);
    });

// ✅ Handle Uncaught Exceptions (Prevent Crashes)
process.on("uncaughtException", (err) => {
    console.error(`❌ Uncaught Exception: ${err.message}`);
    process.exit(1);
});

// ✅ Start the Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
