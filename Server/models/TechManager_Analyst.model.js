import {model,Schema} from 'mongoose'

const techManager_AnalystSchema=new Schema(
    {
        Substances_To_Be_Analysed:[
            {
                Substance_Name:String,
                Method:String,
                Unit_Of_Measurement:String,
                Name_Of_Analayst:String,
                Result:{
                    type:Number,
                    default:0,
                }
        },],

        Due_Date:{
            type:Date,
            required:[true,'Due Date is required'],
        },
              
    },
    {
        timestamps:true
    }
);

const TechManager_Analyst =model('TechManager_Analyst',techManager_AnalystSchema);

export default TechManager_Analyst;