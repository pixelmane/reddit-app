import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'; 
import { storyGrabber } from './storySlice.js'
export function StoryFactory(){
    const storiesListed = useSelector(state => state.stories.stories)
    return(
        <div>
            {storiesListed.map(element => <Story 
                                                author={element.author} 
                                                title={element.title} 
                                                votes={element.votes}  
                                                timeOfPost={element.timeOfPost}
                                                comments={element.comments}
                                                image={element.image}
                                                />)}
        </div>
    )
}
export function Story( { author, title, votes, timeOfPost, comments, image } ) {
    const storiesListed = useSelector(state => state.stories.stories)
    const subject = useSelector(state => state.stories.subject)
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(storyGrabber(subject))
    },[])
    function handleClick() {
        console.log(storiesListed)
    }
    let style = {}
    if(image !== undefined){
        if(image.length > 10){
            style = {
                backgroundImage: "url(" + `${image}` + ")"
            }
        } else {
            style = {
                display: 'none'
            }
        }
    } else {
        style = {
            display: 'none'
        }
    }
    function timeSince(timePosted){
        
        let dateFormatted = Date.now() / 1000
        
        let timeBetween = dateFormatted - timePosted
        let hoursBetween = Math.floor(timeBetween/3600)
       
        return hoursBetween
        
    }
    return (
        <div className='storyBox'>
            
            <div className='rightStoryBox'>
            <div className='topStoryBox'>
            <div className='leftStoryBox'>
              <h2 className='topArrow'>^</h2>
              <h2>{votes}</h2>
              <h2 className='bottomArrow'>^</h2>
            </div>
            <h1 className='title'>{title}</h1>
            </div>
            <div className='storyImage' style={style}></div>
            <div className='bottomStoryBox'>
              <h2>{author}</h2><h2>{timeSince(timeOfPost) > 1 ? timeSince(timeOfPost) : 'less than 1'} hours ago</h2><h2>{comments} comments</h2>
            </div>
            </div>         
          </div> 
    )
}