// superset
import {model,Schema} from 'mongoose'

const groupSchema=new Schema(
    {
        Group_Name:{
            type:String,
            required:[true,'Group Name is required'],
            trim:true,
        },
        Group_Location_Number:{
            type:Number,
        },
        Type_Of_Testing:{
            type:[String],
            required:[true,'Type Of Testing is required'],
        },
        Tests:[
            
            {
                Type_Of_Testing:{type:String,trim:true,},
                Test:{type:String,trim:true,},
           },
        ],
        
    },
    {
        timestamps:true
    }
);

const Group =model('Group',groupSchema);

export default Group;