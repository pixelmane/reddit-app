import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'; 
import { Link } from "react-router-dom";
import { storyGrabber, commentGrabber } from './storySlice.js'

export function StoryFactory(){
    const storiesListed = useSelector(state => state.stories.shownStories)
    return(
        
            <div>
                {storiesListed.map(element => <Story 
                                                    author={element.author} 
                                                    title={element.title} 
                                                    votes={element.votes}  
                                                    timeOfPost={element.timeOfPost}
                                                    comments={element.comments}
                                                    image={element.image}
                                                    body={element.body}
                                                    permalink={element.permalink}
                                                    />)}
            </div>
        
    )
}
export function Story( { permalink, body, author, title, votes, timeOfPost, comments, image } ) {
    
    const subjectSelection = useSelector(state => state.stories.subject)
    const searchTerm = useSelector(state => state.stories.searchTerm)
    const subject = useSelector(state => state.stories.subject)
    let dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(storyGrabber(subject))
    },
    // eslint-disable-next-line
    [subjectSelection, searchTerm])
   
    let style = {}
    if(image !== undefined){
        if(image.length > 10){
            style = {
                // eslint-disable-next-line
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
    function handleClick(link){
        
        
        dispatch(commentGrabber(link))
    }
    return (
        <div className='storyBox'>
            <Link onClick={() => handleClick(permalink)} to={`${title}`} state={{ timeOfPost: `${timeOfPost}`, body: `${body}`, image: `${image}`, title: `${title}`, votes: `${votes}`, author: `${author}`, comments: `${comments}` }}><div className='clickBox'></div></Link>
            <div className='rightStoryBox'>
            <div className='topStoryBox'>
            <div className='leftStoryBox'>
              <h2 className='topArrow'>^</h2>
              <h2 style={{fontWeight: '300'}} classname="votes">{votes}</h2>
              <h2 className='bottomArrow'>^</h2>
            </div>
            <h1 className='title' style={{fontSize: '20px'}}>{title}</h1>
            </div>
            <div className='storyImageMain' style={style}></div>
            
            <div className='bottomStoryBox'>
              <h2 style={{fontWeight: '400'}}>{author}</h2><h2 style={{fontWeight: '300', fontStyle: 'italic'}}>{timeSince(timeOfPost) > 1 ? timeSince(timeOfPost) : 'less than 1'} hours ago</h2><h2 style={{fontWeight: '300'}}>{comments} comments</h2>
            </div>
            </div>         
          </div> 
          
    )
}