import {model,Schema} from 'mongoose'

const groupSchema=new Schema(
    {
        Group_Name:{
            type:String,
            required:[true,'Group Name is required'],
            trim:true,
        },

        Type_Of_Testing:{
            type:[String],
            required:[true,'Type is required'],
        },
        Tests:[
            {
                Type_Of_Testing:String,
                Test:String,
           },
        ],
        
    },
    {
        timestamps:true
    }
);

const Group =model('Group',groupSchema);

export default Group;