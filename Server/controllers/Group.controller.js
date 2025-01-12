import Group from "../models/Group.model.js";
import AppError from "../utils/error.utils.js";

const GroupAdd=async(req,res,next)=>{
    const {Group_Name,Type_Of_Testing,Tests}=req.body;
    if(Group_Name && !Type_Of_Testing && !Tests){
        const foundGroup=await Group.find({Group_Name});
        if(foundGroup.length>0){
            return next(new AppError('Group already exists',400))
        }
        const group=await Group.create({
            Group_Name,
            Type_Of_Testing,
            Tests
        })
        if(!group){
            return next(new AppError('Group cannot be created',400))
        }
        await group.save()
        res.status(200).json({
            success:true,
            message:'Group Added Successfully',
            group,
        })
    }
}

const GroupUpdate=async(req,res,next)=>{
    const {Group_Name,GroupID,TypeOfTesting}=req.body;
    console.log(Group_Name,GroupID,TypeOfTesting)
    if(!Group_Name || !GroupID || !TypeOfTesting){
        return next(new AppError('All fields are required',400))
    }
    const group=await Group.findById(GroupID);
    if(!group){
        return next(new AppError('Group not found',400))
    }
    group.Type_Of_Testing?.push(TypeOfTesting);
    group.save();
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