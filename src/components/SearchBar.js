import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  render() {
    const {
      searchText,
      onSearchTextChange,
      bookmarkedOnly,
      onBookmarkedChange,
      selectedGenre,
      onSelectedGenreChange,
    } = this.props;
    return (
      <div className="main-filter">
        <form data-testid="search-bar-form">
          <label className="search-label" htmlFor="search-input" data-testid="text-input-label">
            Pesquisar
            <input
              className="search-input"
              id="search-input"
              data-testid="text-input"
              value={ searchText }
              onChange={ onSearchTextChange }
              type="text"
            />
          </label>
          <label className="search-label" data-testid="checkbox-input-label" htmlFor="search-checkbox">
            Mostrar somente favoritos
            <input
              className="search-checkbox"
              id="search-checkbox"
              type="checkbox"
              onChange={ onBookmarkedChange }
              checked={ bookmarkedOnly }
              data-testid="checkbox-input"
            />
          </label>
          <label className="search-label" data-testid="select-input-label" htmlFor="search-select">
            Filtrar por gênero
            <select
              className="search-input"
              value={ selectedGenre }
              onChange={ onSelectedGenreChange }
              id="search-select"
              data-testid="select-input"
            >
              <option data-testid="select-option" value="">Todos</option>
              <option data-testid="select-option" value="action">Ação</option>
              <option data-testid="select-option" value="comedy">Comédia</option>
              <option data-testid="select-option" value="thriller">Suspense</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  bookmarkedOnly: PropTypes.bool.isRequired,
  onBookmarkedChange: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onSelectedGenreChange: PropTypes.func.isRequired,
};

export default SearchBar;