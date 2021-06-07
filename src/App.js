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

  getbooks() {
    BooksApi.getAll().then(books => {
      this.setState({ myBooks: books });
    });
  }

  componentDidMount() {
    this.getbooks();
  }

  emptySearch = () => this.setState({ searchResults: [] });

  Query = event => {
    const query = event.target.value;
    if (query !== '') {
      BooksApi.search(query).then(books => {
        if (books.error || !books) {
          this.setState({ searchResults: [] });
        } else {
          books = books.map(book => {
            this.state.myBooks.forEach(myBook => {
              if (myBook.id === book.id) {
                book.shelf = myBook.shelf;
              }
            });
            return book;
          });

          this.setState({ searchResults: books });
        }
      });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  moveToShelf = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksApi.update(book, shelf).then(() => {
        this.getbooks();
      });
    }
  };

  render() {
    const { myBooks, searchResults } = this.state;
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks moveToShelf={this.moveToShelf} books={myBooks} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              empty={this.emptySearch}
              search={this.Query}
              moveToShelf={this.moveToShelf}
              books={searchResults}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
