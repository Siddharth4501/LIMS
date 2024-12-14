import {model,Schema} from 'mongoose'

const substanceSchema=new Schema(
    {
        Substance_Name:{
            type:String,
            required:[true,'Substance Name is required'],
            trim:true,
        },

        Method_Of_Analysis:{
            type:String,
            required:[true,'Method is required'],
            trim:true,
        },
        Unit_Of_Measurement:{
            type:String,
            required:[true,'Unit Of Measurement is required']
        },  
        
    },
    {
        timestamps:true
    }
);

const Substance =model('Substance',substanceSchema);

export default Substance;