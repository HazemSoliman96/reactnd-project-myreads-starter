import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Shelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    moveToShelf: PropTypes.func.isRequired
  };

  render() {
    const { books, moveToShelf, title } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, id) => (
              <li key={id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: book.imageLinks
                          ? `url(${book.imageLinks.thumbnail})`
                          : `url('http://dwwp.wpengine.com/wp-content/uploads/2010/08/00-thumb-template.jpg')`
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf}
                        onChange={event =>
                          moveToShelf(book, event.target.value)
                        }
                      >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="none">None</option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors ? book.authors.join(',') : ''}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
