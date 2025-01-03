import Sample from "../models/Sample.model.js";
import TechManager_Analyst from "../models/TechManager_Analyst.model.js";
import AppError from "../utils/error.utils.js";

const SampleRegister=async(req,res,next)=>{
    try{
        const {Name,Quantity,Storage_Conditions,Registration_Number,Customer_Code,Packing_Type,Date,Treatment_Type,Remarks,Group,Type_Of_Testing,Tests}=req.body;
        
        if(!Name || !Quantity || !Storage_Conditions || !Registration_Number || !Customer_Code || !Packing_Type || !Date || !Treatment_Type || !Remarks || !Group || !Type_Of_Testing || !Tests){
            return next(new AppError('All fields are required',400))
        }
        console.log(Name)
        const sample=await Sample.create({
            Name,
            Quantity,
            Storage_Conditions,
            Registration_Number,
            Customer_Code,
            Packing_Type,
            Date,
            Treatment_Type,
            Remarks,
            Group,
            Type_Of_Testing,
            Tests
        })
        if(!sample){
            return next(new AppError('Sample could not be created please try again',400))
        }
        await sample.save();
        res.status(201).json({
            success:true,
            message:'Sample Registered Successsfully',
            sample,
        })
    }
    catch(e){
        //Related to database condition error
        return next(new AppError(e.message,500))
    }
}

const SampleData=async(req,res,next)=>{
    try{
        const samples=await Sample.find({})
        if(!samples){
            return next(new AppError('Error fetching Sample Data',400))
        }
        
        res.status(201).json({
            success:true,
            message:'All sample Registration Data Fetch Successfully',
            samples,
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}

const SampleEdit=async(req,res,next)=>{
    res.status(201).json({
        success:true,
        message:'Sample edit successfull',
    })
}

const TMDataSave=async(req,res,next)=>{
    try{

        const {TM_Data,Due_Date,Sample_Id,TM_Status}=req.body;
    
        if(!TM_Data || !Due_Date || !Sample_Id || !TM_Status){
            return next(new AppError('All fields are required',400))
        }
        const TM_AN=await TechManager_Analyst.create({
            "Sample_Alloted":Sample_Id,
            "Substances_To_Be_Analysed":TM_Data,
            "TM_Status":TM_Status,
            Due_Date,
        })
        if(!TM_AN){
            return next(new AppError('Technical Manger Data could not be saved, please try again',400))
        }
        TM_AN.save()
        res.status(201).json({
            success:true,
            message:'TM Data Saved Successfully',
            TM_AN,
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}

const TMANData=async(req,res,next)=>{
    try{
        const TM_AN=await TechManager_Analyst.find({})
        if(!TM_AN){
            return next(new AppError('Error fetching Technical Manager Data',400))
        }
        res.status(201).json({
            success:true,
            message:'TM Data Fetched Successfully',
            TM_AN,
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}
export {
    SampleRegister,
    SampleData,
    SampleEdit,
    TMDataSave,
    TMANData
}