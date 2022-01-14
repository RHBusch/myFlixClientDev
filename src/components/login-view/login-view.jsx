import React, { useState } from 'react';
import { render } from 'react-dom';
import { RegistrationView } from '../registration-view/registration-view';
import { Navbar, Container, Nav, Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import './login-view.scss';
import axios from 'axios';


// setting state of username and password as empty by default
export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    }

    return (

        <div>
            <Navbar fixed="top" bg="dark" variant="dark" className="mainNavigation" expand="lg">
                <Container>
                    <Navbar.Brand className="navText" href="#home">
                        <span>my</span><span class="flixColor">Flix</span><span>App</span>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card style={{ marginTop: 100, marginBottom: 100, width: 300 }}>
                            <Card.Body className="logCardBodyStyle">
                                <Card.Title style={{ textAlign: 'center' }} >Welcome to myFlix!</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted text-center">*Please Login*</Card.Subtitle>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Username..." value={username} onChange={e => setUsername(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Username..." value={password} onChange={e => setPassword(e.target.value)} />
                                    </Form.Group>
                                    <Button className="loginButton" variant="primary" type="submit" onClick={handleSubmit}>
                                        Submit!
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}