import React from 'react';
import './movie-view'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Col, Row, Container } from 'react-bootstrap'
import './movie-view.scss'





export class MovieView extends React.Component {

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
                                <Button className="movieViewButton" onClick={() => onBackClick(null)} variant="light">Back</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        )
        // ^^^ The onBackClick button above will need to have new code added to actually point it in a direction. 

    }
}