import { configureStore } from "@reduxjs/toolkit";
import processReducer from "../redux/slices/processSlice"

const store = configureStore({
    reducer : {
        processReducer
    }
})
export default store