import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  render() {
    return (
      <div>
        <Route exact path='/' render={() =>(
          <ListBooks/>
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
