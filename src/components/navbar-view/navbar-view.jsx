import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import './navbar-view.scss';

export function NavBar({ user }) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }
    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (
        <Navbar fixed="top" bg="dark" variant="dark" className="mainNavigation" expand="lg">
            <Container>
                <Navbar.Brand className="navText" href="/">
                    <span>my</span><span className="flixColor">Flix</span><span>App</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            <Nav.Link href={`/users/${user}`} className="navText">{user}</Nav.Link>
                        )}
                        {isAuth() && (
                            <Button variant="link" className="navText flixColor" onClick={() => { onLoggedOut() }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/" className="navText">Sign-in</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/register" className="navText">Sign-up</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
