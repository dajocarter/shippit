import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Navbar, Nav } from "react-bootstrap";

const SiteHeader = styled(Navbar)`
  background: linear-gradient(to right, #8e2de2, #4a00e0);
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
`;

const NavLink = styled(Link)`
  && {
    color: #fff !important;
    float: left;
    display: inline-block;
    &:hover,
    &:focus {
      color: #ccc !important;
    }
  }
`;

const LogoutButton = styled.span`
  cursor: pointer;
  color: #fff;
  float: left;
  padding: 10px 15px;

  &:hover,
  &:focus {
    color: #ccc;
  }
  @media (min-width: 768px) {
    padding: 15px;
  }
`;

const Header = props => (
  <SiteHeader staticTop componentClass={`nav`} role={`banner`}>
    <Navbar.Brand>
      <NavLink to="/">Shippit</NavLink>
    </Navbar.Brand>
    <Navigation pullRight role={`navigation`}>
      {props.authed && (
        <NavItem>
          <NavLink to="/boxes">Boxes</NavLink>
        </NavItem>
      )}
      <NavItem>
        {props.authed ? (
          <LogoutButton onClick={props.logout}>Logout</LogoutButton>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </NavItem>
    </Navigation>
  </SiteHeader>
);

export default Header;

Header.propTypes = {
  authed: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};
