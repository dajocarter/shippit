import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Navbar, Nav, Button } from "react-bootstrap";

const SiteHeader = styled(Navbar)`
  && {
    border-radius: 0;
    border-bottom: 0;
    margin-bottom: 0;
  }
`;

const NavItem = styled.li``;

const LogoutButton = styled(Button)`
  border: none;
  background: transparent;
`;

const Header = props => (
  <SiteHeader staticTop componentClass={`nav`} role={`banner`}>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Shippit</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Nav pullRight role={`navigation`}>
      <NavItem>
        <Navbar.Brand>
          <Link to="/">Home</Link>
        </Navbar.Brand>
      </NavItem>
      <NavItem>
        <Navbar.Brand>
          <Link to="/dashboard">Dashboard</Link>
        </Navbar.Brand>
      </NavItem>
      <NavItem>
        {props.authed ? (
          <LogoutButton onClick={props.logout}>Logout</LogoutButton>
        ) : (
          <span>
            <Navbar.Brand>
              <Link to="/login">Login</Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to="/register">Register</Link>
            </Navbar.Brand>
          </span>
        )}
      </NavItem>
    </Nav>
  </SiteHeader>
);

export default Header;
