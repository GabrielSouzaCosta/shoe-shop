import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Carousel, InputGroup, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useAppDispatch } from "../redux/hooks/hooks";
import { addToCart } from "../redux/slices/CartSlice";

interface Shoe {
  id: number,
  name: string,
  price: number,
  description: string,
  images: [{
    get_image: string
    get_thumbnail: string,
  }]
}

function ProductDetails() {
  const [shoe, setShoe] = useState<Shoe>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    images: [{
      get_image: "",
      get_thumbnail: "",
    }]
  })
  const [quantity, setQuantity] = useState<number>(1)

  const params = useParams()
  const dispatch = useAppDispatch()

  function handleSetQuantity(value:number) {
    if (value < 0 && quantity <= 1) {
      setQuantity(quantity)
    } else if (quantity < 15) {
      setQuantity(quantity + value)
    }
  }

  function handleAddToCart() {
    dispatch(addToCart({id: shoe.id, name: shoe.name, price: shoe.price, quantity, image: shoe.images[0]?.get_thumbnail}))
    setQuantity(1)
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/shoes/${params.slug}/`)
    .then(res => setShoe(res.data))
  }, [])

  return (
    <>
    <div className="bg-orange-gradient min-vh-100">
      <NavBar />
      <Container className="min-vh-100" style={{maxWidth: "90%"}}>
        <div className="d-flex h-100">
          <div className="row h-100 w-100 align-items-center justify-content-between">
            <div className="col-8 px-3">
              <Carousel className="d-none d-lg-block col-10 py-5" interval={null}>
                {shoe?.images?.map((item) => {
                  return (
                    <Carousel.Item className="w-100 text-center my-5">
                      <img src={import.meta.env.VITE_BACKEND_URL_BASE+item.get_image} className="shadow-dark" style={{maxHeight: "600px"}}/>
                    </Carousel.Item>
                  )
                })}
              </Carousel>
            </div>

            <div className="col-4 text-dark">
              <span className="display-6">Sneakers</span>
              <h1 className="display-4 text-light title ">{shoe.name}</h1>
              <h2 >{shoe.description}</h2>
              <span className="col-4 fw-normal text-light display-5 me-3">
                ${shoe.price}
              </span>
              <div className="row w-100 pt-4">
                <span className="col-5 text-start">
                <InputGroup className="rounded">
                  <Button onClick={() => handleSetQuantity(-1)} variant="dark" className="rounded fs-3" id="button-addon2" >
                    -
                  </Button>
                  <Form.Control style={{pointerEvents: "none"}}
                      value={quantity}
                      type="number"
                      className="text-center text-dark fs-3"
                  />
                  <Button onClick={() => handleSetQuantity(+1)} variant="dark" className="rounded fs-3" id="button-addon2">
                    +
                  </Button>
                </InputGroup>
                </span>
                <Button onClick={handleAddToCart} variant="light" className="col-6 rounded fs-3 text-dark text-uppercase" id="button-addon2">
                      Add to Cart
                </Button>
              </div>

            </div>


              <h3 className="text-center text-dark text-uppercase display-3 pt-5 mt-5" style={{fontWeight: "400"}}>You May Also Like</h3>
              <Carousel className="col-12 mx-auto py-5 mb-5" interval={null}>
                <Carousel.Item className="w-100 d-flex justify-content-evenly text-center my-5">
                  <img src="/images/black-jiracheep-B5MKPcwjXr4-unsplash.jpg" className="shadow-dark" style={{maxWidth: "400px"}}/>
                  <img src="/images/usama-akram-g3CMh2nqj_w-unsplash.jpg" className="shadow-dark" style={{maxWidth: "400px"}}/>
                  <img src="/images/illia-melnichuk-iHaEbx1BPg8-unsplash.jpg" className="shadow-dark" style={{maxWidth: "400px"}}/>
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
