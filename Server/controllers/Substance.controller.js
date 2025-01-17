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
        const {Substance_Data,GroupID}=req.body
        if(!Substance_Data.length || !GroupID){
            return next(new AppError('All fiels are required',400))
        }
        Substance_Data.map(async(substance)=>{
            let obj={
                Test_Name:'',
                TestID:''
            }
            obj.Test_Name=substance.Test_Name;
            obj.TestID=substance.Test_ID
            const substanceInstance=await Substance.create({
                Test:obj,
                GroupID,
                MethodUnitList:substance.methodSection
            })
    
            if(!substanceInstance){
                return(new AppError('Substance could not be created ,please try again',400))
            }
            await substanceInstance.save()
            
            
        })
        res.status(200).json({
            success:true,
            message:'Substance Data Added Successfully',   
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