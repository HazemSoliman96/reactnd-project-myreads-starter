import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DebounceInput from 'react-debounce-input';
import PropTypes from 'prop-types';
import Shelf from './Shelf';


class SearchBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    empty: PropTypes.func.isRequired,
    moveToShelf: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.empty();
  }

  render() {
    return (
      <div className="app">
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <DebounceInput
                  debounceTimeout={300}
                  element='input'
                  type="text"
                  value={this.props.books.string}
                  onChange={this.props.search}
                  placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <Shelf moveToShelf={this.props.moveToShelf} title='Search Results' books={this.props.books}/>
            </div>
          </div>
          </div>
    )
  }
}

export default SearchBooks;