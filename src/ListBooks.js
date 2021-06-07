import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';

class ListBooks extends Component {
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf title='Currently Reading' books={this.props.books.filter(book => book.shelf === 'currentlyReading')}/>
              <Shelf title='Want to Read' books={this.props.books.filter(book => book.shelf === 'wantToRead')}/>
              <Shelf title='Read' books={this.props.books.filter(book => book.shelf === 'read')}/>
              </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default ListBooks;