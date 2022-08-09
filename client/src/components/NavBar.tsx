import { faBars, faCartShopping, faMagnifyingGlass, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { logout } from '../redux/slices/UserSlice'

function NavBar() { 
  const cart = useAppSelector(state => state.cart.items)
  const {token} = useAppSelector(state => state.user)
  const [shoes, setShoes] = useState([])
  const [filterValue, setFilterValue] = useState<string>("")

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterValue(e.currentTarget.value)
  }

  function searchProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    navigate('/shoes?product='+filterValue)
  }

  function handleLogout() {
    dispatch(logout())
  }

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL+'/shoes/')
    .then(res => setShoes(res.data))
  }, [])

  return (
    <Navbar bg="dark" expand="lg" className="sticky-top justify-content-center">
      <Container fluid>
        <Nav className="flex-row align-items-center justify-content-center w-50 ms-auto ps-0 ps-md-5 fs-4 text-uppercase">
          <Navbar.Brand as="h1" className="text-white m-0 ms-5 ps-3 fs-1 brand">
            <NavLink to="/" className="custom-brand-link">
              Breathe Shoes
            </NavLink>
          </Navbar.Brand>
          
          <NavLink to="/shoes" className={({ isActive }) =>
              isActive ? "text-danger ps-3 navlink-active" : "text-danger ps-2 line-down"
            }>
            Store
          </NavLink>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" >
          <FontAwesomeIcon className="text-white" icon={faBars} />
        </Navbar.Toggle>
        <Nav className="flex-column mx-auto mx-lg-0 align-items-center justify-content-center fs-4 text-uppercase">
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Item as='form' onSubmit={searchProduct} className="position-relative text-danger w-50 me-2">
            <input 
            value={filterValue}
            onChange={handleFilterChange}
            type="search" 
            placeholder="nike FN.." 
            className="mb-1 title fs-5 ps-2 w-100 rounded-pill border-0"
            />
            <Button type="submit" className="position-absolute end-0 pe-2 pt-2 transform-middle border-0" style={{backgroundColor: 'transparent'}}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-danger"/>
            </Button>
            <div className="d-flex flex-column position-absolute bg-light text-dark title justity-content-center end-0 start-0">
            {shoes.filter((shoe: {name: string}) => {
              const searchValue = filterValue.toLowerCase()
              const findName = shoe.name.toLowerCase()
              return searchValue && findName.startsWith(searchValue) && findName !== searchValue
            })
            .slice(0,5)
            .map((item: {name: string}) => {
              return (
                <div  
                onClick={() => setFilterValue(item.name)}
                key={item.name}
                className='fs-5 border border-2'
                >
                  {item.name}
                </div>
              )
            })
            }
            </div>
          </Nav.Item>
          <NavLink to="/cart" className={({ isActive }) =>
            isActive ? "col-auto text-danger pe-3 ps-2 navlink-active" : "col-auto text-danger pe-3 ps-2"
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
          {(token) ? 
            <NavLink to="/profile" className="d-none d-md-block pe-2 me-1 fs-2">
              <FontAwesomeIcon icon={faUserCircle} />
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
