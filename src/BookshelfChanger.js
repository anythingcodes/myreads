import React from 'react'
import PropTypes from 'prop-types'
import BookPropType from './BookPropType';


function BookshelfChanger(props) {
  const { book, currentShelf, onBookChange } = props;

  return (
    <div className="book-shelf-changer">
      <select onChange={({ target: { value: shelf }}) => onBookChange(book, shelf)} value={currentShelf}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

BookshelfChanger.propTypes = {
  book: BookPropType,
  currentShelf: PropTypes.string.isRequired,
  onBookChange: PropTypes.func.isRequired
}

BookshelfChanger.defaultProps = {
  currentShelf: 'none'
}

export default BookshelfChanger
