import {model,Schema,mongoose} from 'mongoose'

const techManager_AnalystSchema=new Schema(
    {
        Sample_Alloted:{ type: mongoose.Schema.Types.ObjectId, ref: "Sample" },
        Substances_To_Be_Analysed: {
          type: "object",
          patternProperties: {
            "^[A-Za-z]+$": { //for dynamic key patternProperties is used here
              type: "object",
              properties: {
                Tests: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      Test: {
                        Test_Name:String,
                        TestID:String,
                      },
                      Method: { type: "string" },
                      Unit: { type: "string" },
                      Analyst: {
                        Name:String,
                        ID:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }
                      },
                      Result: { type: "string", default: "" },
                      StartDate: { type: "string", format: "date-time" },
                      EndDate: { type: "string", format: "date-time" },
                      NABL:{type:Boolean,default:false}
                    },
                  }
                }
              },
            }
          }
        },
        
        
        TM_Status:String,
        AN_Status:[
          {
            Analyst: {
              Name:String,
              ID:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }
            },
            Status: String,
          },
        ],
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