
import Post from './Post.jsx';
import './App.css';
import { useEffect, useState } from 'react';

const axios = require('axios');

function PostPage() {
  const [myData, setMyData] = useState(null)

  axios.get("https://api.flickr.com/services/feeds/photos_public.gne?tags=kitten&format=json&nojsoncallback=true") 
  .then((response) => {
    console.log(response.data.items);
    setMyData(response.data);
    // this.setState({
    //     items: response.data.items
    // })
  })
  .catch((err) => {
  console.log(err)
  })

    // useEffect(() => {
    // fetch("https://api.flickr.com/services/feeds/photos_public.gne?format=json", {async: true, crossDomain:}).then(response => response.json()).then(data => {
    //   console.log(data)  
    //   setMyData(data)

    
    // })

//   }, []);
  
  if (!myData) {
    return (<div> Waiting for data </div>)
  }

  return ( <div class='posts-page'> {myData.items.map(item=>{
     return <Post post={item}/> })} </div> )
 };
export default PostPage;