import {model,Schema,mongoose} from 'mongoose'

const techManager_AnalystSchema=new Schema(
    {
        Sample_Alloted:{ type: mongoose.Schema.Types.ObjectId, ref: "Sample" },
        Substances_To_Be_Analysed: {
            type: "object",
            patternProperties: {// used to dynamically add key
              "^[A-Za-z]+$": {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    Test: { type: "string" },
                    Method: { type: "string" },
                    Unit: { type: "string" },
                    Analyst: { type: "string" },
                    Result: { type: "number", default: 0 }
                  },
                }
              }
            },
          },
        
        TM_Status:String,
        An_Status:String,
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