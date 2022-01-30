import React, { useState } from 'react';
import { render } from 'react-dom';
import { RegistrationView } from '../registration-view/registration-view';
import { Navbar, Container, Nav, Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import './login-view.scss';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';
import { NavBar } from '../navbar-view/navbar-view';



// setting state of username and password as empty by default
export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false
        } else if (username.length < 3) {
            setUsernameErr('Username must be 3 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 8) {
            setPassword('Password must be 6 characters long');
            isReq = false;
        }
        return isReq;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://busch-movie-api.herokuapp.com/login', {
                Username: username,
                Password: password
            })
                .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                })
                .catch(e => {
                    console.log('no such user')
                    alert('no such user');
                });
        }
    }

    return (

        <div>

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
                                        {usernameErr && <p>{usernameErr}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Username..." value={password} onChange={e => setPassword(e.target.value)} />
                                        {passwordErr && <p>{passwordErr}</p>}
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


/*<Navbar fixed="top" bg="dark" variant="dark" className="mainNavigation" expand="lg">
                <Container>
                    <Navbar.Brand className="navText" href="#home">
                        <span>my</span><span class="flixColor">Flix</span><span>App</span>
                    </Navbar.Brand>
                </Container>
            </Navbar>*/