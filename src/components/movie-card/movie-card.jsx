import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>
            {movie.Title}</div>
    }
};

MovieCard.propTypes = {
    movie: PropTypes.shape({ //props object must include a movie object
        Title: PropTypes.string.isRequired, //movie object may contain a title --- if so, must be a string.
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired //props object must contain onMovieclick and it must be a function
};