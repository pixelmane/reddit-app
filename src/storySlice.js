import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const storyGrabber = createAsyncThunk('story/loadStories', 
    async (arg) => {
    console.log('thunk accessed')
    let storyData = await fetch(`https://www.reddit.com/r/${arg}.json`)
    let json = await storyData.json();
   console.log(json.data.children)
    return json.data.children
} 
)
    
const storyReducer = createSlice({
    name: 'story',
    initialState: {
        subject: 'popular',
        stories: []
    },
    reducers: {
        changeSubject: (state, action) => {
            console.log('looking to add a story, eh?')
            state.subject = action.payload
        }
    },
    extraReducers: {
        [storyGrabber.rejected]: (state, action) => {
            console.log('rejected')
        },
        [storyGrabber.fulfilled]: (state, action) => {
            let gatheredStories = [];
            console.log('stories grabbed')
            let storyArray = action.payload;
            for (let i = 0; i < storyArray.length; i++){
                
                gatheredStories.push({
                    author: storyArray[i].data.author,
                    title: storyArray[i].data.title,
                    votes: storyArray[i].data.ups,
                    comments: storyArray[i].data.num_comments,
                    timeOfPost: storyArray[i].data.created,
                    image: storyArray[i].data.thumbnail,
                    body: storyArray[i].data.selftext
                })
            }
            console.log(gatheredStories)
            state.stories = gatheredStories
        },
        [storyGrabber.pending]: (state, action) => {
            console.log('loading')
        }
    }
})
export const { changeSubject } = storyReducer.actions;
export default storyReducer.reducer; 
