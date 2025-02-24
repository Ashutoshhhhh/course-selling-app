const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// ✅ Load environment variables first
dotenv.config();//dotenv is zero dependency file 

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
const adminRoutes=require('./routes/adminRoutes');
app.use('/admin/api',adminRoutes);


// ✅ Connect to MongoDB with error handling

async function startserver(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongo connected');
        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));

    }
    catch(err){
        console.log(`error in connecting to mongo ${err}`);
        process.exit(1);
    }
}



startserver();

// ✅ Handle Uncaught Exceptions (Prevent Crashes)


// ✅ Start the Server
