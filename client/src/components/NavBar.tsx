import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="dark" expand="lg" className="sticky-top justify-content-center">
      <Container fluid>
        <Nav className='justify-content-center align-items-center w-100 fs-4 text-uppercase'>
          <Navbar.Brand as="h1" className="text-white m-0 fs-1 brand">
            <NavLink to="/" className="custom-brand-link">
              Breathe Shoes
            </NavLink>
          </Navbar.Brand>
          <NavLink to="/shoes" className={({ isActive }) =>
              isActive ? "text-danger ps-3 navlink-active" : "text-danger ps-2 line-down"
            } >
            Store
          </NavLink>
          <Nav className="ms-auto position-absolute end-0">
            <NavLink to="/cart" className={({ isActive }) =>
              isActive ? "text-danger pe-3 navlink-active" : "text-danger pe-3"
            } 
            >
            <FontAwesomeIcon icon={faCartShopping} className="pe-2" />
            Cart
            </NavLink>
            <NavLink to="/login" className="pe-3">
              Login
            </NavLink>
          </Nav>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
