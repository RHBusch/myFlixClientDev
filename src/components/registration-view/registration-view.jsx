import axios from 'axios';
import { array } from 'prop-types';
import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import './registration-view.scss';

// setting state of username and password as empty by default
export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthday, setBirthday] = useState('');
    const [favMovies, setfavMovies] = useState('');

    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 3) {
            setUsernameErr('Username must be at least 3 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 8) {
            setPasswordErr('Password must be at least 8 characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Email Required');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('Email Address Not Valid')
            isReq = false
        }
        return isReq
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate()
        if (isReq) {
            axios.post('https://busch-movie-api.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday,
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('Registration successful - please login!');
                    window.open('/login', '_self');
                })
                .catch(response => {
                    console.error(response);
                    alert('Unable to register!')
                });
        };
    }

    return (
        <Container fluid className="registerContainerBackground">

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
                            <Card.Body className='regCardBodyStyle'>
                                <Card.Title style={{ textAlign: 'center' }} >Register Here!</Card.Title>
                                <Form>
                                    <Form.Group controlId="formGroupUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type="text" value={username} placeholder="Enter Username..."
                                            onChange={e => setUsername(e.target.value)} />
                                        {usernameErr && <p>{usernameErr}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="formGroupEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control type="email" value={email} placeholder="Enter Email Address..."
                                            onChange={e => setEmail(e.target.value)} />
                                        {emailErr && <p>{emailErr}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="formGroupPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password" value={password} placeholder="Password must be 8 characters..."
                                            onChange={e => setPassword(e.target.value)} />
                                        {passwordErr && <p>{passwordErr}</p>}
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