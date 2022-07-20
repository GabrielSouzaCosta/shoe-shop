import { Container, Carousel, InputGroup, Form, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function ProductDetails() {
  return (
    <>
    <div className="bg-orange-gradient min-vh-100">
      <NavBar />
      <Container className="min-vh-100" style={{maxWidth: "90%"}}>
        <div className="d-flex h-100">
          <div className="row h-100 w-100 align-items-center justify-content-between">
            <div className="col-8 px-3">
              <Carousel className="d-none d-lg-block col-10 py-5" interval={null}>
                <Carousel.Item className="w-100 text-center my-5">
                  <img src="/images/black-jiracheep-B5MKPcwjXr4-unsplash.jpg" className="shadow-dark" style={{maxHeight: "600px"}}/>
                </Carousel.Item>
                <Carousel.Item className="w-100 text-center my-5">
                  <img src="/images/ayo-ogunseinde-Mp0qYV0fCfA-unsplash.jpg" className="shadow-dark" style={{maxHeight: "600px"}}/>
                </Carousel.Item>
                <Carousel.Item className="w-100 text-center my-5">
                  <img src="/images/kushagra-kevat-KZs5Bt5VDng-unsplash.jpg" className="shadow-dark" style={{maxHeight: "600px", width: "95%"}}/>
                </Carousel.Item>
              </Carousel>
            </div>

            <div className="col-4 text-dark">
              <span className="display-6">Sneakers</span>
              <h1 className="display-4 text-light title ">Adidas NMD </h1>
              <h2 >The adidas NMD R1 is a casual sneaker which combines modern-day Boost comfort with retro running shoe aesthetics.</h2>
              <span className="col-4 text-light display-5 me-3">
                $300.00
              </span>
              <div className="row w-100 pt-4">
                <span className="col-5 text-start">
                <InputGroup className="rounded">
                  <Button variant="dark" className="rounded fs-3" id="button-addon2" >
                    -
                  </Button>
                  <Form.Control
                      defaultValue="1"
                      className="text-center text-dark fs-3"
                  />
                  <Button variant="dark" className="rounded fs-3" id="button-addon2">
                    +
                  </Button>
                </InputGroup>
                </span>
                <Button variant="light" className="col-5 rounded fs-3 text-dark text-uppercase" id="button-addon2">
                      Add to Cart
                </Button>
              </div>

            </div>


              <h3 className="text-center text-dark text-uppercase display-3  pt-5 mt-5">You May Also Like</h3>
              <Carousel className="col-12 mx-auto py-5 mb-5" interval={null}>
                <Carousel.Item className="w-100 d-flex justify-content-evenly text-center my-5">
                  <img src="/images/black-jiracheep-B5MKPcwjXr4-unsplash.jpg" className="shadow-dark" style={{maxWidth: "400px"}}/>
                  <img src="/images/ayo-ogunseinde-Mp0qYV0fCfA-unsplash.jpg" className="shadow-dark" style={{maxWidth: "400px"}}/>
                  <img src="/images/kushagra-kevat-KZs5Bt5VDng-unsplash.jpg" className="shadow-dark" style={{maxWidth: "400px"}}/>
                </Carousel.Item>
              </Carousel>


          </div>
        </div>
      </Container>
      <Footer />
    </div>
    </>
  )
}

export default ProductDetails
