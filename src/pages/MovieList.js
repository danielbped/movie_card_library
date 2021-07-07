import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import MovieCard from '../components/MovieCard';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };

    this.fetchMovies = this.fetchMovies.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
  }

  async fetchMovies() {
    const moviesObj = await movieAPI.getMovies();
    this.setState((prevState) => ({
      movies: [...prevState.movies, ...moviesObj],
      loading: false,
    }));
  }

  render() {
    const { movies, loading } = this.state;
    return (
      <div data-testid="movie-list">
        {loading ? <Loading /> : movies.map(
          (movie) => <MovieCard key={ movie.title } movie={ movie } />,
        )}
        <button type="button"><Link to="/movies/new">ADICIONAR CARTÃO</Link></button>
      </div>
    );
  }
}

export default MovieList;