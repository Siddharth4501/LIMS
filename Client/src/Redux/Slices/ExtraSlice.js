import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState={
    LabNameData:[],
}

// there is no need to make a reducer for the signup action because we dont neet to store anything in store ,we simply pefomt async operation so thunk is enough for it
export const saveNameOfLab = createAsyncThunk("NameOfLab/save", async (data) => {
  try {
    let res = axios.post("http://localhost:5001/api/v1/Administration/NameOfLab/save",data,{
      withCredentials: true, // Include cookies
    })
    toast.promise(res, {
      loading: "Wait! Creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const getNameOfLab = createAsyncThunk("NameOfLab/data", async () => {
    try {
      let res = axios.get("http://localhost:5001/api/v1/Administration/NameOfLab/data",{
        withCredentials: true, // Include cookies
      })
  
      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });

const extraSlice=createSlice({
      name:'administration',
      initialState,
      reducers:{},
      extraReducers: (builder) => {
        builder
          // for getting sample data
          .addCase(getNameOfLab.fulfilled, (state, action) => {
            //action grabbed response returned from thunk
            //action.payload is json response from backend object coantaining success,message,data here (group)
            if (action.payload) {
                state.LabNameData = action.payload.labName;
            }
          })
        }
        })
  
  //named export
  //export const {}=extraSlice.actions;
  
  //default export
  export default extraSlice.reducer;