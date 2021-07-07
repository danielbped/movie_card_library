import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.fetchMovie = this.fetchMovie.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      movie: [],
      loading: true,
      shouldRedirect: false,
    };
  }

  componentDidMount() {
    this.fetchMovie();
  }

  handleSubmit(movieId) {
    movieAPI.deleteMovie(movieId)
      .then(() => {
        this.setState({
          shouldRedirect: true,
        });
      });
  }

  async fetchMovie() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const movie = await movieAPI.getMovie(id);
    this.setState({
      movie,
      id,
      loading: false,
    });
  }

  render() {
    const { movie, id, shouldRedirect } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle } = movie;
    const { loading } = this.state;
    if (loading) return <Loading />;
    if (shouldRedirect) return <Redirect to="/" />;
    return (
      <div className="movie-details" data-testid="movie-details">
        <h2 className="movie-details-title">{ title }</h2>
        <img className="movie-details-image" alt="Movie Cover" src={ `../${imagePath}` } />
        <p className="movie-details-subtitle">{ `Subtitle: ${subtitle}` }</p>
        <p className="movie-details-storyline">{ `Storyline: ${storyline}` }</p>
        <p className="movie-details-genre">{ `Genre: ${genre}` }</p>
        <p className="movie-details-rating">{ `Rating: ${rating}` }</p>
        <div className="movie-details-buttons">
          <button className="movie-details-button-back" type="button">
            <Link to="/">VOLTAR</Link>
          </button>
          <button className="movie-details-button-edit" type="button">
            <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
          </button>
          <button className="movie-details-button-delete" onClick={ () => this.handleSubmit(id) } type="button">
            <Link to="/">DELETAR</Link>
          </button>
        </div>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieDetails;
