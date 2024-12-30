import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice.js'
import groupSliceReducer from './Slices/GroupSilce.js'

const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        group:groupSliceReducer,
    },
    devtools:true
});

export default store;