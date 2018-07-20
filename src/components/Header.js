import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Navbar, Nav } from "react-bootstrap";

const SiteHeader = styled(Navbar)`
  && {
    border-radius: 0;
    border-bottom: 0;
    margin-bottom: 0;
  }
`;

const Navigation = styled(Nav)`
  float: right;
  margin-right: -15px;
`;

const NavItem = styled.li`
  float: left;
  > a {
    float: left;
    display: inline-block;
  }
`;

const LogoutButton = styled.span`
  cursor: pointer;
  color: #777;
  float: left;
  padding: 10px 15px;

  &:hover,
  &:focus {
    color: #333;
  }
  @media (min-width: 768px) {
    padding: 15px;
  }
`;

const Header = props => (
  <SiteHeader staticTop componentClass={`nav`} role={`banner`}>
    <Navbar.Brand>
      <Link to="/">Shippit</Link>
    </Navbar.Brand>
    {props.authed ? (
      <Navigation pullRight role={`navigation`}>
        <NavItem>
          <Link to="/boxes">Boxes</Link>
        </NavItem>
        <NavItem>
          <LogoutButton onClick={props.logout}>Logout</LogoutButton>
        </NavItem>
      </Navigation>
    ) : (
      <Navigation pullRight role={`navigation`}>
        <NavItem>
          <Link to="/login">Login</Link>
        </NavItem>
        <NavItem>
          <Link to="/register">Register</Link>
        </NavItem>
      </Navigation>
    )}
  </SiteHeader>
);

export default Header;

Header.propTypes = {
  authed: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};
