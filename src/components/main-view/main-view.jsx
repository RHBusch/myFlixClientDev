import React from 'react'; // Making React available to create components. 
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

//Exposing MainView componenet for other future components. 
export default class MainView extends React.Component {    // The following code actually creates the MainView component. 
    constructor() {
        super()
        this.state = {
            movies: [
                { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...' },
                { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...' },
                { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...' }
            ],
            selectedMovie: null
        }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        })
    }

    render() { //The render () function is what returns the visual state of the component. Only one root element allowed. 
        const { movies, selectedMovie } = this.state;

        if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.SelectedMovie(newSelectedMovie) }} />;

        if (movies.length === 0) return <div className="main-view"> The list is empty!</div>

        return ( //Maybe add a react fragment here? 
            <div className="main-view">
                {movies.map(movie => <MovieCard key={movie._id}
                    onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)}
            </div>
        )
    }
}
