import AppError from "../utils/error.utils.js";
import Substance from "../models/Substance.model.js";

const SubstanceData=async(req,res,next)=>{
    try{
        const substance=await Substance.find({})//returns array
        if(substance.length===0){
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

const SubstanceAdd = async (req, res, next) => {
    try {
        const { Substance_Data, GroupID } = req.body;

        if (!Substance_Data || !Substance_Data.length || !GroupID) {
            return next(new AppError('All fields are required', 400));
        }

        // Collect all duplicate methods/units before saving
        const duplicateEntries = [];

        for (const substance of Substance_Data) {
            const { Test_Name, Test_ID, methodSection } = substance;

            // Validate fields
            if (!Test_Name || !Test_ID || !methodSection || !methodSection.length) {
                return next(new AppError('Invalid data in request', 400));
            }

            // Check for duplicates for each method/unit in the methodSection
            for (const method of methodSection) {
                const existingSubstance = await Substance.findOne({
                    "Test.TestID": Test_ID,
                    GroupID: GroupID,
                    MethodUnitList: {
                        $elemMatch: { Method: method.Method, Unit: method.Unit },
                    },
                });

                if (existingSubstance) {
                    // Collect duplicate information
                    duplicateEntries.push({ Method: method.Method, Unit: method.Unit });
                }
            }
        }

        // If any duplicates are found, return an error and stop the process
        if (duplicateEntries.length > 0) {
            return next(
                new AppError(
                    `Duplicate entries found for the following Method-Unit pairs: ${duplicateEntries
                        .map((entry) => `(${entry.Method}, ${entry.Unit})`)
                        .join(', ')}. Please remove duplicates and try again.`,
                    400
                )
            );
        }

        // If no duplicates, save all substances
        for (const substance of Substance_Data) {
            const obj = {
                Test_Name: substance.Test_Name,
                TestID: substance.Test_ID,
            };

            const substanceInstance = await Substance.create({
                Test: obj,
                GroupID,
                MethodUnitList: substance.methodSection,
            });

            if (!substanceInstance) {
                return next(new AppError('Substance could not be created, please try again', 400));
            }

            await substanceInstance.save();
        }

        // Success response
        res.status(200).json({
            success: true,
            message: 'Substance Data Added Successfully',
        });
    } catch (error) {
        console.error('Error in SubstanceAdd:', error.message);
        return next(new AppError(error.message, 500));
    }
};


const SubstanceEdit=async(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:'Substance Data Edited Successfully',
        
    })
}

const SubstanceDelete = async (req, res, next) => {
    try {
        const{methodID,Method,Unit,Limit}=req.body;
        const substance = await Substance.findById(methodID)
        if (!substance) {
            return next(new AppError('Substance not found'))
        }
        substance.MethodUnitList=substance.MethodUnitList.filter((item) => {
            return !(item?.Method===Method && item?.Unit===Unit && item?.Limit===Limit)
        });
        await substance.save();
        res.status(200).json({
            success: true,
            message: 'Substance Deleted Successfully',
        })
    }
    catch (e) {
        return next(new AppError(e.message, 500))
    }
}

export {
    SubstanceData,
    SubstanceEdit,
    SubstanceAdd,
    SubstanceDelete
}