import {model,Schema} from 'mongoose'

const substanceSchema=new Schema(
    {
        Test:
            {
                Test_Name:String,
                TestID:String
            },
        GroupID:{
            type:String,
            trim:true,
        },
        MethodUnitList:[
            {
                Method:String,
                Unit:String,
                Limit:String
            },
        ],  
        
    },
    {
        timestamps:true
    }
);

const Substance =model('Substance',substanceSchema);

export default Substance;