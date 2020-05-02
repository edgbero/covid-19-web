// @flow
import * as React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNav = styled.div`
  .navbar {
    background-color: #222;
  }

  .navbar-brand,
  .navbar-nav,
  .navbar-link {
    color: #bbb;
  
    &:hover {
      color: white;
      text-decoration: none;
    }
  }
`;

const StyledNavLink = styled.div`
  padding: 0px 15px;
  color: white
  
`

const Navigation = (): React.Node => {
  return (
    <StyledNav>
      <Navbar expand="lg">
        <Navbar.Brand href="/"> Track Covid-19</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-arrow" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Link to="/" className="navbar-link">
                <StyledNavLink>Home</StyledNavLink>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/about" className="navbar-link">
                <StyledNavLink>About</StyledNavLink>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </StyledNav>
  );
};

export default Navigation;
