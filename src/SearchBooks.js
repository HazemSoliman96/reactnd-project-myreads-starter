import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DebounceInput from 'react-debounce-input';
import Shelf from './Shelf';


class SearchBooks extends Component {

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
              <Shelf title='Search Results' books={this.props.books}/>
            </div>
          </div>
          </div>
    )
  }
}

export default SearchBooks;