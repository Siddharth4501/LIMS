import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice.js'
import groupSliceReducer from './Slices/GroupSilce.js'
import sampleSliceReducer from './Slices/SampleSlice.js'
import substanceSliceReducer from "./Slices/SubstanceSlice.js";
import extraSliceReducer from "./Slices/ExtraSlice.js";


const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        group:groupSliceReducer,
        sample:sampleSliceReducer,
        substance:substanceSliceReducer,
        administration:extraSliceReducer,
    },
    devtools:true
});

export default store;