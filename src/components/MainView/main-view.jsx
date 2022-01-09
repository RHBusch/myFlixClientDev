import React from 'react'; // Making React available to create components. 
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types'
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import axios from 'axios';
import { render } from 'react-dom';



//Exposing MainView componenet for other future components. 
export class MainView extends React.Component {    // The following code actually creates the MainView component. 
    constructor() { // Constructor code is executed before render code - setting up the framework for the render. 
        super() //Calling React.Component 
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: 'false'
        }
    }
    componentDidMount() {
        axios.get('https://busch-movie-api.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }


    render() { //The render () function is what returns the visual state of the component. Only one root element allowed. 
        const { movies, selectedMovie, user, registered } = this.state;

        /* if (!user) return <RegistrationView />*/

        if (!user) return <div> <button type="submit" onCLick={<RegistrationView />}> Take me to the registration page!</button>
            <br></br>
            <LoginView onLoggedIn={
                user => this.onLoggedIn(user)} />
        </div>


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