import { array } from 'prop-types';
import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import './registration-view.scss';

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
        <Container fluid className="registerContainerBackground">

            <Navbar fixed="top" bg="dark" variant="dark" className="mainNavigation" expand="lg">
                <Container>
                    <Navbar.Brand className="navText" href="#home">
                        myFlix App
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card style={{ marginTop: 100, marginBottom: 100, width: 300 }}>
                            <Card.Body className='cardBodyStyle'>
                                <Card.Title style={{ textAlign: 'center' }} >Register Here!</Card.Title>
                                <Form>
                                    <Form.Group controlId="formGroupUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type="text" value={username} placeholder="Enter Username..."
                                            onChange={e => setUsername(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control type="email" value={email} placeholder="Enter Email Address..."
                                            onChange={e => setEmail(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password" value={password} placeholder="Password must be 8 characters..."
                                            onChange={e => setPassword(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupBirthday">
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control type="date" value={birthday}
                                            onChange={e => setBirthday(e.target.value)} />
                                    </Form.Group>
                                    <Button className="registrationButton" variant="primary" type="submit" onClick={handleSubmit}>
                                        Submit!
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </Container>
    )
};