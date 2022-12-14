
import './App.css';
import {  StoryFactory } from './storyBuilder.js'

import { changeSubject } from './storySlice.js'
import { useDispatch } from 'react-redux';
import { SearchBar } from './searchBar';


function App() {
  const dispatch = useDispatch()
  function handleChange(e){
    
    dispatch(changeSubject(e.target.value))
  }
  return (
    <div className="App">
      
        <div id='navBar'>
          <div style={{display: 'flex', alignItems: 'center'}}><div id='logoHolder'></div><h1 id='reddit'>Reddit Client</h1></div>
          <SearchBar />
          <div id='dropSearch'>
              <select onChange={handleChange}>
                <option value='popular'>r/popular</option>
                <option value='nintendo'>r/nintendo</option>
                <option value='walmart'>r/walmart</option>
                <option value='pets'>r/pets</option>
                <option value='memes'>r/memes</option>
                <option value='wallstreetbets'>r/wallstreetbets</option>
                <option value='art'>r/art</option>
                <option value='nfl'>r/nfl</option>
                <option value='food'>r/food</option>
              </select></div>
     </div>
     
        <div id='scrollCont'>
          <StoryFactory />
          
          </div>
        
    </div>
  );
}

export default App;
