import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { MovieCard } from '../movie-card/movie-card';


export class DirectorView extends React.Component {

    render() {
        const { movie, onBackClick, Director } = this.props;
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card style={{ marginTop: 100, marginBottom: 100, width: 300 }}>

                            <Card.Body className="movieViewCardStyle">
                                <Card.Title>{movie.Director.Name}</Card.Title>
                                <Card.Text>{movie.Director.Description}</Card.Text>
                                <Button className="movieViewButton" onClick={() => onBackClick()} variant="light">Back</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        )
    }
}

DirectorView.proptypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
    }).isRequired,
};