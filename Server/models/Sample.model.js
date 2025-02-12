import {model,Schema,mongoose} from 'mongoose'
import { type } from 'os';
// subset
const sampleSchema=new Schema(
    {
        Name:{
            type:String,
            required:[true,'Name is required'],
            trim:true,
        },
        Quantity:{
            type:String,
            required:[true,'Quantity is required'],
            default:0,
        },
        Storage_Conditions:{
            type:Number,
            required:[true,'Storage Condition is required'],
        },
        Registration_Number:{
            type:String,
            trim:true,
            unique:true,
            required:[true,'Registration Number is required'],
            
        },
        Customer_Code:{
            type:String,
            trim:true,
            required:[true,'Customer Code is required'],
        },
        Packing_Type:{
            type:String,
            enum:['SEALED','UNSEALED'],
            default:'SEALED',
            required:[true,'Packing Type is required'],
        },
        Date:{
            type:Date,
            required:[true,'Registration Date is required'],
        },
        Mfg_Date:{
            type:Date,
        },
        Treatment_Type:{
            type:String,
            trim:true,
        },
        Nature_Of_Sample:{
            type:String,
            trim:true,
            required:[true,'Nature Of Sample is required'],
        },
        Issued_To:{
            type:String,
            trim:true,
            required:[true,'Customer Name is required'],
        },
        Remarks:{
            type:String,
            trim:true,
            required:[true,'Remarks is required'],
        },
        Group:
            {
                type:String,
                trim:true,  
                required:[true,'Group is required'],
            },

        Type_Of_Testing:
            {
                type:[String],
                required:[true,'Type Of Testing is required'],
            },
        Tests:[
            {
                Type_Of_Testing:
                {
                    type:String,
                    trim:true,
                    required:[true,'Type Of Testing is required'],
                },
                Test:{
                    type:String,
                    trim:true,
                    required:[true,'Test is required'],
                }
            },
        ],
        Registered_By:{
            type: mongoose.Schema.Types.ObjectId, ref: "User",
            required:[true,'Registered By is required'],
        },  
        Sample_Status:{
            type:String,
            trim:true,
        },
        Active:{
            type:Boolean,
            default:true,
        },
        Upload_File:[
            {
                Analyst_Name:{type:String,trim:true,},
                Analyst_ID:{type:String,trim:true,},
                Sample_ID:{type:String,trim:true,},
                FileUrl:{
                    type:String,
                    trim:true
                }
            },
        ],
        Completion_Date:{
            type:Date,
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