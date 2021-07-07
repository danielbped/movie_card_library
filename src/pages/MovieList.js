import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
    };

    this.fetchMovies = this.fetchMovies.bind(this);
    this.filteredMovies = this.filteredMovies.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
  }

  onSearchTextChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchText: value,
    });
  }

  onBookmarkedChange = ({ target }) => {
    const { checked } = target;
    this.setState({
      bookmarkedOnly: checked,
    });
  }

  onSelectedGenreChange = ({ target }) => {
    const { value } = target;
    this.setState({
      selectedGenre: value,
    });
  }

  async fetchMovies() {
    const moviesObj = await movieAPI.getMovies();
    this.setState((prevState) => ({
      movies: [...prevState.movies, ...moviesObj],
      loading: false,
    }));
  }

  filteredMovies (moviesToFilter) {
    const { searchText, bookmarkedOnly, selectedGenre } = this.state;
    return moviesToFilter.filter((movie) => {
      if (bookmarkedOnly === false) return movie;
      return movie.bookmarked === true;
    }).filter((movie) => {
      if (selectedGenre === '') return movie;
      return movie.genre === selectedGenre;
    }).filter((movie) => movie.title.includes(searchText)
    || movie.subtitle.includes(searchText)
    || movie.storyline.includes(searchText));
  };

  render() {
    const { searchText, bookmarkedOnly, selectedGenre, movies, loading } = this.state;
    return (
      <div className="main-container">
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.onSearchTextChange }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.onBookmarkedChange }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.onSelectedGenreChange }
        />
        <div className="movie-list" data-testid="movie-list">
          {loading ? <Loading /> : this.filteredMovies(movies).map(
            (movie) => <MovieCard key={ movie.title } movie={ movie } />,
          )}
        </div>
        <button className="add-button" type="button"><Link to="/movies/new">ADICIONAR FILME</Link></button>
      </div>
    );
  }
}

export default MovieList;
