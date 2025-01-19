import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState={
    substanceData:[],
}

export const getSubstanceData = createAsyncThunk("substance/data", async () => {
    try {
      let res=axios.get("http://localhost:5001/api/v1/Substance/data",{
        withCredentials: true, // Include cookies
      })//here await is not used purposely because of the following toast syntax
  
      // getting response resolved here
      res = await res;//when promise is resolved it will give data
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  });

  export const sendSubstanceData=createAsyncThunk("Substance/save",async(data)=>{
    try{
      let res=axios.post("http://localhost:5001/api/v1/Substance/add",data,{
        withCredentials: true, // Include cookies
      })
      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to send data",
      });
  
      // getting response resolved here
      res = await res;//when promise is resolved it will give data
      return res.data;//catched by action
    } catch (error) {
      toast.error(error.response.data.message);
    }
  
    })

  const substanceSlice=createSlice({
        name:'substance',
        initialState,
        reducers:{},
        extraReducers: (builder) => {
          builder
            // for getting sample data
            .addCase(getSubstanceData.fulfilled, (state, action) => {
              //action grabbed response returned from thunk
              //action.payload is json response from backend object coantaining success,message,data here (group)
              if (action.payload) {
                  state.substanceData = [...action.payload.substance];
              }
            })  
          }});

//named export
  //export const {}=SubstanceSlice.actions;
  
//default export
export default substanceSlice.reducer;