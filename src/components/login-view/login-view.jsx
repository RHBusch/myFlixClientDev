import React, { useState } from 'react';
import { render } from 'react-dom';
import { RegistrationView } from '../registration-view/registration-view';
import { Navbar, Container, Nav, Form, Button, Card, Container, Row, Col } from 'react-bootstrap';



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
        <Container>
            <Row>
                <Col></Col>
                <Col>
                    <Card style={{ marginTop: 100, marginBottom: 100, width: 300 }}>
                        <Card.Body>
                            <Card.Title style={{ textAlign: 'center' }} >Welcome to myFlix!</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted text-center">*Please Login*</Card.Subtitle>
                            <Form>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="text" onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                                <br></br>
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
    );
}