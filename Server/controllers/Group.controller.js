import Group from "../models/Group.model.js";
import AppError from "../utils/error.utils.js";

const GroupAdd=async(req,res,next)=>{
    const {Group_Name,Type_Of_Testing,Tests}=req.body;
    if(!Group_Name || !Type_Of_Testing || !Tests){
        return next(new AppError('All fields are required',400));
    }
    const group=await Group.create({
        Group_Name,
        Type_Of_Testing,
        Tests
    })
    if(!group){
        return next(new AppError('Group cannot be created'))
    }
    await group.save()
    res.status(200).json({
        success:true,
        message:'Group Added Successfully',
        group,
    })
}

const GroupUpdate=async(req,res,next)=>{
    
    res.status(200).json({
        success:true,
        message:'Group Updated Successfully',
    })
}

const GroupData=async(req,res,next)=>{
    try{
        const group=await Group.find({})
        if(!group){
            return next(new AppError('Group cannot be created'))
        }
        res.status(200).json({
            success:true,
            message:'Group Data fetched Successfully',
            group,
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}

export {
    GroupAdd,
    GroupUpdate,
    GroupData,
}