import Sample from "../models/Sample.model.js";
import TechManager_Analyst from "../models/TechManager_Analyst.model.js";
import AppError from "../utils/error.utils.js";

const SampleRegister=async(req,res,next)=>{
    try{
        const {Name,Quantity,Storage_Conditions,Customer_Code,Packing_Type,Date,Mfg_Date,Treatment_Type,Nature_Of_Sample,Issued_To,Remarks,Group,Type_Of_Testing,Tests,ID}=req.body;
        
        if(!Name || !Quantity || !Storage_Conditions || !Customer_Code || !Packing_Type || !Date || !Mfg_Date || !Nature_Of_Sample || !Issued_To || !Remarks || !Group || Type_Of_Testing.length==0 || Tests.length==0 ||  !ID){
            return next(new AppError('All fields are required',400))
        }
        const registrationNumber = await Sample.generateRegistrationNumber();
        const Found=await Sample.find({registrationNumber});
        console.log(Found,"alal")
        if(Found.length>0){
            return next(new AppError('Sample with this Registration Number already exists',400))
        }
        const sample=await Sample.create({
            Name,
            Quantity,
            Storage_Conditions,
            Registration_Number:registrationNumber,
            Customer_Code,
            Packing_Type,
            Date,
            Mfg_Date,
            Treatment_Type,
            Nature_Of_Sample,
            Issued_To,
            Remarks,
            Group,
            Type_Of_Testing,
            Tests,
            Registered_By:ID,
            Sample_Status:"Forwarded To TM",
            Active:true
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

const DeleteSampleData=async(req,res,next)=>{
    try{
        const { sampleID }=req.body;
        console.log(sampleID)
        const sample=await Sample.findById(sampleID)
        if(!sample){
            return next(new AppError('Error in deleting Sample data',400))
        }
        sample.Active=false;
        await sample.save();
        res.status(201).json({
            success:true,
            message:`Sample ${sample.Name} Deleted Successfully`,
            sample,
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}

const SampleEdit=async(req,res,next)=>{
    const {ID,TMANID,Status}=req.body;
    console.log(ID,TMANID,Status);
    const sample=await Sample.findById(ID)
    if(!sample){
        return next(new AppError('Error Upating Sample',400))
    }
    console.log()
    if(TMANID){
        const TMANData=await TechManager_Analyst.findById(TMANID);
        if(!TMANData){
            return next(new AppError("Can't Update Registered Sample Status",400))
        }
        if(Status==='Pending For Approval At TM'){
            const reqStatusFoundForPending=TMANData.AN_Status.some((data)=>data.Status==='Pending For Approval At TM');
            console.log("reqStatusFoundForPending",reqStatusFoundForPending);
            if(reqStatusFoundForPending){
                sample.Sample_Status=Status;
                await sample.save();
        }}
        else if(Status==="Approved By TM"){
            const reqStatusFoundForApproval=TMANData.AN_Status.every((data)=>data.Status==='Approved By TM');
            console.log("reqStatusFoundForApproval",reqStatusFoundForApproval);
            if(reqStatusFoundForApproval){
                sample.Sample_Status=Status;
                await sample.save();
        }
        }
    }
    else{
        sample.Sample_Status=Status;
        await sample.save();
    }
    res.status(201).json({
        success:true,
        message:'Sample edited successfully',
    })
}

const TMDataSave=async(req,res,next)=>{
    try{ 
        const {TM_Data,Due_Date,Sample_Id,TM_Status}=req.body;
        if(!TM_Data || !Due_Date || !Sample_Id || !TM_Status){
            return next(new AppError('All fields are required',400))
        }
        const AN_Status=[]
        Object.keys(TM_Data).map((key)=>{
            console.log("kop")
            TM_Data[key].Tests.map((item)=>{
                AN_Status.find((obj)=>obj.Analyst.ID=== item.Analyst.ID) || 
                AN_Status.push({
                    Analyst: {
                        Name:item.Analyst.Name,
                        ID:item.Analyst.ID
                        } ,
                    Status:"Pending At Analyst" ,
                    });
                
            })
        })
        
        const TM_AN=await TechManager_Analyst.create({
            "Sample_Alloted":Sample_Id,
            "Substances_To_Be_Analysed":TM_Data,
            "TM_Status":TM_Status,
            "AN_Status":AN_Status,
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

const TMANDataUpdate=async(req,res,next)=>{
    try{
        const {TMANID,Substances_To_Be_Analysed,currentUserID,TM_Status,clickedAnalystID,NABL_Related_Substances_To_Be_Analysed,NABL_Page}=req.body;
        if(TM_Status==='Pending For Approval At TM'){
            console.log(TMANID,Substances_To_Be_Analysed,TM_Status,"bale");
            const TMANData=await TechManager_Analyst.findById(TMANID)
            console.log(TMANData,"shava")
            TMANData.Substances_To_Be_Analysed = Substances_To_Be_Analysed;
            TMANData.AN_Status.forEach((data) => {
                if (data.Analyst.ID.toString() === currentUserID) {
                  data.Status = "Pending For Approval At TM";
                }
            });
            TMANData.TM_Status = TM_Status;
            TMANData.save();
            res.status(201).json({
                success:true,
                message:'TMAN Data Updated Successfully',
            })
        }
        else if(TM_Status==='Approved By TM'){
            console.log(TMANID,Substances_To_Be_Analysed,TM_Status,"bale");
            const TMANData=await TechManager_Analyst.findById(TMANID)
            console.log(TMANData,"shava")
            TMANData.Substances_To_Be_Analysed = Substances_To_Be_Analysed;
            TMANData.AN_Status.forEach((data) => {
                if (data.Analyst.ID.toString() === clickedAnalystID) {
                  data.Status = "Approved By TM";
                }
            });
            // Check if all elements in AN_Status have Status = "Pending For Approval At TM"
            const allPendingForApproval = TMANData.AN_Status.every(
                (data) => data.Status === "Approved By TM"
            );
        
            // Here Update TM_Status if condition is met
            if (allPendingForApproval) {
                TMANData.TM_Status = "Approved By TM";
            }
            TMANData.save();
            res.status(201).json({
                success:true,
                message:'TMAN Data Updated Successfully',
            })
        }
        else if(TM_Status==='Rejected By TM'){
            console.log(TMANID,Substances_To_Be_Analysed,TM_Status,"bale");
            const TMANData=await TechManager_Analyst.findById(TMANID)
            console.log(TMANData,"shava")
            TMANData.Substances_To_Be_Analysed = Substances_To_Be_Analysed;
            TMANData.AN_Status.forEach((data) => {
                if (data.Analyst.ID.toString() === clickedAnalystID) {
                  data.Status = "Pending At Analyst";
                }
            });
            // Check if all elements in AN_Status have Status = "Pending For Approval At TM"
            const allPendingForApproval = TMANData.AN_Status.every(
                (data) => data.Status === "Pending At Analyst"
            );
        
            // Here Update TM_Status if condition is met
            if (allPendingForApproval) {
                TMANData.TM_Status = "Pending At Analyst";
            }
            TMANData.save();
            res.status(201).json({
                success:true,
                message:'TMAN Data Updated Successfully',
            })
        }
        else if(NABL_Page){
            console.log(TMANID,NABL_Related_Substances_To_Be_Analysed,NABL_Page,"bale");
            const TMANData=await TechManager_Analyst.findById(TMANID)
            console.log(TMANData,"shava")
            TMANData.Substances_To_Be_Analysed = NABL_Related_Substances_To_Be_Analysed;
            await TMANData.save();
            res.status(201).json({
                success:true,
                message:'Report Generation Successful',
            })
        }
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
    TMANData,
    TMANDataUpdate,
    DeleteSampleData
}