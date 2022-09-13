import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Comments } from "./comments.js";


function SelectedPost() {
    const location = useLocation()
    let style = {}
    const { timeOfPost, body, image, title, author, votes } = location.state
    if(image !== undefined){
        if(image.length > 10){
            style = {
                // eslint-disable-next-line
                backgroundImage: "url(" + `${image}` + ")",
                
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
            <div className='storyImageSelected' style={style}></div>
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