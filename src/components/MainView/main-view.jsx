import React from 'react'; // Making React available to create components. 
import { BrowserRouter as Router, Route, Routes, Redirect, Link } from "react-router-dom";
import { Link } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types'
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import { NavBar } from '../navbar-view/navbar-view';
import axios from 'axios';
import { render } from 'react-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar, Container, Link, Button, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './main-view.scss';
import { ProfileView } from '../profile-view/profile-view';



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
        const profile = `/users/${user}`;

        return (
            <div>
                <Router>
                    <Row className="main-view justify-content-md-center" style={{ marginTop: 100, marginBottom: 100 }}>
                        <Route exact path="/" render={() => {
                            if (!user) return <Col>
                                <NavBar />
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (user)
                                return movies.map(m => (
                                    <Col md={3} key={m._id}>
                                        <MovieCard movie={m} />
                                        <NavBar user={user} />
                                    </Col>
                                ))
                        }} />
                        <Route exact path="/register" render={() => {
                            if (user) return <Redirect to="/" />
                            return <Col>
                                <RegistrationView />
                                <NavBar />
                            </Col>
                        }} />
                        <Route exact path="/movies/:movieId" render={({ match, history }) => {
                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
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
            </div>
        );
    }
}



/*<Link to={`users/${user}`}>
                                <Button className="movieCardButton" variant="link">{user}</Button>
                            </Link>*/

                           // <Nav.Link id="Account" href={profile} style={{ color: "#55fcfc" }}>My Account</Nav.Link>

/*      <Navbar fixed="top" bg="dark" variant="dark" className="mainNavigation" expand="lg">

           <Navbar.Brand className="navText" href="#home">
               <span>my</span><span class="flixColor">Flix</span><span>App</span>
           </Navbar.Brand>
           <Navbar.Collapse className="justify-content-end">
               <Button onClick={() => this.onLoggedOut()} variant="dark" style={{ color: "#55fcfc" }}>Logout</Button>
               
           </Navbar.Collapse>

       </Navbar>*/

/*   if (movies.length === 0) return <div className="main-view" />
                         return <div> <ProfileView history={history} movies={movies}
                             user={user === match.params.Username} />
                             <Link to={`users/${user}`}>
                                 <Button className="movieCardButton" variant="link">{user + " Profile"}</Button>
                             </Link>
                         </div>*/
/*


  getUser() {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.get(`https://busch-movie-api.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                this.setState({
                    name: response.data.Name,
                    username: response.data.Username,
                    password: response.data.Password,
                    email: response.data.Email,
                    birthday: response.data.Birthday,
                    favoritemovies: response.data.FavoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }



                         username={user}
                         password={password}
                         email={email}
                         name={name}
                         birthday={birthday}
                         favoritemovies={FavoriteMovies}
                         movies={movies}
                         getUser={this.getUser}
*.
/*
--- Logout button isn't working
--- ProfileView is a mess 
---Links in navbar 
---Styling for Logout and TestTest2 
 
 
*/