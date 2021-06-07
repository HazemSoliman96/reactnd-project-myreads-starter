import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import * as BooksApi from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {

  state = {
    myBooks: [],
    searchResults: []
  };

  componentDidMount() {
    BooksApi.getAll()
    .then(books => {
      this.setState({myBooks: books});
    });
  };

  render() {
    return (
      <div>
        <Route exact path='/' render={() =>(
          <ListBooks books={this.state.myBooks}/>
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp;
