import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState={
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    data:localStorage.getItem('data') || {}
}

// function to handle login
export const login = createAsyncThunk("auth/login", async (data) => {
    try {
      let res=axios.post("http://localhost:5001/api/v1/user/login",data)
      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to log in",
      });
  
      // getting response resolved here
      res = await res;//when promise is resolved it will give data
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  });
  
  // function to handle logout
  export const logout = createAsyncThunk("auth/logout", async () => {
    try {
      
      let res=axios.post("http://localhost:5001/api/v1/user/logout",data) 
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
      toast.error(error.response.data.message);
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