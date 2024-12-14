import AppError from "../utils/error.utils,js";
import Substance from "../models/Substance.model,js";

const SubstanceData=async(req,res,next)=>{
    try{
        const substance=await Substance.find({})
        if(!substance){
            return next(new AppError('Error fetching data',400))
        }
        res.status(200).json({
            success:true,
            message:'Substance Data Fetched Successfully',
            substance,
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
    
}

const SubstanceEdit=async(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:'Substance Data Edited Successfully',
        
    })
}
export {
    SubstanceData,
    SubstanceEdit,
}