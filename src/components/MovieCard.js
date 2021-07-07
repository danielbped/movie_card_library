import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {
  render() {
    const { movie, key } = this.props;
    const { title, imagePath, storyline, id } = movie;
    return (
      <div key={ key } data-testid="movie-card">
        <img src={ imagePath } alt={ title } />
        <h2>{ title }</h2>
        <span>{ storyline }</span>
        <button type="submit">
          <Link to={ `/movies/${id}` }>
            VER DETALHES
          </Link>
        </button>
      </div>
    );
  }
}

MovieCard.propTypes = {
  key: PropTypes.string.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    subtitle: PropTypes.string,
    storyline: PropTypes.string,
    rating: PropTypes.number,
    imagePath: PropTypes.string,
    bookmarked: PropTypes.bool,
    genre: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
