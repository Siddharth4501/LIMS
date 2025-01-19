// superset
import {model,Schema} from 'mongoose'

const errorSchema=new Schema(
    {
        Error_Message:{
            type:String,
            required:[true,'Error_Message is required'],
        },
        Type_Of_Testing:{
            type:String,
            required:[true,'Type of Testing name is required'],
        },    
    },
    {
        timestamps:true
    }
);

const Error =model('Error',errorSchema);

export default Error;