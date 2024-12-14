import {model,Schema} from 'mongoose'

const sampleSchema=new Schema(
    {
        Name:{
            type:String,
            required:[true,'Name is required'],
            minlength:[8,'Name cannot be less than 8 character'],
            maxlength:[50,'Name cannot be more than 50 characters'],
            trim:true,
        },
        Quantity:{
            type:Number,
            // required:[true,'Description is required'],
            default:0,
        },
        Storage_Conditions:{
            type:Number,
            // required:[true,'Storage Condition is required'],
        },
        Registration_Number:{
            type:Number,
            // required:[true,'Registration Number is required'],
            
        },
        Customer_Code:{
            type:Number,
            // required:[true,'Customer Code is required'],
        },
        Packing_Type:{
            type:'String',
            enum:['SEALED','UNSEALED'],
            default:'SEALED'
        },
        Group:
            {
                type:[String],  
            },

        Type_Of_Analysis:
            {
                type:[String],
            }
        ,
        Test_To_Be_Done:
            {
                type:[String],
            }
        
    },
    {
        timestamps:true
    }
);

const Sample =model('Sample',sampleSchema);

export default Sample;