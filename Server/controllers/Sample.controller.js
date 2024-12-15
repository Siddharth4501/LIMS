import Sample from "../models/Sample.model.js";
import AppError from "../utils/error.utils.js";

const SampleRegister=async(req,res,next)=>{
    try{
        const {Name,Quantity,Storage_Conditions,Registration_Number,Customer_Code,Packing_Type,Group,Type_Of_Analysis,Test_To_Be_Done}=req.body;
        console.log(Test_To_Be_Done)
        if(!Name || !Quantity || !Storage_Conditions || !Registration_Number || !Customer_Code || !Packing_Type || !Group || !Type_Of_Analysis || !Test_To_Be_Done){
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
            Group,
            Type_Of_Analysis,
            Test_To_Be_Done,

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
        return next(new AppError(e.message,500))
    }
}

const SampleData=async(req,res,next)=>{
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

const SampleEdit=async(req,res,next)=>{
    res.status(201).json({
        success:true,
        message:'Sample edit successfull',
    })
}

export {
    SampleRegister,
    SampleData,
    SampleEdit,
}