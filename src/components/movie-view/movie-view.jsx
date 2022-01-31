import React from 'react';
import './movie-view'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Col, Row, Container, } from 'react-bootstrap'
import { Link } from "react-router-dom";
import './movie-view.scss'
import axios from 'axios';


export class MovieView extends React.Component {

    constructor(props) {
        super(props);
    }
    addFavFlix() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const { movie } = this.props;


        axios.post(`https://busch-movie-api.herokuapp.com/users/${user}/movies/${movie._id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
                method: 'POST'
            }
        )
            .then((response) => {
                alert(`Added ${movie.Title} to your fav flix list!`)
            })
            .catch(function (error) {
                console.log(error);
            })

    }





    render() {
        const { movie, onBackClick } = this.props;
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card style={{ marginTop: 100, marginBottom: 100, width: 300 }}>
                            <Card.Img variant="top" src={movie.ImagePath} />
                            <Card.Body className="movieViewCardStyle">
                                <Card.Title>{movie.Title}</Card.Title>
                                <Card.Text>{movie.Description}</Card.Text>
                                <Button className="movieViewButton" onClick={() => onBackClick()} variant="light">Back</Button>
                                <br></br>
                                <br></br>
                                <Link to={`movies/director/${movie.Director.Name}`}>
                                    <Button className="movieCardButton" variant="link">{movie.Director.Name}</Button>
                                </Link>
                                <br></br>
                                <br></br>
                                <Link to={`movies/genre/${movie.Genre.Name}`}>
                                    <Button className="movieCardButton" variant="link">{movie.Genre.Name + " Films"}</Button>
                                </Link>
                                <br></br>
                                <br></br>
                                <Button className="movieViewButton" onClick={(e) => this.addFavFlix(e, movie)}>
                                    Add Fav
                                </Button>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container >
        )

    }
}

/*<Button
                                    variant="outline-primary"
                                    className="btn-outline-primary"
                                    value={movie._id}
                                    onClick={(e) => this.addFavFlix(e, movie)}
                                >
                                    Add to Favorites
                                </Button>*/

