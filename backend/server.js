const express=require('express');
const {z}=require('zod');
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=express();
app.use(express.json());
app.use(cors());
dotenv.config();
const userRoutes=require('./routes/userRoutes');
app.use('/api/users',userRoutes);
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log('Mongo db is connected'))
.catch(err=>console.log(`error in connecting to db ${err}`));
const port=process.env.PORT ||5000;
app.listen(port,()=>console.log(`app listining on port ${port}`));



