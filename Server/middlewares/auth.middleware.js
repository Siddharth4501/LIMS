import jwt from 'jsonwebtoken'
import AppError from '../utils/error.utils.js';
import User from '../models/user.model.js';

const isLoggedIn=async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return next(new AppError('Unautheticated,please login again',400))
    }

    const userDetails=await jwt.verify(token,process.env.JWT_SECRET);//gives data that was stored at the time of generation of Json Web Token
    if(!userDetails){
        return next(new AppError('Token can not be verified',400))
    }
    console.log("chdbak")
    req.user=userDetails;
    console.log("kd",req.user)
    next();
}

const authorizedRoles=(...roles)=>(req,res,next)=>{
    const currentUserRole=req.user.role;
    if(!roles.includes(currentUserRole)){
        return next(new AppError('You do not have permission to access this route',403))
    }
    next();
}
export {
    isLoggedIn,
    authorizedRoles,
    
}