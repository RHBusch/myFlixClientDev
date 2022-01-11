import { array } from 'prop-types';
import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, Button, Card, Container, Row, Col } from 'react-bootstrap';

// setting state of username and password as empty by default
export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [favMovies, setfavMovies] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    }

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col>
                    <Card style={{ marginTop: 100, marginBottom: 100, width: 300 }}>
                        <Card.Body>
                            <Card.Title>Register Here!</Card.Title>
                            <Form>
                                <Form.Group controlId="formGroupUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" value={username}
                                        onChange={e => setUsername(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" value={password}
                                        onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formGroupBirthday">
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control type="date" value={birthday}
                                        onChange={e => setBirthday(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formGroupMovies">
                                    <Form.Label>Favorite Movies:</Form.Label>
                                    <Form.Control type="array" value={array}
                                        onChange={e => setFavoriteMovies(e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    Submit!
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
};