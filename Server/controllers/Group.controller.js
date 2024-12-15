import AppError from "../utils/error.utils.js";

const GroupAdd=async(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:'Group Added Successfully',
    })
}

const GroupUpdate=async(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:'Group Updated Successfully',
    })
}

const GroupData=async(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:'Group Data fetched Successfully',
    })
}

export {
    GroupAdd,
    GroupUpdate,
    GroupData,
}