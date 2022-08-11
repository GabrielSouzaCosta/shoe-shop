import { faCartPlus, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Carousel, InputGroup, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useAppDispatch } from "../redux/hooks/hooks";
import { addToCart } from "../redux/slices/CartSlice";
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

interface Shoe {
  product: number,
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
    product: 0,
    name: "",
    price: 0,
    description: "",
    images: [{
      get_image: "",
      get_thumbnail: "",
    }]
  })
  const [quantity, setQuantity] = useState<number>(1)

  const { slug } = useParams()
  const dispatch = useAppDispatch()

  function handleSetQuantity(value:number) {
    if (value < 0 && quantity <= 1) {
      setQuantity(quantity)
    } else if (quantity < 15) {
      setQuantity(quantity + value)
    }
  }

  function handleAddToCart() {
    dispatch(addToCart({product: shoe.product, name: shoe.name, price: shoe.price, quantity, image: shoe.images[0]?.get_thumbnail}))
    setQuantity(1)
    toast.success(() => (
      <span>
        {shoe.name} added to cart
        <Link to='/cart' className='text-danger ms-2 fw-bold'>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </span>
    ))
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/shoes/${slug}/`)
    .then(res => setShoe(res.data))
  }, [])

  return (
    <>
    <div className="bg-orange-gradient min-vh-100">
      <NavBar />
      <Container className="min-vh-100" fluid>
        <div className="d-flex h-100 w-100">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-12 col-md-10 col-lg-6 mx-auto px-1">
              <Carousel className="col-12 py-2" interval={null}>
                {shoe?.images?.map((item) => {
                  return (
                    <Carousel.Item className="px-3 px-lg-0 text-center my-5">
                      <img src={item.get_image} className="shadow-dark img-fluid" style={{minWidth: "300px", maxHeight: "600px"}}/>
                    </Carousel.Item>
                  )
                })}
              </Carousel>
            </div>
            <div className="col-10 col-md-8 col-lg-6 text-dark">
              <span className="display-6">Sneakers</span>
              <h1 className="display-1 text-light title ">{shoe.name}</h1>
              <h2 >{shoe.description}</h2>
              <span className="col-4 fw-normal text-light display-5 me-0 me-lg-3">
                ${shoe.price}
              </span>
              <Form onClick={(e) => {e.preventDefault(); handleAddToCart}} className="row pt-4 justify-content-center">
                <div className="col-8 col-lg-2 text-center mx-auto">
                  <Form.Select className="text-dark text-center" aria-label="Default select example" required>
                    <option value="1">36</option>
                    <option value="1">40</option>
                    <option value="1">40</option>
                    <option value="2">42</option>
                    <option value="3">44</option>
                  </Form.Select>
                </div>
                <div className="row justify-content-center py-3">
                  <input className="form-check-input bg-dark rounded-circle me-3 col-3 border-0" type="radio" value="black" aria-label="black" style={{width:"30px", height: "30px"}} />
                  <input className="form-check-input bg-white rounded-circle me-3 col-3 border-0" type="radio" value="white" aria-label="white" style={{width:"30px", height: "30px"}} />
                  <input className="form-check-input bg-danger rounded-circle me-3 col-2 border-0" type="radio" value="danger" aria-label="danger" style={{width:"30px", height: "30px"}} />
                  <input className="form-check-input bg-warning rounded-circle col-2 border-0" type="radio" value="warning" aria-label="warning" style={{width:"30px", height: "30px"}} />
                </div>

                <span className="col-8 col-md-6 col-lg-4 text-start">
                <InputGroup className="rounded">
                  <Button onClick={() => handleSetQuantity(-1)} variant="dark" className="rounded fs-3" id="button-addon2" >
                    -
                  </Button>
                  <Form.Control style={{pointerEvents: "none"}}
                      value={quantity}
                      className="text-center text-dark fs-3"
                  />
                  <Button onClick={() => handleSetQuantity(+1)} variant="dark" className="rounded fs-3" id="button-addon2">
                    +
                  </Button>
                </InputGroup>
                </span>
                <Button type="submit" variant="light" onClick={handleAddToCart} className="col-4 rounded fs-3 text-dark text-uppercase" id="button-addon2">
                  <FontAwesomeIcon icon={faCartPlus} />
                </Button>
              </Form>
            </div>

            <h3 className="text-center text-dark text-uppercase display-3 pt-5 mt-5" style={{fontWeight: "400"}}>You May Also Like</h3>
            <Carousel className="d-none d-lg-flex col-lg-12 mx-auto py-5 mb-5" interval={null}>
                <Carousel.Item className="w-100 d-flex justify-content-evenly text-center my-5">
                  <img src="/images/black-jiracheep-B5MKPcwjXr4-unsplash.jpg" className="shadow-dark" style={{maxWidth: "400px"}}/>
                  <img src="/images/usama-akram-g3CMh2nqj_w-unsplash.jpg" className="shadow-dark" style={{maxWidth: "400px"}}/>
                  <img src="/images/illia-melnichuk-iHaEbx1BPg8-unsplash.jpg" className="shadow-dark" style={{maxWidth: "400px"}}/>
                </Carousel.Item>
              </Carousel>

            
            <Carousel className="d-block d-lg-none py-2 mb-5" interval={null}>
              <Carousel.Item className=" text-center my-5">
                <img src="/images/black-jiracheep-B5MKPcwjXr4-unsplash.jpg" className="img-fluid shadow-dark" style={{maxHeight: "600px"}}/>
              </Carousel.Item>
              <Carousel.Item className=" text-center my-5">
                  <img src="/images/usama-akram-g3CMh2nqj_w-unsplash.jpg" className="img-fluid shadow-dark" style={{maxHeight: "600px"}}/>
              </Carousel.Item>
              <Carousel.Item className=" text-center my-5">
                <img src="/images/illia-melnichuk-iHaEbx1BPg8-unsplash.jpg" className="img-fluid shadow-dark" style={{maxHeight: "600px"}}/>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </Container>
      <Toaster 
      position="bottom-right"
      reverseOrder={false}
      />
      <Footer />
    </div>
    </>
  )
}

export default ProductDetails
