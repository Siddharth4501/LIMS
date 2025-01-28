// superset
import {model,Schema} from 'mongoose'

const labSchema=new Schema(
    {
        Lab_Name:{
            type:String,
            required:[true,'Lab_Name is required'],
            trim:true,
        },
        
    },
    {
        timestamps:true
    }
);

const Lab =model('Lab',labSchema);

export default Lab;