import React from 'react'; // Making React available to create components. 
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types'
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import axios from 'axios';
import { render } from 'react-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar, Container } from 'react-bootstrap';
import './main-view.scss';



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
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({ user: null });
    }

    getMovies(token) {
        axios.get('https://busch-movie-api.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render() { //The render () function is what returns the visual state of the component. Only one root element allowed. 
        const { movies, selectedMovie, user, registered } = this.state;


        if (!user) return <div>
            <LoginView onLoggedIn={
                user => this.onLoggedIn(user)} />
        </div>

        if (movies.length === 0) return <div className="main-view"> The list is empty!</div>

        return (

            <div>

                <Navbar fixed="top" bg="dark" variant="dark" className="mainNavigation" expand="lg">
                    <Container>
                        <Navbar.Brand className="navText" href="#home">
                            <span>my</span><span class="flixColor">Flix</span><span>App</span>
                        </Navbar.Brand>
                    </Container>
                </Navbar>


                <Row className="main-view justify-content-md-center" style={{ marginTop: 100, marginBottom: 100 }}>
                    {selectedMovie
                        ? (
                            <Col md={8}>
                                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        )
                        :

                        movies.map(movie => (
                            <Col md={3}>
                                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
    }
}
