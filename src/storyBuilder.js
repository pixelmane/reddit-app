import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'; 
import { Link } from "react-router-dom";
import { storyGrabber, commentGrabber } from './storySlice.js'

export function StoryFactory(){
    const subjectSelection = useSelector(state => state.stories.subject)
    const searchTerm = useSelector(state => state.stories.searchTerm)
    const subject = useSelector(state => state.stories.subject)
    let dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(storyGrabber(subject))
    },
    // eslint-disable-next-line
    [subjectSelection, searchTerm])
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
                                                    mediaType={element.mediaType}
                                                    video={element.video}
                                                    />)}
            </div>
        
    )
}
export function Story( { video, mediaType, permalink, body, author, title, votes, timeOfPost, comments, image } ) {
    
    const subjectSelection = useSelector(state => state.stories.subject)
    const searchTerm = useSelector(state => state.stories.searchTerm)
    const subject = useSelector(state => state.stories.subject)
    let dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(storyGrabber(subject))
    },
    // eslint-disable-next-line
    [subjectSelection, searchTerm])
   
   /* let style = {}
    if(mediaType !== undefined){
        if(mediaType === 'image'){
            style = {
                // eslint-disable-next-line
                backgroundImage: "url(" + `${image}` + ")"
                
            }
            
        } else if (mediaType === 'hosted:video') {
            return 
        
        }else {
            style = {
                display: 'none'
            }
        }
    } else {
        style = {
            display: 'none'
        }
    }*/
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
           {/* <div className='storyImageMain' style={style}></div>*/}
            {mediaType === "image" ? (
                <div align="center">
                  <img
                    src={image}
                    alt={title}
                    style={{
                      maxWidth: "80vw",
                      maxHeight: "80vh",
                    }}
                  />
                </div>
              ) : mediaType === "hosted:video" && video ? (
                <div
                  align="center"
                  style={{
                    paddingLeft: "0px ",
                    paddingRight: "0px ",
                  }}
                >
                  <video
                    controls
                    
                    style={{
                      maxHeight: "70vh",
                      maxWidth: "90vw",
                      width: "auto",
                      height: "auto",
                      margin: "0px",
                    }}
                  >
                    <source
                      src={video.reddit_video.fallback_url}
                      type="video/mp4"
                    />
                  </video>
                </div>
              ) : mediaType === undefined ? null : null}
            <div className='bottomStoryBox'>
              <h2 style={{fontWeight: '400'}}>{author}</h2><h2 style={{fontWeight: '300', fontStyle: 'italic'}}>{timeSince(timeOfPost) > 1 ? timeSince(timeOfPost) : 'less than 1'} hours ago</h2><h2 style={{fontWeight: '300'}}>{comments} comments</h2>
            </div>
            </div>         
          </div> 
          
    )
}