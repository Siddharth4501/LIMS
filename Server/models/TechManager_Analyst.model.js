import {model,Schema,mongoose} from 'mongoose'

const techManager_AnalystSchema=new Schema(
    {
        Sample_Alloted:{ type: mongoose.Schema.Types.ObjectId, ref: "Sample" },
        Substances_To_Be_Analysed: {
          type: Object,
          patternProperties: {
            "^[A-Za-z]+$": { //for dynamic key patternProperties is used here
              type: Object,
              properties: {
                Tests: {
                  type: Array,
                  items: {
                    type: Object,
                    properties: {
                      Test: {
                        Test_Name:{
                          type:String,
                          trim:true,
                        },
                        TestID:{
                          type:String,
                          trim:true,
                        }
                      },
                      Method: { type: String,trim:true, },
                      Unit: { type: String,trim:true, },
                      Analyst: {
                        Name:{
                          type:String,
                          trim:true,
                        },
                        ID:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }
                      },
                      Result: { type: String,trim:true, default: "" },
                      StartDate: { type: Date,default:null},
                      EndDate: { type: Date,default:null},
                      NABL:{type:Boolean,default:false}
                    },
                  }
                }
              },
            }
          }
        },
        
        
        TM_Status:{
          type:String,
          trim:true,
        },
        AN_Status:[
          {
            Analyst: {
              Name:{
                type:String,
                trim:true,
              },
              ID:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }
            },
            Status: {
              type:String,
              trim:true,
            },
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