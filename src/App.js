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

  moveToShelf = (book, shelf) => {
    if(shelf === 'none') {
      this.setState(currentState => ({
        myBooks: currentState.myBooks.filter(myBook => myBook.id !== book.id)
      }));
    } else if(book.shelf !== shelf) {
      let books, search = [];
      let myBooksId = this.state.myBooks.map(book => book.id);
      let searchResultsId = this.state.searchResults.map(book => book.id);
      BooksApi.update(book, shelf)
      .then(() => {
        if(myBooksId.includes(book.id) || searchResultsId.includes(book.id)) {
          books = this.state.myBooks.map(mybook => mybook.id === book.id ? {...mybook, shelf} : mybook);
          search = this.state.searchResults.map(mybook => mybook.id === book.id ? {...mybook, shelf} : mybook);
        } else {
          book.shelf = shelf;
          books = [...myBooks, book];
          search = [...searchResults, book];
        }
        this.setState({
          myBooks: books,
          searchResults: search
        })
      });
    }
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() =>(
          <ListBooks moveToShelf={this.moveToShelf} books={this.state.myBooks}/>
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks empty={this.emptySearch} search={this.Query} moveToShelf={this.moveToShelf} books={this.state.searchResults} />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
