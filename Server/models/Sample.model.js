import {model,Schema,mongoose} from 'mongoose'
import { type } from 'os';
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
            type:String,
            unique:true
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
        Mfg_Date:{
            type:String,
            trim:true,
        },
        Treatment_Type:{
            type:String,
        },
        Nature_Of_Sample:{
            type:String,
        },
        Issued_To:{
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
        Registered_By:{type: mongoose.Schema.Types.ObjectId, ref: "User"},  
        Sample_Status:{
            type:String,
        },
        Active:{
            type:Boolean,
            default:true,
        }          
    },
    {
        timestamps:true
    }
);

sampleSchema.statics.generateRegistrationNumber = async function () {
    const lastEntry = await this.findOne().sort({ _id: -1 }); // Use 'this' to refer to the model
    const date = new Date();
    const year = date.getFullYear();
    let newNumber = `REG/${year}/`; // Base prefix for the registration number

    if (lastEntry && lastEntry.Registration_Number) {
        // Extract the last number part from the registration number
        const lastNumber = parseInt(lastEntry.Registration_Number.split('/')[2], 10);
        newNumber += String(lastNumber + 1).padStart(6, '0'); // Increment and pad to 6 digits
    } else {
        newNumber += '000001'; // If no entries, start with '000001'
    }

    return newNumber; // Return the new registration number
};

const Sample =model('Sample',sampleSchema);

export default Sample;