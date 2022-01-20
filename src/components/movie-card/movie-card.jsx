import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './movie-card.scss'
import { Link } from "react-router-dom";


export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;



        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body className="movieCardBodyStyle">
                    <Card.Title>{movie.Director.Name}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button className="movieCardButton" variant="link">Open</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    }
};

MovieCard.propTypes = {
    movie: PropTypes.shape({ //props object must include a movie object
        Title: PropTypes.string.isRequired, //movie object may contain a title --- if so, must be a string.
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }),
        Ratings: PropTypes.shape({
            IMDB: PropTypes.number.isRequired,
            RottenTomatoes: PropTypes.number.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.number.isRequired,
            Death: PropTypes.number.isRequired,
        }),
        Featured: PropTypes.bool.isRequired
    }).isRequired,
};