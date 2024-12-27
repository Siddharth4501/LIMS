import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice.js'
// import CoursesReducer from './Slices/CourseSlice.js'
// import razorpaySliceReducer from './Slices/RazorpaySlice.js'
// import lectureSliceReducer from './Slices/LectureSlice.js'
// import statSliceReducer from './Slices/StatSlice.js'
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        
    },
    devtools:true
});

export default store;