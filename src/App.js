import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {
  constructor(){
    super();
    this.state = {
      pictures: [],
    };
  }

  componentDidMount(){
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+process.env.REACT_APP_API_KEY+'&format=json&lang?en&safe_search=1&tags=derbyshire&extras=owner_name,url_s,url_m,url_l,date_taken,description,tags&nojsoncallback=1')
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      let picArray = data.photos.photo.map((pic) => {
        var title =pic.title;
        var media = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        var date= new Date(pic.datetaken).toLocaleDateString('en-GB', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
        var time = new Date(pic.datetaken).toLocaleTimeString('en-GB',{ hour: 'numeric',minute: 'numeric', hour12: true });
        var author = pic.ownername;
        if (pic.tags==''){
          var tags = ''
        }
        else{
          var tags=(pic.tags.split(' ')).join(', #');
        }
        var link = 'https://www.flickr.com/photos/'+pic.owner+'/'+pic.id+'/';
        var author_link='https://www.flickr.com/photos/'+pic.owner+'/';

        return(
          <div class='image-post'>
            <img class='image' src={media} alt={title}/>
            <div class='title-author'>
              <h3 class='title'> <a href={link} target='_blank'>{title} </a></h3>
              <h3 class='author'> by <a href={author_link} target="_blank">{author}</a></h3>
            </div>
            <div class='description'>
              <p> Posted on: {date} at {time}. </p>
            </div>
            <div class='tags'> 
                <p> Tags:  #{tags}</p>
            </div>
           </div>
          
        )
      })
      this.setState({pictures: picArray});
    }.bind(this))
  }

  render() {
    return (

      <body id='home'>
        <div>
          <div class='header'>
            <h1>Flickr Photo Stream</h1>
            <h4> by Chloe Jones</h4>
          </div>
        {/* <div class='search-bar'>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search flickr for photos" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div> */}
          <br/>
          <div class='grid-container'>
          {this.state.pictures}
          </div>
          <div class='footer'>
            <img class='footer-image' src='https://peakdistrictwalks.net/wp-content/uploads/2020/06/Bamford-Edge-Peak-District-70.jpg'/>
          </div>
        </div>
      </body>
    );
  }
}

export default App;