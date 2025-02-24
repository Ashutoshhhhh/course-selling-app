const jwt = require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET_ADMIN;
async function authAdmin(req,res,next) {
    const authorizationToken=req.headers.authorization;
    if(!authorizationToken || ! authorizationToken.startsWith('Bearer ')){
        return res.status(400).json({message:'The token you send is invalid'});
    }
    const token=authorizationToken.split(" ")[1];
    try{
        const decoded=await jwt.verify(token,JWT_SECRET);
        req.userId=decoded.id;
        next();
    }
    catch(err){
       return res.status(401).json({messge:`There was an error validating the token ${err}`});

    }
    
}
module.exports=authAdmin;