import './App.css';


function Post(props){
    return (

        <div class='individual-post'>
           <img class='post-photo' src={props.link} alt={props.title}/>
           <div class='post-title'> {props.title}</div>
           <div class='post-author'> {props.author}</div>
           <div class='post-description'> {props.description}</div>
           <div class='post-tags'>{props.tags} </div>
        </div>
     
        
    )
}
export default Post;