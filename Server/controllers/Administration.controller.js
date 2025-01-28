import Lab from "../models/NameOfLab.model.js";
import AppError from "../utils/error.utils.js";


const SaveLabName=async(req,res,next)=>{
    const {Lab_Name}=req.body;
    if(!Lab_Name){
        return next(new AppError('Lab Name Cannot be Added', 400))
    }
    await Lab.deleteMany({});
    const labName =await Lab.create({
        Lab_Name,
    })     
      
    if(!labName){
        return next(new AppError('Lab Name Cannot be Added', 400))
    }
    await labName.save();
    res.status(200).json({
        success: true,
        message: `Name OF Lab Saved Successfully`,
    })
}
const LabNameData=async(req,res,next)=>{
    try{
        const labName =await Lab.find({})
        if(!labName){
            return next(new AppError('Lab Name Data Cannot Be Fetched', 400))
        }
        res.status(200).json({
            success: true,
            message: `Name OF Lab Saved Successfully`,
            labName
        })
    }
    catch (e) {
        return next(new AppError(e.message, 500))
    } 
}

export {
    SaveLabName,
    LabNameData,
}