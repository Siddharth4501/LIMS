import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance.js";


const initialState={
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    data:localStorage.getItem('data') || {}
}

// function to handle login
export const login = createAsyncThunk("auth/login", async (data) => {
    try {
        console.log(data,"LO")
      let res =axiosInstance.post("/user/login", data);
    
      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to log in",
      });
  
      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error.message);
    }
  });
  
  // function to handle logout
  export const logout = createAsyncThunk("auth/logout", async () => {
    try {
      
      let res = axiosInstance.get("/user/logout");
      
      
      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to log out",
      });
  
      // getting response resolved here
      res = await res;
      
      return res.data;
    } catch (error) {
      toast.error(error.message);
    }
  });

  const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
      builder
        // for user login
        .addCase(login.fulfilled, (state, action) => {
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
          localStorage.setItem("isLoggedIn", true);
          state.isLoggedIn = true;
          state.data = action?.payload?.user;
        })
        // for user logout
        .addCase(logout.fulfilled, (state) => {
          localStorage.clear();
          state.isLoggedIn = false;
          state.data = {};
        })

      }});

//named export
//export const {}=authSlice.actions;

//default export
export default authSlice.reducer;