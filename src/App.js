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

  emptySearch = () => this.setState({searchResults: []});

  Query = (event) => {
    const query = event.target.value;
    if(query !== '') {
      BooksApi.search(query)
      .then(books => {
        if(books.error || !books) {
          this.setState({searchResults: []});
        } else {
          books = books.map(book => {
            this.state.myBooks.forEach(myBook => {
              if(myBook.id === book.id) {
                book.shelf = myBook.shelf;
              }
            });
            return book;
          });

          this.setState({searchResults: books});
        }
      })
    } else {
      this.setState({searchResults: []});
    }
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() =>(
          <ListBooks books={this.state.myBooks}/>
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks empty={this.emptySearch} search={this.Query} books={this.state.searchResults} />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
