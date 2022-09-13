
import { useSelector } from "react-redux"


export function Comments() {
   

   
    const commentsList = useSelector(state => state.stories.comments)
    
    return (
        <div className="commentsContainer">
            
            {commentsList.map(element => <Comment author={element.author} 
                                                    body={element.body}
                                                    postedAt={element.postedAt} />)}
        </div>
    )
}

function Comment( {author, body, postedAt } ){
    function timeSince(timePosted){
        
        let dateFormatted = Date.now() / 1000
        
        let timeBetween = dateFormatted - timePosted
        let hoursBetween = Math.floor(timeBetween/3600)
       
        return hoursBetween
        
    }
    return(
        <div className='commentContainer'>
            <div className="authorLogo"></div>
            <div className="authorBox">
                <div className="authorHeadingBox">
                    <div className="author">{author}</div>
                    <div className="authorTimePosted"> {timeSince(postedAt)} hr Ago</div>
                </div>
                <div className="authorBody">{body}</div>
            </div>
            
            
        </div>
    )
}

