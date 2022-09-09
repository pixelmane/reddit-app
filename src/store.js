import { configureStore } from "@reduxjs/toolkit";
import storyReducer from './storySlice.js'


const store = configureStore({
    reducer: storyReducer,
})


export default store;