import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {
  render() {
    const { movie, key } = this.props;
    const { title, imagePath, storyline, id } = movie;
    return (
      <div key={ key } className="movie-card" data-testid="movie-card">
        <img className="movie-image" src={ imagePath } alt={ title } />
        <h2 className="movie-title">{ title }</h2>
        <span className="movie-storyline">{ storyline }</span>
          <Link to={ `/movies/${id}` }>
            <button className="button-details" type="submit">
              VER DETALHES
            </button>
          </Link>
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
