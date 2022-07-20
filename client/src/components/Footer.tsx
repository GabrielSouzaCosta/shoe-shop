import { Container, Nav, Row } from "react-bootstrap"
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <Nav as="footer" className="flex-column text-light bg-dark" >
      <Container fluid className="px-5 py-2">
        <Row>
          <Nav className="flex-column col-12 col-md-6 col-lg-4">
            <Nav.Item as="h2" className="pt-3">
              <Link className="fs-1 brand" to="/">
                Breathe Shoes
              </Link>
            </Nav.Item>
            <Nav.Item as="h3">
              ABOUT US
            </Nav.Item>
            <Nav.Item as="p" className="fs-5">
              We are a specialized shoes shop operating in the market for 10 years. We offer quality and fair price on our products.
            </Nav.Item>
          </Nav>

          <Nav className="flex-column justify-content-center col-12 col-md-6 col-lg-4">
            <Nav.Item as="p" className="fs-4 pt-3 text-center">
              <strong>Adress:</strong> 1072 Lake Street, Central Park - New York
            </Nav.Item>
            <Nav.Item as="h4" className="text-center fs-4 text-uppercase pb-1 fw-bold">
              Follow us
            </Nav.Item>
            <Nav className="bg-primary rounded w-0 justify-content-center align-items-center col-12 col-md-6 mx-auto mb-4 ">
                <Nav.Item >
                  <Nav.Link>
                    <img src="/icons/instagram.png" width="60px" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item >
                  <Nav.Link>
                    <img src="/icons/facebook.png" width="60px" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item >
                  <Nav.Link>
                    <img src="/icons/twitter.png" width="60px" />
                  </Nav.Link>
                </Nav.Item>
            </Nav>
          </Nav>

          <Nav className="flex-column col-12 col-md-6 col-lg-4 align-items-center pt-3 text-uppercase">
            <Nav.Item as="h3" className="pt-3 fs-1 brand text-secondary align-self-start">
                Quick Links
                <hr className="w-50" style={{border: "1px solid #ffffff"}}></hr>
            </Nav.Item>
            <Nav className="col-12 mx-auto justify-content-between">
              <Nav.Item className="fs-5 col-6">
                <Link to="/privacy-policy">
                  Privacy Policy
                </Link>
              </Nav.Item>
              <Nav.Item className="fs-5 col-6">
                <Link to="/">
                  Top Seller Shoes
                </Link>
              </Nav.Item>
            </Nav>

            <Nav className="col-12 mx-auto justify-content-between">
              <Nav.Item className="fs-5 col-6">
                <Link to="/privacy-policy">
                  Homepage
                </Link>
              </Nav.Item>
              <Nav.Item className="fs-5 col-6">
                <Link to="/">
                  Login
                </Link>
              </Nav.Item>
            </Nav>

          </Nav>

          <hr className="mt-3 mt-lg-0" style={{border: "1px solid $light"}}></hr>
          <p>
            Copyright © 2022 All Rights Reserved by Breathe Shoes. 
          </p>
        </Row>
      </Container>
    </Nav>
  )
}

export default Footer
