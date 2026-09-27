import { createSlice } from "@reduxjs/toolkit";

// A slice represents a feature or a portion of the application's state.

export const counterSlice = createSlice({
    name: "counter",
    initialState:{
        value: 0
    },

    // Reducers define how the state can be changed.
    
    reducers:{
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementBYten: (state,actions) => {
            state.value = state.value + actions.payload
        }
    }
})


export const {increment,decrement,incrementBYten} = counterSlice.actions
export default counterSlice.reducer