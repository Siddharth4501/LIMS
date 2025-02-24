import AppError from "../utils/error.utils.js";
import User from "../models/user.model.js";

const cookieOptions={
    maxAge:7*24*60*60*1000,
    httpOnly:true,//client cannot change it
    secure:true,
    
}

const Register=async(req,res,next)=>{
    try{
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

    }catch(e){
        return next(new AppError(e.message,500))
    }
}

const AdminRegister=async(req,res,next)=>{
    try{
        const {fullName,email,password,verificationPassword}=req.body;
        console.log(fullName,email,password,verificationPassword);
        if(!fullName || !email || !password || !verificationPassword){
            return next(new AppError("All fields are required",400));
        }
        const userExist=await User.findOne({Admin:true});
        if(userExist){
            return next(new AppError("Admin Already Exist",400))
        }
        const Active_Status=true;
        const roles=[
            {
                designation:'Admin',
                Assigned_Group:['None'],
                Reporting_To:'None'
            }
        ]
        const user=await User.create({
            fullName,
            email,
            password,
            roles,
            Active_Status,
            VerificationPassword:verificationPassword,
            Admin:true
        });
        if(!user){
            return next(new AppError('Admin registration failed,please try again',400));
        }
        await user.save()
        user.password=undefined
    
        res.status(201).json({
            success:true,
            message:'Admin Registered successfully',
            user,
        })

    }catch(e){
        return next(new AppError(e.message,500))
    }
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
        if(user.Active_Status===false){
            return next(new AppError("Either User Has Been Deleted Or User Deosn't Exist",400))
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
            return next(new AppError('Error fetching User Data',400))
        }
        
        res.status(201).json({
            success:true,
            message:'User Data Fetched Successfully',
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
    try{
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

    }catch(e){
        return next(new AppError(e.message,500))
    }
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
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}

const DeleteUserRole=async(req,res,next)=>{
    try{
        const { userID,role }=req.body;
        console.log(userID)
        const user=await User.findById(userID)
        if(!user){
            return next(new AppError('Error in deleting user role',400))
        }
        user.roles=user.roles.filter((item)=>item.designation!==role);
        user.save();
        res.status(201).json({
            success:true,
            message:`Role ${role} Deleted Successfully for User ${user.fullName}`,
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}

const UpdateUser = async (req, res, next) => {
    try{

        // Destructuring the necessary data from the req object
        const { roles,fullName,email,userID } = req.body;
      
        const user = await User.findById(userID);
      
        if (!user) {
          return next(new AppError('Invalid user id or user does not exist'));
        }
      
        if (fullName) {
          user.fullName = fullName;
        }
      
        if (email) {
            user.email = email;
        }
        if (roles.length>0) {
            user.roles = roles;
        }
    
        // Save the user object
        await user.save();
      
        res.status(200).json({
          success: true,
          message: 'User details updated successfully',
        });
    }catch(e){
        return next(new AppError(e.message,500))
    }
  }

const resetPassword=async(req,res,next)=>{
    try{
        // Extracting password from req.body object
        const { password,userId } = req.body;
        // Check if password is not there then send response saying password is required
        if (!password) {
            return next(new AppError('Password is required', 400));
        }
        
        // Checking if token matches in DB and if it is still valid(Not expired)
        const user = await User.findById(userId);
        
        // If not found or expired send the response
        if (!user) {
            return next(
            new AppError('Unable To Reset Password, please try again', 400)
            );
        }
        
        // Update the password if token is valid and not expired
        user.password = password;
        
        // Saving the updated user values
        await user.save();
        
        // Sending the response when everything goes good
        res.status(200).json({
            success: true,
            message: `Password changed successfully for user ${user.fullName}`,
        });
    }catch(e){
        return next(new AppError(e.message,500))
    }
}

export {
    Login,
    Register,
    Logout,
    UserData,
    UpdateUser,
    changePassword,
    DeleteUserData,
    DeleteUserRole,
    resetPassword,
    AdminRegister,
}