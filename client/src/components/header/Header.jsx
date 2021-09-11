//Core
import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

//Images
import logo from "../../assets/images/MyTests.svg";
import { useLogout } from "../../hooks/useLogout";

const Header = () => {
  const { logout } = useLogout();

  const logoutHandler = () => {
    logout();
    window.location.reload();
  };

  return (
    <Navbar
      bg="white"
      fixed="top"
      style={{ height: 70, padding: 0, margin: 0 }}
    >
      <Container
        style={{
          borderBottom: "2px solid #C7C7C7",
          maxWidth: 1360,
        }}
        className="h-100"
      >
        <Navbar.Brand>
          <Link to="/tests">
            <img
              src={logo}
              alt="Logo"
              className="d-inline-block align-top"
              style={{ width: 130 }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Link to="/profile">
            <img
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Avatar"
              className="d-inline-block align-top"
              style={{
                border: "2px solid #734CE9",
                width: 42,
                height: 42,
                borderRadius: "50%",
                marginLeft: 10,
              }}
            />
          </Link>
          <Button onClick={logoutHandler} style={{ marginLeft: 15 }}>
            <i className="bi bi-box-arrow-right"></i>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
