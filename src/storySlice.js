import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const storyGrabber = createAsyncThunk('story/loadStories', 
    async (arg) => {
    console.log('thunk accessed')
    let storyData = await fetch('https://www.reddit.com/r/popular.json')
    let json = await storyData.json();
    console.log(json);
} 
)
    
const storyReducer = createSlice({
    name: 'story',
    initialState: {
        subject: 'popular',
        stories: []
    },
    reducers: {
        addStory: (state, action) => {
            console.log('looking to add a story, eh?')
        }
    },
    extraReducers: {
        [storyGrabber.rejected]: (state, action) => {
            console.log('rejected')
        },
        [storyGrabber.fulfilled]: (state, action) => {
            console.log('stories grabbed')
        },
        [storyGrabber.pending]: (state, action) => {
            console.log('loading')
        }
    }
})
export const { addStory } = storyReducer.actions;
export default storyReducer.reducer; 