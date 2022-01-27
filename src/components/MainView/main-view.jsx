import React from 'react'; // Making React available to create components. 
import { BrowserRouter as Router, Route, Routes, Redirect, Link } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types'
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import axios from 'axios';
import { render } from 'react-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar, Container, Link, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
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
        const { movies, movie, selectedMovie, user } = this.state;

        return (
            <div>

                <Navbar fixed="top" bg="dark" variant="dark" className="mainNavigation" expand="lg">
                    <Container>
                        <Navbar.Brand className="navText" href="#home">
                            <span>my</span><span class="flixColor">Flix</span><span>App</span>
                        </Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Button onClick={() => this.onLoggedOut()} variant="dark" style={{ color: "#55fcfc" }}>Logout</Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Router>

                    <Row className="main-view justify-content-md-center" style={{ marginTop: 100, marginBottom: 100 }}>

                        <Route exact path="/" render={() => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            return movies.map(m => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            ))
                        }} />
                        <Route exact path="/register" render={() => {
                            if (user) return <Redirect to="/" />
                            return <Col>
                                <RegistrationView />
                            </Col>
                        }} />
                        <Route exact path="/movies/:movieId" render={({ match, history }) => {
                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />

                        <Route exact path="/movies/movies/genre/:Name" render={({ match, history }) => {
                            return <Col md={8}>
                                <GenreView Genre={movies.find(m => m.Genre.Name === match.params.Name).Genre} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />

                        <Route exact path="/movies/movies/director/:Name" render={({ match, history }) => {
                            if (movies.length === 0) return <div className="main-view" />
                            return <Col md={8}>
                                <DirectorView Director={movies.find(m => m.Director.Name === match.params.Name).Director} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                        <Route exact path="/users/:Username" render={({ history, match }) => {
                            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            if (movies.length === 0) return <div className="main-view" />
                            return <div> <ProfileView history={history} movies={movies}
                                user={user === match.params.Username} />
                                <Link to={`/users/${user.Username}`}>
                                    <Button className="movieCardButton" variant="link">{user + " Profile"}</Button>
                                </Link>
                            </div>
                        }} />
                    </Row>
                </Router>
            </div>
        );
    }
}

