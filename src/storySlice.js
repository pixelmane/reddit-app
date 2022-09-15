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
        
        return json[1].data.children
    }
)
const storyReducer = createSlice({
    name: 'story',
    initialState: {
        searchTerm: '',
        subject: 'popular',
        stories: [],
        shownStories: [],
        filteredStories: [],
        comments: []
    },
    reducers: {
        
        changeSubject: (state, action) => {
            
            state.subject = action.payload
            state.searchTerm = ''
        },
        filterTopics: (state, action) => {
            state.searchTerm = action.payload
            
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
            for (let g = 0; g < commentArray.length -1; g++){
                gatheredComments.push({
                    author: commentArray[g].data.author,
                    body: commentArray[g].data.body,
                    postedAt: commentArray[g].data.created
                })
            }
            
            state.comments = gatheredComments
        },
        [commentGrabber.pending]: (state, action) => {
            
        },
        [storyGrabber.rejected]: (state, action) => {
           
        },
        [storyGrabber.fulfilled]: (state, action) => {
            let gatheredStories = [];
            
            let storyArray = action.payload;
            for (let i = 0; i < storyArray.length; i++){
               // let imaged = storyArray[i].data.preview.images[0].source.url ? decodeComponentURI(storyArray[i].data.preview.images[0].source.url) : null
                
                let imaged = storyArray[i].data.preview ? storyArray[i].data.preview.images[0].source.url : 'we bad'
                
                let urlImage = imaged.replace(/&amp;/g,"&")
                
                gatheredStories.push({
                    author: storyArray[i].data.author,
                    title: storyArray[i].data.title,
                    votes: storyArray[i].data.ups,
                    comments: storyArray[i].data.num_comments,
                    timeOfPost: storyArray[i].data.created,
                    image: urlImage,
                    body: storyArray[i].data.selftext,
                    permalink: storyArray[i].data.permalink,
                    mediaType: storyArray[i].data.post_hint,
                    video: storyArray[i].data.post_hint === "hosted:video" ? storyArray[i].data.media.reddit_video.fallback_url : undefined,
                    url: storyArray[i].data.url ? storyArray[i].data.url : undefined
                    
                })
            }
            console.log(gatheredStories)
            state.stories = gatheredStories
            state.shownStories = gatheredStories.filter(element => element.title.toLowerCase().includes(state.searchTerm.toLowerCase()))
        },
        [storyGrabber.pending]: (state, action) => {
            
        }
    }
})
export const { voteFor, changeSubject, filterTopics } = storyReducer.actions;
export default storyReducer.reducer; 
