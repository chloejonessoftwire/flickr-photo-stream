/* eslint-env jquery */

import React, { Component } from 'react';
import './App.css';
var $ = require("jquery");

class Photo extends Component {
  render() {
    return (
      <div class='image-post'>
        <img class='image' src={this.props.photo.media} alt={this.props.photo.title} />
        <div class='title-author'>
          <h3 class='title'> <a href={this.props.photo.link} target='_blank'>{this.props.photo.title} </a></h3>
          <h3 class='author'> by <a href={this.props.photo.author_link} target="_blank">{this.props.photo.author}</a></h3>
        </div>
        <div class='description'>
          <p> Posted on: {this.props.photo.date} at {this.props.photo.time}. </p>
        </div>
        <div class='tags'>
          <p>{this.props.photo.tags}</p>
        </div>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pictures: [],
      page: 1,
      loading: false,
      search: null
    };
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.infiniteScroll);
    this.fetchData(this.state.page);
    this.setState({ loading: true })
  }

  infiniteScroll = () => {
    $(window).scroll(function () {
      if (this.state.loading == true) return;
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 600) {
        let newPage = this.state.page;
        newPage++;
        this.setState({
          page: newPage
        });
        if (this.state.search == null){
          this.fetchData(newPage);
        }
        else{
          this.fetchSearchData(newPage, this.state.search)
        }
      }
    }.bind(this));
  }

  fetchData = (pageNumber) => {
    let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + process.env.REACT_APP_API_KEY + '&format=json&page=' + pageNumber + '&lang?en&safe_search=1&tags=derbyshire&extras=owner_name,url_s,url_m,url_l,date_taken,description,tags&nojsoncallback=1';
    this.setState({
      loading: true
    });
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let pictures = []
        data.photos.photo.map((pic) => {

          var title = pic.title;
          var media = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
          var date = new Date(pic.datetaken).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
          var time = new Date(pic.datetaken).toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });
          var author = pic.ownername;
          if (pic.tags === '') {
            var tags = ''
          }
          else {
            var tags_end = (pic.tags.split(' ')).join(', #');
            var tags_start = 'Tags: #';
            var tags = tags_start + tags_end;          }
          var link = 'https://www.flickr.com/photos/' + pic.owner + '/' + pic.id + '/';
          var author_link = 'https://www.flickr.com/photos/' + pic.owner + '/';

          var pic = {
            title: title,
            media: media,
            date: date,
            time: time,
            author: author,
            tags: tags,
            link: link,
            author_link: author_link
          }
          pictures.push(pic);
        })
        this.setState({
          pictures: [...this.state.pictures, ...pictures]
        });
        this.setState({
          loading: false
        })
      }.bind(this))
      .catch((err) => {
        console.log(err)
      });
  }

  fetchSearchData = (pageNumber, searchQuery) => {
    this.setState(
      {
        loading: true,
      });
    let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + process.env.REACT_APP_API_KEY + '&format=json&page=' + pageNumber + '&lang?en&safe_search=1&text='+searchQuery+'&extras=owner_name,url_s,url_m,url_l,date_taken,description,tags&nojsoncallback=1';
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let pictures = []
        data.photos.photo.map((pic) => {

          var title = pic.title;
          var media = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
          var date = new Date(pic.datetaken).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
          var time = new Date(pic.datetaken).toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });
          var author = pic.ownername;
          if (pic.tags === '') {
            var tags = ''
          }
          else {
            var tags_end = (pic.tags.split(' ')).join(', #');
            var tags_start = 'Tags: #';
            var tags = tags_start + tags_end;
          }
          var link = 'https://www.flickr.com/photos/' + pic.owner + '/' + pic.id + '/';
          var author_link = 'https://www.flickr.com/photos/' + pic.owner + '/';

          var pic = {
            title: title,
            media: media,
            date: date,
            time: time,
            author: author,
            tags: tags,
            link: link,
            author_link: author_link
          }
          pictures.push(pic);
        })
        this.setState({
          pictures: [...this.state.pictures, ...pictures]
        });
        this.setState({
          loading: false
        })
      }.bind(this))
      .catch((err) => {
        console.log(err)
      });
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    window.confirm("Do you want to search for \'" + this.state.search +"\'?");
    this.setState({pictures: [], page:1});
    this.fetchSearchData(this.state.page, this.state.search);
    this.setState({ loading: true });
  }
  myChangeHandler = (event) => {
    this.setState({ search: event.target.value });
  }

  render() {
    return (

      <body id='home'>
        <div data-testid='content'>
          <div class='header'>
            <h1>Flickr Photo Stream</h1>
            <h4> by Chloe Jones</h4>
          </div>
          <div class='search-bar'>
            <form class="form-inline my-2 my-lg-0" onSubmit={this.mySubmitHandler}>
              <input class="form-control mr-sm-2" type="search" placeholder="Search photos" aria-label="Search" onChange={this.myChangeHandler} />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
            </form>
          </div>
          <br />
          <div class='grid-container'>
            {this.state.pictures.map((photodata) => (<Photo photo={photodata} />))}
          </div>
          <div class='footer' id='footer'>
            <img class='footer-image' src='https://peakdistrictwalks.net/wp-content/uploads/2020/06/Bamford-Edge-Peak-District-70.jpg' />
          </div>
        </div>
      </body>
    );
  }
}

export default App;