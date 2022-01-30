import React from 'react'; // Making React available to create components. 
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Col, Row, Container, Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Redirect, Link } from "react-router-dom";
import axios from 'axios';
import { Navbar, Container, Link, Button, Nav, CardGroup } from 'react-bootstrap';

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: [],
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    onRemoveFavorite = (e, movie) => {
        const Username = localStorage.getItem('user');
        console.log(Username);
        const token = localStorage.getItem('token');
        axios
            .delete(
                `https://busch-movie-api.herokuapp.com/users/${Username}/remvmovies/${movie._id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                console.log(response);
                alert(`${movie.Title} was removed from your favorites.`);
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null,
        });
        window.open('/', '_self');
    }

    getUser = (token) => {
        const Username = localStorage.getItem('user');
        axios
            .get(`https://busch-movie-api.herokuapp.com/users/${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies,
                });
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };

    editUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios
            .put(
                `https://busch-movie-api.herokuapp.com/users/${Username}`,
                {
                    Username: this.state.Username,
                    Password: this.state.Password,
                    Email: this.state.Email,
                    Birthday: this.state.Birthday,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                });

                localStorage.setItem('user', this.state.Username);
                const data = response.data;
                console.log(data);
                console.log(this.state.Username);
                alert('Profile is updated!');
                window.open(`/users/${Username}`, '_self');
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };

    // Deregister
    onDeleteUser() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios
            .delete(`https://busch-movie-api.herokuapp.com/users/remv/${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response);
                alert('Profile has been deleted!');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open(`/`, '_self');
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }

    // Set user values
    setUsername(value) {
        this.setState({
            Username: value,
        });
        this.Username = value;
    }

    setPassword(value) {
        this.setState({
            Password: value,
        });
        this.Password = value;
    }

    setEmail(value) {
        this.setState({
            Email: value,
        });
        this.Email = value;
    }

    setBirthday(value) {
        this.setState({
            Birthday: value,
        });
        this.Birthday = value;
    }

    render() {
        const { movies } = this.props;
        const { FavoriteMovies, Username, Email, Birthday } = this.state;

        return (
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header style={{ textAlign: 'center' }} className="movieCardButton">
                                <h2>User</h2>
                            </Card.Header>
                            <Card.Body className="movieCardBodyStyle">
                                <Card.Text>
                                    <span className="label">Username: </span>
                                    <span className="value">{Username}</span>
                                </Card.Text>
                                <Card.Text>
                                    <span className="label">Email: </span>
                                    <span className="value">{Email}</span>
                                </Card.Text>
                                <Card.Text>
                                    <span className="label">Birthday: </span>
                                    <span className="value">{Birthday}</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>


                    <Col>
                        <Card>

                            <Card.Header style={{ textAlign: 'center' }} className="movieCardButton">
                                <h2>Update Profile</h2>
                            </Card.Header>
                            <Card.Body className="movieCardBodyStyle">
                                <Form
                                    onSubmit={(e) =>
                                        this.editUser(
                                            e,
                                            this.Username,
                                            this.Password,
                                            this.Email,
                                            this.Birthday
                                        )
                                    }
                                >
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Username"
                                            placeholder="New Username"
                                            onChange={(e) => this.setUsername(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="Password"
                                            placeholder="New Password"
                                            onChange={(e) => this.setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="Email"
                                            placeholder="New Email"
                                            onChange={(e) => this.setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="Birthday"
                                            onChange={(e) => this.setBirthday(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="button-group">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            onClick={() => this.editUser}
                                            className="movieCardButton"
                                        >
                                            Update User
                                        </Button>
                                        <Button
                                            className="delete-button"
                                            variant="danger"
                                            onClick={() => this.onDeleteUser()}
                                            className="movieCardButton"
                                        >
                                            Delete User
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card style={{ marginTop: 100, marginBottom: 100, width: 300 }}>
                            <Card.Header style={{ textAlign: 'center' }} className="movieCardButton" >
                                <h2>Favorite Flix</h2>
                            </Card.Header>

                            <Card.Body>
                                {FavoriteMovies.length === 0 && (
                                    <div className="text-center">No Favorite Movies</div>
                                )}
                                {FavoriteMovies.length > 0 &&
                                    movies.map((movie) => {
                                        if (
                                            movie._id ===
                                            FavoriteMovies.find((favoriteMovie) => favoriteMovie === movie._id)
                                        ) {
                                            return (

                                                <Container key={movie._id} className="movieCardBodyStyle">
                                                    <Card>
                                                        <Card.Body className="movieCardBodyStyle">
                                                            <Card.Title style={{ textAlign: 'center' }}>
                                                                {movie.Title}
                                                            </Card.Title>
                                                            <Card.Img
                                                                variant="top"
                                                                src={movie.ImagePath}
                                                            />
                                                            <Button
                                                                className="text-center"
                                                                size="lg"
                                                                value={movie._id}
                                                                onClick={(e) => this.onRemoveFavorite(e, movie)}
                                                                className="movieCardButton">
                                                                Remove </Button>
                                                        </Card.Body>
                                                    </Card>
                                                </Container>)
                                        }
                                    })}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
        )
    }
}



