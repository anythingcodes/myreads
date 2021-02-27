import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom';
import './App.css'
import Bookshelf from './Bookshelf';
import SearchBooks from './SearchBooks';
import Book from './Book';

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    searchResults: [],
    query: ''
  };

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      const { currentlyReading, wantToRead, read } = books.reduce((acc, book) => {
        acc[book.shelf].push(book.id);
        return acc;
      }, {
        currentlyReading: [],
        wantToRead: [],
        read: []
      });
      this.setState(() => ({
        books,
        currentlyReading,
        wantToRead,
        read,
      }));
    })
  }

  handleBookChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(({ currentlyReading, read, wantToRead }) => {
      BooksAPI.getAll().then(books => {
        this.setState({
          books,
          currentlyReading,
          read,
          wantToRead
        });
      });
    })
    .catch((e)=> {
      // Handle errors
      console.error(e);
    })
  }

  handleSearch = ({ target: { value: query }}) => {
    this.setState(() => ({
      query
    }));
    if (query) {
      BooksAPI.search(query)
        .then(res => {
          if (res.error) {
            // Intentionally throw to catch
            throw new Error(res.error);
          } else {
            this.setState(() => ({
              searchResults: res
            }));
          }
        })
        .catch(() => {
          this.setState(() => ({
            searchResults: []
          }));
        })
    } else {
      this.setState(() => ({
        searchResults: []
      }));
    }
  }

  getBooksByShelf = (key) => {
    if (!this.state[key]) {
      // Log error
      return [];
    }
    return this.state[key].map(id => this.state.books.find(book => book.id === id));
  }

  getShelfName = (id) => {
    const matchingBook = this.state.books.find(book => book.id === id);
    if (matchingBook) {
      return matchingBook.shelf;
    }
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => history.push('/')}>Close</button>
              <SearchBooks onSearch={this.handleSearch} query={this.state.query} />
            </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.searchResults.map(searchResult => <Book key={searchResult.id} assignedShelf={this.getShelfName(searchResult.id)} book={searchResult} onBookChange={this.handleBookChange} />)}
            </ol>
          </div>
        </div>)} />
        <Route exact path='/' render={({ history }) => (

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf title='Currently Reading' books={this.getBooksByShelf('currentlyReading')} onBookChange={this.handleBookChange} />

              <Bookshelf title='Want to Read' books={this.getBooksByShelf('wantToRead')} onBookChange={this.handleBookChange} />

              <Bookshelf title='Read' books={this.getBooksByShelf('read')} onBookChange={this.handleBookChange} />
            </div>
            <div className="open-search">
              <button onClick={() => history.push('/search')}>Add a book</button>
            </div>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
