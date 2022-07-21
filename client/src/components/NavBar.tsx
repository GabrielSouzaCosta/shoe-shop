import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="dark" expand="lg" className="sticky-top">
      <Container>
        <Navbar.Brand as="h1" className="text-white m-0 fs-1 brand mx-auto">
          <Link to="/">
            Breathe Shoes
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavBar
