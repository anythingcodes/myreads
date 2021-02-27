import PropTypes from 'prop-types';

export default PropTypes.shape({
  authors: PropTypes.array,
  id: PropTypes.string.isRequired,
  imageLinks: PropTypes.shape({
    smallThumbnail: PropTypes.string,
    thumbnail: PropTypes.string
  }),
  title: PropTypes.string.isRequired
}).isRequired;
