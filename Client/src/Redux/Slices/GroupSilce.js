import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState={
    groupData:[],
}

// function to get Group Data
export const getGroupData = createAsyncThunk("group/data", async () => {
    try {
      let res=axios.get("http://localhost:5001/api/v1/group/data")//here await is not used purposely because of the following toast syntax
  
      // getting response resolved here
      res = await res;//when promise is resolved it will give data
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  });

  const groupSlice=createSlice({
      name:'group',
      initialState,
      reducers:{},
      extraReducers: (builder) => {
        builder
          // for getting group data
          .addCase(getGroupData.fulfilled, (state, action) => {
            //action grabbed response returned from thunk
            //action.payload is json response from backend object coantaining success,message,data here (group)
            if (action.payload) {
                state.groupData = [...action.payload.group];
            }
          })
          
        }});
  
  //named export
  //export const {}=groupSlice.actions;
  
  //default export
  export default groupSlice.reducer;