import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Col, Row, Container, } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Redirect, Link } from "react-router-dom";
import axios from 'axios';

export function ProfileView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [birthday, setBirthday] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put('https://busch-movie-api.herokuapp.com/users/Username'), {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }
            .then(reponse => {
                console.log(response.data);
                setUsername(response.data);
                window.open('/', '_self')
            })
            .catch(e => { console.log('error updating user details') })

    }
}

/*Begin by detailing all logic for axios requests. Use login and registration examples for setting up the 
details for updating a user's information + a handleSubmit function. Don't worry too much about the 
profileview button. That can come later, and likely in the NavBar. The logic will be more important for now. You will need to build a form to
 update this information. Add a user profile view to display user information and:
Allow a user to update their user info (username, password, email, date of birth)
Allow a user to deregister
Display a user's favorite movies
Allow a user to remove a movie from their list of favorites*/