import React from 'react'
import PropTypes from 'prop-types'
import BookshelfChanger from './BookshelfChanger';
import BookPropType from './BookPropType';

function Book({ book, currentShelf, onBookChange}) {
  const { authors, title, imageLinks } = book;

  return (
  <li>
    <div className="book">
      <div className="book-top">
        {<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks && imageLinks.smallThumbnail ? imageLinks.smallThumbnail : 'http://placehold.it/128x193?text=No%20Cover'}")` }}></div>}
        <BookshelfChanger book={book} currentShelf={currentShelf} onBookChange={onBookChange} />
      </div>
      <div className="book-title">{title}</div>
      {authors && <div className="book-authors">{authors.join(', ')}</div>}
    </div>
  </li>
  )
}

Book.propTypes = {
  book: BookPropType,
  currentShelf: PropTypes.string,
  onBookChange: PropTypes.func.isRequired,
};

export default Book;
