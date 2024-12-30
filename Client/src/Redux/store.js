import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice.js'
import groupSliceReducer from './Slices/GroupSilce.js'
import sampleSliceReducer from './Slices/SampleSlice.js'

const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        group:groupSliceReducer,
        sample:sampleSliceReducer
    },
    devtools:true
});

export default store;