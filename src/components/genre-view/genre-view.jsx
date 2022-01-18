import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { render } from 'react-dom';


export class GenreView extends React.Component {
    render() {
        const { Genre, onBackClick, movie } = this.props;
        return (<Container>
            <Row>
                <Col></Col>
                <Col>
                    <Card style={{ marginTop: 100, marginBottom: 100, width: 300 }}>
                        <Card.Body className="movieViewCardStyle">
                            <Card.Title style={{ textAlign: 'center' }}>{genre.Name}</Card.Title>
                            <Card.Text>{movie.Description}</Card.Text>
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

GenreView.proptypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string,
    }).isRequired,
};