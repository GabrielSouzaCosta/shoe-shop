import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import {authService } from '../utils/authService'
import { useAppSelector } from "../redux/hooks/hooks";

function NavBar() { 
  const cart = useAppSelector(state => state.cart.items)

  const user = useAuth()

  function handleLogout() {
    sessionStorage.removeItem("token")
  }

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
          <Nav className="ms-auto position-absolute end-0 align-items-center">
            <NavLink to="/cart" className={({ isActive }) =>
              isActive ? "text-danger pe-3 navlink-active" : "text-danger pe-3 ps-1"
            } 
            >
              <FontAwesomeIcon icon={faCartShopping} className="pe-2" />
             
              Cart
              <span className='text-dark ms-1 bg-danger fw-bold rounded-circle px-2' >
                {(cart) ? <>
                  {cart.length}
                </>
                :
                "0"
                } 
              </span>
            </NavLink>
            {(user.is_superuser) ? 
              <NavLink to="/administration" className="pe-2">
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
          </Nav>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
