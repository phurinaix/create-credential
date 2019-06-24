import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="navbar-header navbar-light bg-light">
            <Container>
                <LinkContainer to="/blockchain-project">
                    <Navbar.Brand className="navbar-logo p-0 m-0"><img src="http://www.tu.ac.th/uploads/main-logo.svg" width="75%" alt="" /></Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="toggle-button p-0"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto text-center link">
                        <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                        <LinkContainer to="/create"><Nav.Link>Create</Nav.Link></LinkContainer>
                        <LinkContainer to="/unsigned"><Nav.Link>Unsigned Credential</Nav.Link></LinkContainer>
                        <LinkContainer to="/info"><Nav.Link>Information</Nav.Link></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;