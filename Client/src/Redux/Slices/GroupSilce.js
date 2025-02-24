import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState={
    groupData:[],
}

// function to get Group Data
export const getGroupData = createAsyncThunk("group/data", async () => {
    try {
      let res=axios.get("http://localhost:5001/api/v1/group/data",{
        withCredentials: true, // Include cookies
      })//here await is not used purposely because of the following toast syntax
  
      // getting response resolved here
      res = await res;//when promise is resolved it will give data
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  });

  export const updateGroupData=createAsyncThunk("GroupData/Update",async(data)=>{
    try{
      let res=axios.put("http://localhost:5001/api/v1/Group/update",data,{
        withCredentials: true, // Include cookies
      })
      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update Group Data",
      });
      
      // getting response resolved here
      res = await res;//when promise is resolved it will give data
      return res.data;//catched by action
    } catch (error) {
      toast.error(error.response.data.message);
    }
  
    })

  export const deleteGroupData=createAsyncThunk("GroupData/Delete",async(data,{dispatch})=>{
    try{
      const {groupID}=data
      const id=groupID;
      let res=axios.delete(`http://localhost:5001/api/v1/Group/delete/${id}`,{
        withCredentials: true, // Include cookies
      })
      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to Delete  Group Data",
      });
      
      // getting response resolved here
      res = await res;//when promise is resolved it will give data
      dispatch(getGroupData());
      return res.data;//catched by action
    } catch (error) {
      toast.error(error.response.data.message);
    }
  
    })
    export const deleteTypeOfTesting=createAsyncThunk("TypeOfTesting/Delete",async(data,{dispatch})=>{
      try{
        let res=axios.post("http://localhost:5001/api/v1/Group/TypeOfTesting/delete",data,{
          withCredentials: true, // Include cookies
        })
        await toast.promise(res, {
          loading: "Loading...",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to Delete Type Of Testing",
        });
        
        // getting response resolved here
        res = await res;//when promise is resolved it will give data
        dispatch(getGroupData());
        return res.data;//catched by action
      } catch (error) {
        toast.error(error.response.data.message);
      }
    
        })
      
    export const deleteTest=createAsyncThunk("Test/Delete",async(data,{dispatch})=>{
      try{
        let res=axios.post("http://localhost:5001/api/v1/Group/Test/delete",data,{
          withCredentials: true, // Include cookies
        })
        await toast.promise(res, {
          loading: "Loading...",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to Delete Test",
        });
        
        // getting response resolved here
        res = await res;//when promise is resolved it will give data
        dispatch(getGroupData());
        return res.data;//catched by action
      } catch (error) {
        toast.error(error.response.data.message);
      }
    
        })

  export const addGroupData=createAsyncThunk("GroupData/add",async(data)=>{
    try{
      let res=axios.post("http://localhost:5001/api/v1/Group/add",data,{
        withCredentials: true, // Include cookies
      })
      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to Add Group",
      });
      
      // getting response resolved here
      res = await res;//when promise is resolved it will give data
      return res.data;//catched by action
    } catch (error) {
      toast.error(error.response.data.message);
    }
  
    })

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