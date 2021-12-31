import React from 'react'; // Making React available to create components. 
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


//Exposing MainView componenet for other future components. 
export class MainView extends React.Component {    // The following code actually creates the MainView component. 
    constructor() { // Constructor code is executed before render code - setting up the framework for the render. 
        super() //Calling React.Component 
        this.state = {
            movies: [ //creating an object -movies- with an array holding data. 
                { _id: 1, Title: 'Inception', Description: 'test description', ImagePath: 'Test' },
                { _id: 2, Title: 'The Shawshank Redemption', Description: 'test description', ImagePath: 'test' },
                { _id: 3, Title: 'Gladiator', Description: 'test description', ImagePath: 'test' }
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

        if (movies.length === 0) return <div className="main-view"> The list is empty!</div>

        return ( //Maybe add a react fragment here? 
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (  // The code below sets the clicked movie as the newSelectedMovie --- listening for click. 
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                    ))
                }
            </div>
        )
    }
}