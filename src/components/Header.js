import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
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

const MenuItem = styled.li`
  float: left;
`;

const LogoLink = styled(NavLink)`
  && {
    color: #fff !important;
    float: left;
    display: inline - block;
    &: hover,
    &: focus {
      color: #ccc !important;
    }

    &.active {
      color: #fff !important;
      &: hover,
    &: focus {
        color: #ccc !important;
      }
    }
  }
`;

const MenuLink = styled(NavLink)`
  && {
    color: #fff !important;
    float: left;
    display: inline-block;
    transition: all 0.25s ease;

    &:hover,
    &:focus {
      color: #ccc !important;
    }

    &.active {
      background: #fff;
      color: #5c0fe1 !important;
      &:hover,
      &:focus {
        background: #efefef;
      }
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
      <LogoLink activeClassName={`active`} to="/">
        Moving Buddy
      </LogoLink>
    </Navbar.Brand>
    <Navigation pullRight role={`navigation`}>
      {props.authed && (
        <MenuItem>
          <MenuLink activeClassName={`active`} to="/boxes">
            Boxes
          </MenuLink>
        </MenuItem>
      )}
      <MenuItem>
        {props.authed ? (
          <LogoutButton onClick={props.logout}>Logout</LogoutButton>
        ) : (
          <MenuLink to="/login">Login</MenuLink>
        )}
      </MenuItem>
    </Navigation>
  </SiteHeader>
);

export default Header;

Header.propTypes = {
  authed: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};
