import React from 'react';
import img from '/img/placekitten.jpeg';


export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;
        return (<div className="movie-view">
            <div className="movie-poster">
                <img src={img} />
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
        )// ^^^ The onBackClick button above will need to have new code added to actually point it in a direction. 
    }
}
