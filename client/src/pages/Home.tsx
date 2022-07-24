import NavBar from "../components/NavBar"
import { Button, Container, Carousel } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faStar } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { Link } from 'react-router-dom'
import Footer from "../components/Footer"

function Home() {
  const [showArrow, setShowArrow] = useState<boolean>(false)

  return (
  <>
    <NavBar />

    <header className="hero-section vh-100 min-vh-100">
      <Container className="h-100" fluid>
        <div className="d-flex align-items-center h-50 w-100">
          <div className="mt-5 ps-0 ps-md-4 title w-100">
            <h1 className="display-1 text-warning mb-3 mt-5 mt-md-0 line-down" style={{opacity: "0.85"}}>
              Breathe Shoes
            </h1>
            <h2 className="display-6 text-primary mb-3">
              The Most Beautiful Shoes from market
            </h2>
            <h3 className="text-secondary display-6 mb-4" >
              Premium Brands.
            </h3>
            <Button variant="light" className="rounded-pill px-4 fs-3 mx-auto fw-bold" onMouseEnter={() => setShowArrow(true)} >
              <span className="pe-2">See our products</span>
              {(showArrow) ? 
                <span style={{verticalAlign: "middle"}}>
                  <FontAwesomeIcon id="arrow" className="slide-in-blurred-left" icon={ faAngleRight } />
                </span>
              :
                ""
              }
            </Button>
          </div>
        </div>
      </Container>
    </header>

    <section className="bg-warning content-section vh-100 ">
      <div className="d-flex flex-column justify-content-center h-100 title mx-auto" style={{maxWidth: "75%"}}>
        <h1 className="display-4 text-capitalize secondary-title">
          Shoes for any case
        </h1>
        <h2 className=" text-start">
          Find those that best fit you
        </h2>
      </div>
    </section>

    <section className="content-section-2 vh-100">
      <div className="d-flex flex-column justify-content-center h-100 title mx-auto" style={{maxWidth: "75%", opacity: "1"}}>
        <h1 className="display-4  text-end text-capitalize secondary-title">
          A new definition of style
        </h1>
        <h2 className="text-end fw-bold">
          <q>Confort and Elegance by nature</q>
        </h2>
      </div>
    </section>

    <section className="min-vh-100" style={{ background: "linear-gradient(90deg, rgba(182,220,254,1) 0%, rgba(255,255,255,1) 100%)" }}>
      <Container className="h-100" fluid>
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <h2 className="text-center title text-dark my-5 display-5">Choose your Favorites</h2>

          <Carousel variant="dark" className="d-none d-lg-block col-10 pb-5" interval={null}>
            <Carousel.Item className="w-100">
              <div className="row justify-content-center w-100 mx-auto my-5 text-uppercase">
                <div className="category-card-1 px-0 me-1">
                  <h3 className="text-center pt-2 h-100 w-100 title fw-bold display-5 text-secondary">
                    Basketball Sneakers
                  </h3>
                </div>
                <div className="category-card-1 px-0 me-1">
                  <h3 className="text-center pt-2 h-100 title fw-bold display-4  text-warning">
                    <FontAwesomeIcon icon={ faStar }/>All Stars
                  </h3>
                </div>
                <div className="category-card-1 px-0">
                  <h3 className="text-center pt-2 h-100 title fw-bold display-4 text-danger">
                    Sport Sneakers
                  </h3>
                </div>
              </div>
            </Carousel.Item>

            <Carousel.Item className="w-100">
              <div className="row justify-content-center w-100 mx-auto my-5 text-uppercase text-light">
                  <div className="category-card-2 col-2 px-0 me-1">
                    <h3 className="text-center pt-2 h-100 title fw-bold display-3 text-secondary">
                      Boots
                    </h3>
                  </div>
                <div className="category-card-2 col-2 me-1 px-0">
                  <h3 className="text-center pt-2 h-100 w-100 title fw-bold display-3 text-danger">
                    Heels
                  </h3>
                </div>
                <div className="category-card-2 col-2 px-0">
                  <h3 className="text-center pt-2 h-100 w-100 title fw-bold display-3 text-secondary">
                    Casual
                  </h3>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>

          <div className="d-flex d-lg-none row justify-content-center w-100 mx-auto text-uppercase">
            <div className="category-card-1 px-0 m-1 col-6">
              <h3 className="text-center pt-2 h-100 px-0 title fw-bold display-5 text-secondary">
                Basketball Sneakers
              </h3>
            </div>
            <div className="category-card-1 px-0 m-1 col-6">
              <h3 className="text-center pt-2 h-100 title fw-bold display-5 text-warning">
                <FontAwesomeIcon icon={ faStar }/>All Stars
              </h3>
            </div>
            <div className="category-card-1 px-0 me-1 col-6">
              <h3 className="text-center pt-2 h-100 title fw-bold display-5 text-danger">
                Sport Sneakers
              </h3>
            </div>
            <div className="category-card-1 px-0 col-6 m-1">
              <h3 className="text-center pt-2 h-100 w-100 title fw-bold display-4 text-secondary">
                Boots
              </h3>
            </div>
            <div className="category-card-1 px-0 col-6 m-1">
              <h3 className="text-center pt-2 h-100 title fw-bold display-4 text-secondary">
                Heels
              </h3>
            </div>
            <div className="category-card-1 px-0 col-6 m-1">
              <h3 className="text-center pt-2 h-100 title fw-bold display-5 text-secondary">
                Casual
              </h3>
            </div>
              
          </div>

        </div>
      </Container>
    </section>

    <Footer />
  </>
  )
}

export default Home
