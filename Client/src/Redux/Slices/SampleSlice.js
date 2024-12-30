import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState={
    sampleData:[],
}

// function to get Group Data
export const getSampleData = createAsyncThunk("sample/data", async () => {
    try {
      let res=axios.get("http://localhost:5001/api/v1/Sample/data")//here await is not used purposely because of the following toast syntax
  
      // getting response resolved here
      res = await res;//when promise is resolved it will give data
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  });

  const sampleSlice=createSlice({
      name:'sample',
      initialState,
      reducers:{},
      extraReducers: (builder) => {
        builder
          // for getting sample data
          .addCase(getSampleData.fulfilled, (state, action) => {
            //action grabbed response returned from thunk
            //action.payload is json response from backend object coantaining success,message,data here (group)
            if (action.payload) {
                state.sampleData = [...action.payload.samples];
            }
          })
          
        }});
  
  //named export
  //export const {}=sampleSlice.actions;
  
  //default export
  export default sampleSlice.reducer;