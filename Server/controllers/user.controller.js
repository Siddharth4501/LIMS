import AppError from "../utils/error.utils.js";
import User from "../models/user.model.js";

const cookieOptions={
    maxAge:7*24*60*60*1000,
    httpOnly:true,//client cannot change it
    secure:true,
    
}

const Register=async(req,res,next)=>{
    const {fullName,email,password,roles}=req.body
    if(!fullName || !email || !password || !roles){
        return next(new AppError("All fields are required",400));
    }
    const userExist=await User.findOne({email});
    if(userExist){
        return next(new AppError("User Already Exist",400))
    }
    const Active_Status=true;
    const user=await User.create({
        fullName,
        email,
        password,
        roles,
        Active_Status
    });
    if(!user){
        return next(new AppError('User registration failed,please try again',400));
    }
    await user.save()
    user.password=undefined

    res.status(201).json({
        success:true,
        message:'User registered successfully',
        user,
    })
}


const Login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return next(new AppError("All Fields are required",400))
        }
        const user=await User.findOne({email}).select('+password');
        const isMatch=await user.comparePassword(password)
        if(!user || !isMatch){
            return next(new AppError('Email or Password does not match',400))
        }
        const token=await user.generateJWTToken();
        user.password=undefined

        res.cookie('token',token,cookieOptions);
        res.status(201).json({
            success:true,
            message:'User Successfully Logged In',
            user,
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
    
}

const UserData=async(req,res,next)=>{
    try{
        const users=await User.find({})
        if(!users){
            return next(new AppError('Error fetching Sample Data',400))
        }
        
        res.status(201).json({
            success:true,
            message:'All sample Registration Data Fetch Successfully',
            users,
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}

const Logout=async(req,res)=>{
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:'User Logged out successfully'
    })
};

const changePassword=async(req,res,next)=>{
    const {oldPassword,newPassword} =req.body;
    const {id}=req.user;//all information of user is kept in req.user as created in auth.middleware.js

    if(!oldPassword || ! newPassword){
        return next(new AppError('All fields are mandatory',400))
    }

    const user= await User.findById(id).select('+password')
    if(!user){
        return next(new AppError('User doesn not exist'),400)
    }

    const isPasswordValid=await user.comparePassword(oldPassword);

    if(!isPasswordValid){
        return next(new AppError('invalid old password',400))
    }
    user.password=newPassword
    
    await user.save();
    user.password=undefined;//remove password from user object

    res.status(200).json({
        success:true,
        message:'Password changed successfully!'
    })


}
const DeleteUserData=async(req,res,next)=>{
    try{
        const { userID }=req.body;
        console.log(userID)
        const user=await User.findById(userID)
        if(!user){
            return next(new AppError('Error in deleting user data',400))
        }
        user.Active_Status=false;
        user.save();
        res.status(201).json({
            success:true,
            message:`user ${user.fullName} Deleted Successfully`,
            user
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}

export {
    Login,
    Register,
    Logout,
    UserData,
    changePassword,
    DeleteUserData
}