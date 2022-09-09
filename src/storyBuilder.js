import { useEffect } from "react"
import { useDispatch } from 'react-redux'; 
import { storyGrabber } from './storySlice.js'

export function Story() {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(storyGrabber('mom'))
    },[])
    return (
        <div className='storyBox'>
           
            <div className='rightStoryBox'>
            <div className='topStoryBox'>
            <div className='leftStoryBox'>
              <h2 className='topArrow'>^</h2>
              <h2>14.3k</h2>
              <h2 className='bottomArrow'>^</h2>
            </div>
            <h1 className='title'>Title: moms are coming fast! and thre are more of them than there are of you</h1>
            </div>
            <div className='storyImage' style={{  
  backgroundImage: "url(" + "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" + ")"

}}></div>
            <div className='bottomStoryBox'>
              <h2>username</h2><h2>posted x hours ago</h2><h2>457 comments</h2>
            </div>
            </div>         
          </div> 
    )
}