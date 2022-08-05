import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { logout } from '../redux/slices/UserSlice'

function NavBar() { 
  const cart = useAppSelector(state => state.cart.items)
  const user = useAppSelector(state => state.user)

  const dispatch = useAppDispatch()

  function handleLogout() {
    dispatch(logout())
  }

  return (
    <Navbar bg="dark" expand="lg" className="sticky-top justify-content-center">
      <Container fluid>
        <Nav className="flex-row align-items-center justify-content-center w-75 ms-auto ps-0 ps-md-5 fs-4 text-uppercase">
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
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" >
          <FontAwesomeIcon className="text-white" icon={faBars} />
        </Navbar.Toggle>
        <Nav className="flex-column mx-auto mx-lg-0 align-items-center justify-content-center fs-4 text-uppercase">
          <Navbar.Collapse id="basic-navbar-nav">
          <NavLink to="/cart" className={({ isActive }) =>
            isActive ? "text-danger pe-3 navlink-active" : "text-danger pe-3 ps-1"
          } 
          >
            <FontAwesomeIcon icon={faCartShopping} className="pe-2" />
            <span className="d-none d-md-inline">Cart</span>
            <span className='text-dark ms-1 bg-danger fw-bold rounded-circle px-2' >
              {(cart) ? 
                <>
                  {cart.length}
                </>
              :
              "0"
            } 
            </span>
          </NavLink>
          {(user) ? 
            <NavLink to="/administration" className="d-none d-md-block pe-2">
              Admin
            </NavLink>  
          :
          ""
        }

          {(sessionStorage.getItem("token"))?
            <a href="" onClick={handleLogout} className=" pe-3">
              Logout
            </a>
          :
          <NavLink to="/login" className="pe-3">
              Login
            </NavLink>
          }
        </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
