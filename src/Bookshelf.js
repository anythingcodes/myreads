import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book';

function Bookshelf({ books, onBookChange, title }) {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
        {books.map((book) => <Book key={book.id} book={book} currentShelf={book.shelf} onBookChange={onBookChange} />)}
      </ol>
    </div>
  </div>);
}

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default Bookshelf;
