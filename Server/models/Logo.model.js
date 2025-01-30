// superset
import {model,Schema} from 'mongoose'

const logoSchema=new Schema(
    {
        imageUrl:{
            type:String,
            required:[true,'Logo is required'],
            trim:true,
        },
        
    },
    {
        timestamps:true
    }
);

const Logo =model('Logo',logoSchema);

export default Logo;