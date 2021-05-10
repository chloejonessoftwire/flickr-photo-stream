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
    // fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+process.env.REACT_APP_API_KEY+'&tags=bakewell&per_page=10&page=1&format=json&nojsoncallback=1&safe_search=1')
    fetch('https://api.flickr.com/services/feeds/photos_public.gne?format=json', {
      mode: 'no-cors',
      method: "post",
      headers: {
           "Content-Type": "application/json"
      }})
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      let picArray = data.photos.photo.map((pic) => {
        var title =pic.title;
        var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        return(
          <div>
            <img alt="dogs" src={srcPath}></img>
            <p> {title}</p>
          </div>
          
        )
      })
      this.setState({pictures: picArray});
    }.bind(this))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.pictures}
        </p>
      </div>
    );
  }
}

export default App;