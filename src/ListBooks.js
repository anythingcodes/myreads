import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListBooks = ({ books, onEditBook }) => {

  const [query, setQuery] = useState('');

  const updateQuery = (query) => setQuery(query.trim());

  const visibleBooks = query === '' ? books : books.filter(({name}) => name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="list-contacts">
      <div className="list-contacts-top">
          <input
            className="search-contacts" type="text"
            placeholder="Search Contacts"
            value={query}
            onChange={({ target: { value }}) => updateQuery(value)}
        />
        <Link to="/create" className="add-contact">Add Contact</Link>
      </div>
      <ol className="contact-list">
        {visibleBooks.map((book) => {
          const { avatarURL, handle, id, name } = book;
          return (<li key={id} className="contact-list-item">
            <div className="contact-avatar"
              style={{backgroundImage: `url(${avatarURL})`}}
            />
            <div className="contact-details">
              <p>{name}</p>
              <p>{handle}</p>
            </div>
            <button className="contact-remove" onClick={() => onEditBook(book)}>Remove</button>
          </li>)
        }
        )}
      </ol>
    </div>
  );
};

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onEditBook: PropTypes.func.isRequired,
}


export default ListBooks;
