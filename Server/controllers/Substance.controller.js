import AppError from "../utils/error.utils.js";
import Substance from "../models/Substance.model.js";

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

const SubstanceAdd=async(req,res,next)=>{
    try{
        const {Substance_Name,Method_Of_Analysis,Unit_Of_Measurement}=req.body
        if(!Substance_Name || !Method_Of_Analysis || !Unit_Of_Measurement){
            return next(new AppError('All fiels are required',400))
        }
        const substance=await Substance.create({
            Substance_Name,
            Method_Of_Analysis,
            Unit_Of_Measurement
        })

        if(!substance){
            return(new AppError('Substance could not be created ,please try again',400))
        }
        await substance.save()
        res.status(200).json({
            success:true,
            message:'Substance Data Added Successfully',   
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
    SubstanceAdd,
}