// superset
import {model,Schema,mongoose} from 'mongoose'

const errorSchema=new Schema(
    {
        Group:{
            type: mongoose.Schema.Types.ObjectId, ref: "Group"
        }, 
        Group_Name:String,
        Type_Of_Testing:{
            type:String,
            required:[true,'Type of Testing name is required'],
        },    
        Error_Message:{
            type:String,
            required:[true,'Error_Message is required'],
        },
    },
    {
        timestamps:true
    }
);

const Error =model('Error',errorSchema);

export default Error;