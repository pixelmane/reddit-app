
import './App.css';
import { Story, StoryFactory } from './storyBuilder.js'
import storySlice from './storySlice';
import { changeSubject } from './storySlice.js'
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  function handleChange(e){
    console.log('subject is changing')
    dispatch(changeSubject(e.target.value))
  }
  return (
    <div className="App">
      
        <div id='navBar'>
          <div id='logoHolder'></div><h1 id='reddit'>Reddit Client</h1>
          <div id='dropSearch'>
              <select onChange={handleChange}>
                <option value='popular'>r/popular</option>
                <option value='nintendo'>r/nintendo</option>
                <option value='walmart'>r/walmart</option>
                <option value='pets'>r/pets</option>
                <option value='memes'>r/memes</option>
              </select></div>
     </div>
        <div id='scrollCont'>
          <StoryFactory />
         <Story />
          <div className='storyBox'>
           
            <div className='rightStoryBox'>
            <div className='topStoryBox'>
            <div className='leftStoryBox'>
             
              <h2>14.3k</h2>
              
            </div>
            <h1 className='title'>Title: moms are coming fast! and thre are more of them than there are of you</h1>
            </div>
            <div className='storyImage' style={{  
  backgroundImage: undefined, height: '0px'

}}></div>
            <div className='bottomStoryBox'>
              <h2>username</h2><h2>posted x hours ago</h2><h2>457 comments</h2>
            </div>
            </div>         
          </div> 
          <div className='storyBox'>
            <h1>Title: moms are coming fast!</h1>
            <div className='storyImage'>imagecontainer</div>
            <h2 className='bottomStoryBox'>username, time posted ago, number of comments</h2>
          </div>
          <div className='storyBox'>
            <h1>Title: moms are coming fast!</h1>
            <div className='storyImage'>imagecontainer</div>
            <h2>username, time posted ago, number of comments</h2>
          </div>
          <div className='storyBox'>
            <h1>Title: moms are coming fast!</h1>
            <div className='storyImage'>imagecontainer</div>
            <h2>username, time posted ago, number of comments</h2>
          </div>
          <div className='storyBox'>
            <h1>Title: moms are coming fast!</h1>
            <div className='storyImage'>imagecontainer</div>
            <h2>username, time posted ago, number of comments</h2>
          </div>
        </div>
        
        
    </div>
  );
}

export default App;
