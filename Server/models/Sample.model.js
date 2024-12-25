import {model,Schema} from 'mongoose'
// subset
const sampleSchema=new Schema(
    {
        Name:{
            type:String,
            required:[true,'Name is required'],
            minlength:[5,'Name cannot be less than 8 character'],
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
            type:String,
            enum:['SEALED','UNSEALED'],
            default:'SEALED'
        },
        Date:{
            type:Date,
        },
        Treatment_Type:{
            type:String,
        },
        Remarks:{
            type:String,
        },
        Group:
            {
                type:String,  
            },

        Type_Of_Testing:
            {
                type:[String],
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

const Sample =model('Sample',sampleSchema);

export default Sample;