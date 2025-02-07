import {model,Schema} from 'mongoose'

const substanceSchema=new Schema(
    {
        Test:
            {
                Test_Name:{
                    type:String,
                    trim:true,
                },
                TestID:{
                    type:String,
                    trim:true,
                },
            },
        GroupID:{
            type:String,
            trim:true,
        },
        MethodUnitList:[
            {
                Method:{
                    type:String,
                    trim:true,
                },
                Unit:{
                    type:String,
                    trim:true,
                },
                Limit:{
                    type:String,
                    trim:true,
                }
            },
        ],  

    },
    {
        timestamps:true
    }
);

const Substance =model('Substance',substanceSchema);

export default Substance;