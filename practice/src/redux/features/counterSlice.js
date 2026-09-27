
import {createSlice} from "@reduxjs/toolkit"



 export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers:{
        increment : (state) => {
            state.value += 1
        },
        decrement : (state) => {
            state.value -= 1
        },
        incrementBYValue : (state,action) => {
            state.value = state.value + action.payload
        }

    }
})


export const {increment, decrement, incrementBYValue} = counterSlice.actions

export default  counterSlice.reducer