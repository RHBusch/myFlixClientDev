//

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { render } from 'react-dom';


export class DirectorView extends React.Component {
    render() {
        const { onBackClick, movie, director } = this.props;
        return (<Container>
            <Row>
                <Col></Col>
                <Col>
                    <Card style={{ marginTop: 100, marginBottom: 100, width: 300 }}>
                        <Card.Body className="movieViewCardStyle">
                            <Card.Title style={{ textAlign: 'center' }}>{movie.director.Name}</Card.Title>
                            <Card.Text>{movie.Director.Bio}</Card.Text>
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
        Birth: PropTypes.number,
        Death: PropTypes.number,
    }).isRequired,
};