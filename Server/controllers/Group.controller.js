import Group from "../models/Group.model.js";
import AppError from "../utils/error.utils.js";

const GroupAdd=async(req,res,next)=>{
    const {Group_Names,Type_Of_Testing,Tests}=req.body;
    if(Group_Names.length>0 && Type_Of_Testing.length==0 && Tests.length===0){
        for (const Group_Name of Group_Names) {
            const foundGroup=await Group.find({Group_Name});
            console.log("find", foundGroup, Group_Name)
            if (foundGroup.length>0) {
                return next(new AppError(`Group "${Group_Name}" already exists`, 400));
            }
        }
        for(const Group_Name of Group_Names){
            const group = await Group.create({
                Group_Name,
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
        // else {
        //     for (const element of TypeOfTesting) {
        //         const find = group.Type_Of_Testing.some((item) => item === element)
        //         console.log("find", find, element)
        //         if (find) {
        //             return next(new AppError(`Type Of Testing "${element}" already exists`, 400));
        //         }
        //         else {
        //             group.Type_Of_Testing.push(element);
        //         }
        //     };
        // }
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
            const find = group.Tests.find((item) => {
                return Tests.some((data) => {
                    return data.Type_Of_Testing === item.Type_Of_Testing && data.Test === item.Test;
                });
            });
            
            if (find) {
                console.log("ert")
                return next(new AppError(`Test "${find.Test}" Already Exist`, 400));
            } 
            else {
                console.log("ert2")
                // Add only the non-duplicate elements from Tests to group.Tests
                const filteredTests = Tests.filter((data) => {
                    return !group.Tests.some((item) => {
                        return data.Type_Of_Testing === item.Type_Of_Testing && data.Test === item.Test;
                    });
                });
            
                // Push only the unique entries into group.Tests
                group.Tests.push(...filteredTests);
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