import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState={
    LabNameData:[],
    logoData:[],
    errorData:[]
}

// there is no need to make a reducer for the signup action because we dont neet to store anything in store ,we simply pefomt async operation so thunk is enough for it
export const saveNameOfLab = createAsyncThunk("NameOfLab/save", async (data) => {
  try {
    let res = axios.post("http://localhost:5001/api/v1/Administration/NameOfLab/save",data,{
      withCredentials: true, // Include cookies
    })
    toast.promise(res, {
      loading: "Wait! Adding Lab Name",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Add Lab Name",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const saveLogo = createAsyncThunk("Logo/save", async (data) => {
  try {
    let res = axios.post("http://localhost:5001/api/v1/Administration/Logo/save",data,{
      withCredentials: true, // Include cookies
      headers: { "Content-Type": "multipart/form-data" },
    })
    toast.promise(res, {
      loading: "Wait! Adding Logo",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to upload image",
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

  export const getLogo = createAsyncThunk("Logo/data", async () => {
    try {
      let res = axios.get("http://localhost:5001/api/v1/Administration/Logo/data",{
        withCredentials: true, // Include cookies
      })
  
      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });

  export const saveError = createAsyncThunk("Error/save", async (data) => {
    try {
      let res = axios.post("http://localhost:5001/api/v1/Error/add",data,{
        withCredentials: true, // Include cookies
      })
      toast.promise(res, {
        loading: "Wait! Adding Error",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed Add Error",
      });
  
      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });

  export const getError = createAsyncThunk("Error/get", async () => {
    try {
      let res = axios.get("http://localhost:5001/api/v1/Error/data",{
        withCredentials: true, // Include cookies
      })
      
      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });
  export const deleteError = createAsyncThunk("Error/delete", async ({ errorID }, { dispatch }) => {
    try {
      const id=errorID;
      let res = axios.delete(`http://localhost:5001/api/v1/Error/delete/${id}`,{
        withCredentials: true, // Include cookies
      })
      
      // getting response resolved here
      res = await res;
      dispatch(getError());
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
          .addCase(getLogo.fulfilled, (state, action) => {
            //action grabbed response returned from thunk
            //action.payload is json response from backend object coantaining success,message,data here (group)
            if (action.payload) {
                state.logoData = action.payload.logo;
            }
          })
          .addCase(getError.fulfilled, (state, action) => {
            //action grabbed response returned from thunk
            //action.payload is json response from backend object coantaining success,message,data here (group)
            if (action.payload) {
                state.errorData = action.payload.error;
            }
          })
        }
        })
  //named export
  //export const {}=extraSlice.actions;
  
  //default export
  export default extraSlice.reducer;