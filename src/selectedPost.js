import { useLocation, useParams } from "react-router-dom";
import { Link } from 'react-router-dom'



function SelectedPost() {
    const location = useLocation()
    let style = {}
    const { body, image, title, author, comments, votes } = location.state
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
    return(
    <div>
        <Link to='/'><div id='backgroundBlackout'></div></Link>
        <div id='selectedPostContainer'>
            <Link to='/'><div style={{color: 'white', fontSize: '50px', position: 'absolute', top: '-40px', left: '-10px'}}>x</div></Link>
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
            <div>{body}</div>
            <div className='bottomStoryBox'>
              <h2>{author}</h2><h2>{comments} comments</h2>
            </div>
            </div>         
          </div> 
          </div>
    </div>
    )
}

export default SelectedPost;