import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap'
import './movie-card.scss'
import { Link } from "react-router-dom";


export class MovieCard extends React.Component {
    render() {
        const { movies } = this.props;



        return (
            <Card className="movieCardStyle">
                <Card.Img variant="top" src={movies.ImagePath} />
                <Card.Body className="movieCardBodyStyle">
                    <Card.Title>{movies.Title}</Card.Title>
                    <Card.Text>{movies.Description}</Card.Text>
                    <Link to={`/movies/${movies._id}`}>
                        <Button className="movieCardButton" variant="link">Open</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    }
};

//Validating data inputs. 

MovieCard.propTypes = {
    movies: PropTypes.shape({ //props object must include a movie object
        Title: PropTypes.string.isRequired, //movie object may contain a title --- if so, must be a string.
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired
            //  Birth: PropTypes.number.isRequired,
            //  Death: PropTypes.number.isRequired,
        }),
        Featured: PropTypes.bool.isRequired
    }).isRequired,
};
