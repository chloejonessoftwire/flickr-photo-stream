
import Post from './Post.jsx';
import './Fonts.css'
import './App.css';
import { useEffect, useState } from 'react';

const axios = require('axios');

function PostPage() {
  const [myData, setMyData] = useState(null)

  axios.get("https://api.flickr.com/services/feeds/photos_public.gne?tags=kitten&format=json&nojsoncallback=true") 
  .then((response) => {
    console.log(response.data.items);
    setMyData(response.data);

  })
  .catch((err) => {
  console.log(err)
  })


  if (!myData) {
    return (<div> Waiting for data </div>)
  }

  return ( <div class='posts-page'> {myData.items.map(item=>{
     return <Post post={item}/> })} </div> )
 };
export default PostPage;