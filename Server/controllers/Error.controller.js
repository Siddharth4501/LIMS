import Error from "../models/Error.model.js";
import AppError from "../utils/error.utils.js";


const ErrorAdd=async(req,res,next)=>{
    try{

        const {GroupID,GroupName,TypeOfTesting,Error_Msg}=req.body;
        if(!GroupID || !GroupName || !TypeOfTesting || !Error_Msg){
            return next(new AppError("All Fields Are Required", 400));
        }
        const foundObj=await Error.findOne({Type_Of_Testing:TypeOfTesting});
        if(foundObj){
            return next(new AppError(`Error For Type Of Testing '${TypeOfTesting}' already exists`,400))
        }
        const error=await Error.create({
            Group:GroupID,
            Group_Name:GroupName,
            Type_Of_Testing:TypeOfTesting,
            Error_Message:Error_Msg,
        })
        if(!error){
            return next(new AppError('Error Could Not Be Added Please Try Again',400))
        }
        await error.save();
        res.status(201).json({
            success: true,
            message: 'Error Added Successfully',
        })
    }catch(e){
        return next(new AppError(e.message,500))
    }
}
const FetchError=async(req,res,next)=>{
    try{
        const error=await Error.find({});
        console.log(error,"cddew")
        if(error.length===0){
            return next(new AppError('Error In Fetching Data or Error List is Empty',400));
        }
        res.status(201).json({
            success: true,
            message: 'Error Fetched Successfully',
            error
        })
    }catch(e){
        return next(new AppError(e.message,500))
    }
}

const DeleteError = async (req, res, next) => {
    try {
        const id=req.params.id;
        console.log("de",id)
        const error = await Error.findById(id)
        if (!error) {
            return next(new AppError('Error Data not found'))
        }
        await Error.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Error Deleted Successfully',
        })
    }
    catch (e) {
        return next(new AppError(e.message, 500))
    }
}


export {
    ErrorAdd,
    FetchError,
    DeleteError,
}