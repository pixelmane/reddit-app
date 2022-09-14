import { useDispatch, useSelector } from "react-redux"
import { filterTopics } from "./storySlice";
import { useEffect, useState } from "react";
export function SearchBar() {
    let termValue = useSelector(state => state.stories.searchTerm)
    const [term, setTerm] = useState('')
    let dispatch = useDispatch();
    function handleChange(e) {
        setTerm(e.target.value)
        
    }
    useEffect(() => {
        dispatch(filterTopics(term))
    }, [term])
    return (
        <div id="searchBarContainerContainer">
            <div id='searchBarContainer'>
              <input value={termValue} onChange={handleChange} id='searchBar' placeholder='search'></input>
            </div>
          </div>
    )
}