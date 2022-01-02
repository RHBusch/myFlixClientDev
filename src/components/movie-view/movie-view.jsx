import React from 'react';

let moviePosterStyle = {
    height: '300px',
};



export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;
        return (<div className="movie-view">
            <div className="movie-poster">
                <img src={movie.ImagePath} style={moviePosterStyle} />
            </div>
            <div className="movie-title">
                <span className="label"> Title:</span>
                <span className="value"> {movie.Title}</span>
            </div>
            <div className="movie-description">
                <span className="label"> Description: </span>
                <span className="value">{movie.Description}</span>
            </div>
            <button onClick={() => { onBackClick(null) }}>Back</button>
        </div>
            // ^^^ The onBackClick button above will need to have new code added to actually point it in a direction. 
        )
    }
}
