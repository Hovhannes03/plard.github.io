import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getProcessOne = createAsyncThunk(
    "getProc",
    async(_,thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:3500/processOne")
            return response.data
        }
        catch(e){
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getProcessTwo = createAsyncThunk(
    "getProcessTwo",
    async(_,thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:3500/processTwo")
            return response.data
        }
        catch(e){
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const addProc = createAsyncThunk(
    "addProc",
    async(process, thunkAPI) => {
        try{
            const response = await axios.post(`http://localhost:3500/processOne`, {
                name: process.name,
                svg: process.svg,
                color: process.color
            })
            return response.data
        }
        catch(e){
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

const ProcessSlice = createSlice({
    name: "process",
    initialState : {
        processOne : [],
        processTwo : [],
        loading : false,
        error : ""
    },
    extraReducers: {
//1
        [getProcessOne.pending] : (state) => {
            state.loading = true
        },
        [getProcessOne.fulfilled] : (state, action) => {
            state.processOne = action.payload
        },
        [getProcessOne.rejected] : (state, action) => {
            state.error = action.payload
        },
//2
        [getProcessTwo.pending] : (state) => {
            state.loading = true
        },
        [getProcessTwo.fulfilled] : (state, action) => {
            state.loading = false
            state.processTwo = action.payload
            state.error = ""
        },
        [getProcessTwo.rejected] : (state, action) => {
            state.error = action.payload
        }
    }  
})
export default ProcessSlice.reducer