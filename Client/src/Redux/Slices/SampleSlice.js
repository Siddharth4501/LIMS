import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState={
    sampleData:[],
    TmAnData:[],
}

export const registerSample=createAsyncThunk("Sample/register",async(data)=>{
  try{
    let res=axios.post("http://localhost:5001/api/v1/Sample/register",data,{
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

// function to get Sample Data
export const getSampleData = createAsyncThunk("sample/data", async () => {
    try {
      let res=axios.get("http://localhost:5001/api/v1/Sample/data",{
        withCredentials: true, // Include cookies
      })//here await is not used purposely because of the following toast syntax
  
      // getting response resolved here
      res = await res;//when promise is resolved it will give data
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  });

  export const updateSample=createAsyncThunk("Sample/Update",async(data)=>{
    try{
      let res=axios.put("http://localhost:5001/api/v1/Sample/edit",data,{
        withCredentials: true, // Include cookies
      })
      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update data",
      });
  
      // getting response resolved here
      res = await res;//when promise is resolved it will give data
      return res.data;//catched by action
    } catch (error) {
      toast.error(error.response.data.message);
    }
  
    })

    export const DeleteSampleData=createAsyncThunk("Sample/Delete",async(data)=>{
      try {
        console.log(data,'fgh')
        let res=axios.post("http://localhost:5001/api/v1/Sample/delete",data,{
          withCredentials: true, // Include cookies
        })//here await is not used purposely because of the following toast syntax
    
        // getting response resolved here
        res = await res;//when promise is resolved it will give data
        return res.data;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })

export const sendTMData=createAsyncThunk("TMUser/send",async(data)=>{
  try{
    let res=axios.post("http://localhost:5001/api/v1/Sample/TM/data/save",data,{
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

export const getTMANData=createAsyncThunk("TMANUser/Data",async()=>{
  try {
    let res=axios.get("http://localhost:5001/api/v1/Sample/TMAN/data",{
      withCredentials: true, // Include cookies
    })//here await is not used purposely because of the following toast syntax

    // getting response resolved here
    res = await res;//when promise is resolved it will give data
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
})

export const updateTMANData=createAsyncThunk("TMANuser/Update",async(data)=>{
  try{
    let res=axios.put("http://localhost:5001/api/v1/Sample/TMAN/data/update",data,{
      withCredentials: true, // Include cookies
    })
    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to update data",
    });

    // getting response resolved here
    res = await res;//when promise is resolved it will give data
    return res.data;//catched by action
  } catch (error) {
    toast.error(error.response.data.message);
  }

  })

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
          .addCase(getTMANData.fulfilled,(state,action)=>{
            if (action.payload) {
              state.TmAnData = [...action.payload.TM_AN];
            }
          })
          
        }});
  
  //named export
  //export const {}=sampleSlice.actions;
  
  //default export
  export default sampleSlice.reducer;