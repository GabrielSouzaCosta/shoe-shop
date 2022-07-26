import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Button, Container } from 'react-bootstrap'
import RadioInputs from '../components/RadioInputs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faFilter } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ShoesCard from '../components/ShoesCard'

function Products() {
  const [showFilter, setShowFilter] = useState(false);
  const [shoes, setShoes] = useState([]);

  function handleShowFilter() {
    setShowFilter(!showFilter);
  }

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL+'/shoes/')
    .then(res => setShoes(res.data))
    .then(res => console.log(shoes))
  }, [])

  return (
  <>
    <div className='bg-secondary min-vh-100'>
      <NavBar />
      {(showFilter) ? 
        <RadioInputs handleClick={handleShowFilter} />
      :
        <FontAwesomeIcon onClick={handleShowFilter} icon={ faFilter } className="bg-light w-100 position-absolute text-danger" style={{height: "40px"}} />
      }
      <Container className='h-100 mt-1' fluid>
        <div className='row h-100 justify-content-center mx-auto py-5 position-relative' style={{width: "85%"}}>
          {shoes.map((shoe) => {
            return(
              <ShoesCard image={shoe.image} name={shoe.name} price={shoe.price} />
            )
          })}
        </div>
      </Container>
    </div>
    <Footer />
  </>
  )
}

export default Products
