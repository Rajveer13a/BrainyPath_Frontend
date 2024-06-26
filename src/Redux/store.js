import { configureStore } from "@reduxjs/toolkit"

import AuthSliceReducer from "./Slices/AuthSlice"
import CourseSliceReducer from "./Slices/CourseSlice"
import InstructorSliceReducer from "./Slices/Instructor/InstructorSlice";
import PaymentSliceReducer from "./Slices/PaymentSlice"
import UserConfigSliceReducer from "./Slices/UserConfigSlice"

export const store = configureStore({
    reducer: {
        auth:  AuthSliceReducer,
        course: CourseSliceReducer,
        config: UserConfigSliceReducer,
        payment: PaymentSliceReducer,
        instructor: InstructorSliceReducer
    },
    devTools: true
})