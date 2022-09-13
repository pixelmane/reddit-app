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
export const commentGrabber = createAsyncThunk('story/loadComments', 
    async (arg) => {
        console.log(arg)
        // eslint-disable-next-line
        let commentData = await fetch(`https://www.reddit.com` + `${arg}` + `.json`)
        let json = await commentData.json();
        console.log('here is the data')
        console.log(json[1].data.children[0].data)
        return json[1].data.children
    }
)
const storyReducer = createSlice({
    name: 'story',
    initialState: {
        subject: 'popular',
        stories: [],
        comments: []
    },
    reducers: {
        changeSubject: (state, action) => {
            console.log('looking to add a story, eh?')
            state.subject = action.payload
        }
    },
    extraReducers: {
        [commentGrabber.rejected]: (state, action) => {
            console.log('rejected')
        },
        [commentGrabber.fulfilled]: (state, action) => {
            console.log(action.payload)
            let gatheredComments = [];
            let commentArray = action.payload;
            for (let g = 0; g < commentArray.length; g++){
                gatheredComments.push({
                    author: commentArray[g].data.author,
                    body: commentArray[g].data.body,
                    postedAt: commentArray[g].data.created
                })
            }
            console.log('wegathered these')
            console.log(gatheredComments)
            state.comments = gatheredComments
        },
        [commentGrabber.pending]: (state, action) => {
            console.log('loading comments')
        },
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
                    body: storyArray[i].data.selftext,
                    permalink: storyArray[i].data.permalink
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
