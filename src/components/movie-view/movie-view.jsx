//Change movieview back to movie..
import React from 'react';
import './movie-view'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Col, Row, Container, } from 'react-bootstrap'
import { Link } from "react-router-dom";
import './movie-view.scss'
import axios from 'axios';
import moviesApp from '../../reducers/reducers';


export class MovieView extends React.Component {

    constructor(props) {
        super(props);
    }
    addFavFlix() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const { movies } = this.props;


        axios.post(`https://busch-movie-api.herokuapp.com/users/${user}/movies/${movies._id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
                method: 'POST'
            }
        )
            .then((response) => {
                alert(`Added ${movies.Title} to your fav flix list!`)
            })
            .catch(function (error) {
                console.log(error);
            })

    }





    render() {
        const { movies, onBackClick } = this.props;
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card style={{ marginTop: 100, marginBottom: 100, width: 300 }}>
                            <Card.Img variant="top" src={movies.ImagePath} />
                            <Card.Body className="movieViewCardStyle">
                                <Card.Title>{movies.Title}</Card.Title>
                                <Card.Text>{movies.Description}</Card.Text>
                                <Button className="movieViewButton" onClick={() => onBackClick()} variant="light">Back</Button>
                                <br></br>
                                <br></br>
                                <Link to={`movies/director/${movies.Director.Name}`}>
                                    <Button className="movieCardButton" variant="link">{movies.Director.Name}</Button>
                                </Link>
                                <br></br>
                                <br></br>
                                <Link to={`movies/genre/${movies.Genre.Name}`}>
                                    <Button className="movieCardButton" variant="link">{movies.Genre.Name + " Films"}</Button>
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

