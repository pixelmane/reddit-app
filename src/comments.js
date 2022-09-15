
import Markdown from "markdown-to-jsx"
import { useSelector } from "react-redux"
import MyBackgroundImage1 from './a1.png'
import MyBackgroundImage2 from './a2.png'
import MyBackgroundImage3 from './a3.png'
import MyBackgroundImage4 from './a4.png'
import MyBackgroundImage5 from './a5.png'
import MyBackgroundImage6 from './a6.png'
import MyBackgroundImage7 from './a7.png'
import MyBackgroundImage8 from './a8.png'
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
   
    
        const randomNum = Math.floor(Math.random() * 8 + 1)
        function background2() {
        switch (randomNum){
            case 1:
                return MyBackgroundImage1;
            case 2:
                return MyBackgroundImage2;
            case 3 :
                return MyBackgroundImage3
            case 4:
                return MyBackgroundImage4
                case 5:
                return MyBackgroundImage5;
            case 6:
                return MyBackgroundImage6;
            case 7 :
                return MyBackgroundImage7
            case 8:
                return MyBackgroundImage8
            default:
                return MyBackgroundImage2
        }
        }
        let background = background2()

    return(
        <div className='commentContainer'>
            <div className="authorLogo" style={{backgroundImage: `url(${background})`}}></div>
            <div className="authorBox">
                <div className="authorHeadingBox">
                    <div className="author">{author}</div>
                    <div className="authorTimePosted"> {timeSince(postedAt) > 1 ? timeSince(postedAt) : 'less than 1'} hr Ago</div>
                </div>
                <Markdown className="authorBody">{body}</Markdown>
            </div>
            
            
        </div>
    )
}

