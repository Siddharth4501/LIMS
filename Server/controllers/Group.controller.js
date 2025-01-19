import Group from "../models/Group.model.js";
import AppError from "../utils/error.utils.js";

const GroupAdd=async(req,res,next)=>{
    const {Group_Names,Type_Of_Testing,Tests}=req.body;
    if(Group_Names.length>0 && Type_Of_Testing.length==0 && Tests.length===0){
        for (const element of Group_Names) {
            let Grp_Name=element.Group_Name;
            const foundGroup=await Group.findOne({ Group_Name: Grp_Name });//returns an object
            console.log("find", foundGroup, element.Group_Name)
            if (foundGroup) {
                return next(new AppError(`Group "${element.Group_Name}" already exists`, 400));
            }
        }
        for (const element of Group_Names) {
            let Grp_GLN=element.Group_Location_Number;
            const foundGroup=await Group.findOne({ Group_Location_Number:Grp_GLN });//returns an object
            console.log("find", foundGroup, element.Group_Location_Number)
            if (foundGroup) {
                return next(new AppError(`Group with Group Location Number "${element.Group_Location_Number}" already exists`, 400));
            }
        }
        for(const element of Group_Names){
            const group = await Group.create({
                Group_Name:element.Group_Name,
                Group_Location_Number:element.Group_Location_Number,
                Type_Of_Testing,
                Tests
            })
            if (!group) {
                return next(new AppError('Group cannot be created', 400))
            }
            await group.save()
            
        }
        res.status(200).json({
            success: true,
            message: `Group Added Successfully`,
        })
    }
};


const GroupUpdate = async (req, res, next) => {
    const { Group_Name, GroupID, TypeOfTesting,Tests } = req.body;
    if (Tests.length === 0) {
        console.log(Group_Name, GroupID, TypeOfTesting,"testtype")
        if (!Group_Name || !GroupID || !TypeOfTesting) {
            return next(new AppError('All fields are required', 400))
        }
        const group = await Group.findById(GroupID);
        if (!group) {
            return next(new AppError('Group not found', 400))
        }
        // group.Type_Of_Testing?.push(TypeOfTesting);
        if (group.Type_Of_Testing.length === 0) {
            group.Type_Of_Testing = TypeOfTesting;
            group.save();
            res.status(200).json({
               success: true,
               message: 'Type Of Testing Updated Successfully',
           })
        }
        else {
            for (const element of TypeOfTesting) {
                const exists = group.Type_Of_Testing.includes(element);
                if (exists) {
                    return next(new AppError(`Type Of Testing "${element}" already exists`, 400));
                }
            }
            // If no duplicates were found, add all elements to the array
            group.Type_Of_Testing.push(...TypeOfTesting);
            group.save();
            res.status(200).json({
               success: true,
               message: 'Type Of Testing Updated Successfully',
           })
        }
    }
    else {
        console.log(Group_Name, GroupID, TypeOfTesting,Tests,"test12")
        const group = await Group.findById(GroupID);
        if (!group) {
            return next(new AppError('Group not found', 400))
        }
        if (group.Tests.length===0) {
            group.Tests=Tests;
            group.save();
            res.status(200).json({
                success: true,
                message: 'Tests Updated Successfully',
            })
        }
        else{
            //The variable find returns the object which matches the specific condition and the function some returns true or false 
            const find = group.Tests.find((item) => {
                return Tests.some((data) => {
                    return data.Type_Of_Testing === item.Type_Of_Testing && data.Test === item.Test;
                });
            });
            
            if (find) {
                console.log("ert",find)
                return next(new AppError(`Test "${find.Test}" Already Exist`, 400));
            } 
            else {
                console.log("ert2",find)
                group.Tests.push(...Tests);
            }
            
            await group.save();
            res.status(200).json({
                success: true,
                message: 'Tests Updated Successfully',
            });        
    }
    }
}

const GroupData = async (req, res, next) => {
    try {
        const group = await Group.find({})
        if (!group) {
            return next(new AppError('Group cannot be created'))
        }
        res.status(200).json({
            success: true,
            message: 'Group Data fetched Successfully',
            group,
        })
    }
    catch (e) {
        return next(new AppError(e.message, 500))
    }
}

export {
    GroupAdd,
    GroupUpdate,
    GroupData,
}