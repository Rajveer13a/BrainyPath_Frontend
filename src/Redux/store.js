import { configureStore } from "@reduxjs/toolkit"

import AuthSliceReducer from "./Slices/AuthSlice"
import CourseSliceReducer from "./Slices/CourseSlice"
import UserConfigSliceReducer from "./Slices/UserConfigSlice"


export const store = configureStore({
    reducer: {
        auth:  AuthSliceReducer,
        course: CourseSliceReducer,
        config: UserConfigSliceReducer
    },
    devTools: true
})