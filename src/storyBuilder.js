import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'; 
import { Link } from "react-router-dom";
import { storyGrabber, commentGrabber } from './storySlice.js'
import greenArrow from './green.png';
import redArrow from './red.png';

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
                                                    url={element.url}
                                                    />)}
            </div>
        
    )
}
export function Story( { url, video, mediaType, permalink, body, author, title, votes, timeOfPost, comments, image } ) {
   console.log(video)
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
            <Link onClick={() => handleClick(permalink)} to={`${title}`} state={{ url: `${url}`, video: `${video}`, mediaType: `${mediaType}`, timeOfPost: `${timeOfPost}`, body: `${body}`, image: `${image}`, title: `${title}`, votes: `${votes}`, author: `${author}`, comments: `${comments}` }}><div className='clickBox'></div></Link>
            <div className='rightStoryBox'>
            <div className='topStoryBox'>
            <div className='leftStoryBox'>
             <img alt='greenarrow' src={greenArrow}
                    height='15px' width='20px' />
              <h2 style={{fontWeight: '300'}} classname="votes">{votes}</h2>
              <img alt='redarrow' src={redArrow}
                    height='15px' width='20px' style={{transform: 'rotate(180DEG)'}}/>
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
                      maxWidth: "80%",
                      maxHeight: "80%",
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
                      maxHeight: "70%",
                      maxWidth: "90%",
                      width: "auto",
                      height: "auto",
                      margin: "0px",
                      
                    }}
                  >
                    <source
                      src={video}
                      type="video/mp4"
                    />
                  </video>
                </div>
              ) : mediaType === 'link' ? (
               <a className='outsideLink' href={url}>{url}</a>
              ): mediaType === undefined ? null : null}
              <p className='postBody'>{body}</p>
            <div className='bottomStoryBox'>
              <h2 style={{fontWeight: '400'}}>{author}</h2><h2 style={{fontWeight: '300', fontStyle: 'italic'}}>{timeSince(timeOfPost) > 1 ? timeSince(timeOfPost) : 'less than 1'} hours ago</h2><h2 style={{fontWeight: '300'}}>{comments} comments</h2>
            </div>
            </div>         
          </div> 
          
    )
}