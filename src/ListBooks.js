import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Shelf from './Shelf';

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    moveToShelf: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf moveToShelf={this.props.moveToShelf} title='Currently Reading' books={this.props.books.filter(book => book.shelf === 'currentlyReading')}/>
              <Shelf moveToShelf={this.props.moveToShelf} title='Want to Read' books={this.props.books.filter(book => book.shelf === 'wantToRead')}/>
              <Shelf moveToShelf={this.props.moveToShelf} title='Read' books={this.props.books.filter(book => book.shelf === 'read')}/>
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