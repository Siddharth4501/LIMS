import Error from "../models/Error.model.js";
import AppError from "../utils/error.utils.js";


const ErrorAdd=async(req,res,next)=>{
    res.status(201).json({
        success: true,
        message: 'Error Added Successfully',
    })
}
const FetchError=async(req,res,next)=>{
    res.status(201).json({
        success: true,
        message: 'Error Fetched Successfully',
    })
}

export {
    ErrorAdd,
    FetchError,
}