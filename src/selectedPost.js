import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Comments } from "./comments.js";


function SelectedPost() {
    const location = useLocation()
    
    const { video, mediaType, timeOfPost, body, image, title, author, votes } = location.state
    
    function timeSince(timePosted){
        
        let dateFormatted = Date.now() / 1000
        
        let timeBetween = dateFormatted - timePosted
        let hoursBetween = Math.floor(timeBetween/3600)
       
        return hoursBetween
        
    }
    return(
    <div>
        <Link to='/'><div id='backgroundBlackout'></div></Link>
        <div id='selectedPostContainer'>
            <Link to='/'><div id='back' ><div id='backLogo'></div></div></Link>
        <div id='selectedStoryBox'>
            
            <div className='rightStoryBox'>
            <div className='topStoryBox'>
            <div className='leftStoryBox'>
              <h2 className='topArrow'>^</h2>
              <h2 className="votes">{votes}</h2>
              <h2 className='bottomArrow'>^</h2>
            </div>
            <h1 className='title'>{title}</h1>
            
            </div>
            <h2 style={{marginLeft: '20%',fontSize: '15px', fontWeight: '100', color: 'black'}}>Posted by u/{author}  {timeSince(timeOfPost)} hours ago</h2>
            {/*<div className='storyImageSelected' style={style}></div>*/}
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
                    autoPlay
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
              ) : mediaType === undefined ? null : null}

            <div className='bottomStoryBox'>
            <div>{body}</div>
              
            </div>
            <Comments />
            
            
            </div>         
          </div> 
          </div>
    </div>
    )
}

export default SelectedPost;