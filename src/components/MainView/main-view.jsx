//Importing Essentials React/Redux/Axios

import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import axios from 'axios';

//Importing Views/Lists
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { NavBar } from '../navbar-view/navbar-view';
import { ProfileView } from '../profile-view/profile-view';
import MoviesList from '../movies-list/movies-list';


//Importing Actions

import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';

//Importing Styling
import './main-view.scss';
import { Col, Row } from 'react-bootstrap';

//Exposing MainView componenet for other future components. 
class MainView extends React.Component {    // The following code actually creates the MainView component. 
    constructor() { // Constructor code is executed before render code - setting up the framework for the render. 
        super() //Calling React.Component 
        this.state = {
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

    setUser(user) {
        this.setState({ user });
        localStorage.setItem('user', JSON.stringify(user));
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
                this.props.setMovies(response.data);

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {

        let { movies } = this.props;
        let { user } = this.state;

        return (

            <Router>
                <Row className="main-view justify-content-center" style={{ marginTop: 100, marginBottom: 100 }}>
                    <Route exact path="/" render={() => {
                        console.log('login')
                        if (!user)
                            return (
                                <Col>
                                    <LoginView
                                        onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    <NavBar />
                                </Col>
                            );
                        if (movies.length === 0) return <div className="main-view justify-content-center" />;
                        console.log(this.state);
                        return <Col>
                            <MoviesList movies={movies} />;
                            <NavBar user={user} />
                        </Col>

                    }} />






                    <Route exact path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                            <NavBar user={user} />
                        </Col>
                    }} />
                    <Route exact path="/movies/:movieId" render={({ match, history }) => {
                        return <Col md={8}>
                            <MovieView movies={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                            <NavBar user={user} />
                        </Col>
                    }} />

                    <Route exact path="/movies/movies/genre/:Name" render={({ match, history }) => {
                        return <Col md={8}>
                            <GenreView Genre={movies.find(m => m.Genre.Name === match.params.Name).Genre} onBackClick={() => history.goBack()} />
                            <NavBar user={user} />
                        </Col>

                    }} />

                    <Route exact path="/movies/movies/director/:Name" render={({ match, history }) => {
                        if (movies.length === 0) return <div className="main-view" />
                        return <Col md={8}>
                            <DirectorView Director={movies.find(m => m.Director.Name === match.params.Name).Director} onBackClick={() => history.goBack()} />
                            <NavBar user={user} />
                        </Col>
                    }} />
                    <Route exact path="/users/:Username" render={({ history, match }) => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        return <Col md={8}>
                            <ProfileView
                                user={user}
                                setUser={(user) => this.setUser(user)}
                                movies={movies}
                                onLoggedOut={() => this.onLoggedOut()}
                                onBackClick={() => history.goBack()}
                            />
                            <NavBar />
                        </Col>
                    }} />
                </Row>
            </Router>

        );

    }
}


let mapStateToProps = state => {
    return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
