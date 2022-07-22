import { useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Button, Container } from 'react-bootstrap'
import RadioInputs from '../components/RadioInputs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faFilter } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

type Props = {
  image: string
}

const ShoesCards: React.FC<Props> = ({
  image
}) => 
  (
    <Link to="/shoes/1"  className='shoes-card col-3'>
      <div className='header' style={{background: `url('/images/${image}') no-repeat top`, backgroundSize: "cover", height: "85%"}}>
      </div>
      <div className='body text-center' style={{background: "#ffffff no-repeat bottom", minHeight: "15%"}}>
        <h2 className='text-dark px-1 pt-1'>
          Tênis Vans Revan T1
        </h2>
        <span className='text-dark fs-3'>
          $199
          <Button variant='danger' className='ms-3 mb-1 text-uppercase fw-bold'>
            See Details
          </Button>
          <FontAwesomeIcon icon={faCartPlus} className="text-warning ps-3" />
        </span>
      </div>
    </Link>
  )

function Products() {
  const [showFilter, setShowFilter] = useState(false);

  function handleShowFilter() {
    setShowFilter(!showFilter);
  }

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
          <ShoesCards image={"paul-gaudriault-a-QH9MAAVNI-unsplash.jpg"} />
          <ShoesCards image={"irene-kredenets-dwKiHoqqxk8-unsplash.jpg"} />
        </div>
      </Container>
    </div>
    <Footer />
  </>
  )
}

export default Products
