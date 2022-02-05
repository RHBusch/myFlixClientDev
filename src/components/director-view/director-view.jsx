import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Container, Card, Button, Row, Col } from "react-bootstrap";


export class DirectorView extends React.Component {

    render() {
        const { onBackClick, Director } = this.props;
        return (

            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card style={{ marginTop: 100, marginBottom: 100, width: 300 }}>

                            <Card.Body className="movieViewCardStyle">
                                <Card.Title>{Director.Name}</Card.Title>
                                <Card.Text>{Director.Bio}</Card.Text>
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

//Confirming validity of data. 

DirectorView.proptypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
    }).isRequired,
};

