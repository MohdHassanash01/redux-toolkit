import {configureStore} from "@reduxjs/toolkit"
import counterReducer from "./features/counterSlice"

// The store is the central place where the application's Redux state is stored.

export const store = configureStore({
    reducer:{
        counter : counterReducer
    }

//  counter → the name/key of this state in the store

// counterReducer → the reducer responsible for managing that state

})



// This `reducer` is the **root reducer configuration**.

// It tells Redux:

//  "For the `counter` part of my global state, use `counterReducer`."
