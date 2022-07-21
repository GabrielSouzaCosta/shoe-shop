import { useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Container } from 'react-bootstrap'
import RadioInputs from '../components/RadioInputs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

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
          <div className='shoes-card col-3'>
            <div className='header' style={{background: "url('/images/paul-gaudriault-a-QH9MAAVNI-unsplash.jpg') no-repeat center", backgroundSize: "cover"}}>
              
            </div>
          </div>
          <div className='shoes-card col-3'>
            <div className='header' style={{background: "url('/images/irene-kredenets-dwKiHoqqxk8-unsplash.jpg') no-repeat center", backgroundSize: "cover"}}>
              
            </div>
          </div>
          <div className='shoes-card col-3 mb-4'>
            <div className='header' style={{background: "url('/images/maxim-hopman-8cT5ja0P_N4-unsplash.jpg') no-repeat center", backgroundSize: "cover"}}>
              
            </div>
          </div>
          <div className='shoes-card col-3 mb-4'>
            <div className='header' style={{background: "url('/images/joseph-barrientos-4qSb_FWhHKs-unsplash.jpg') no-repeat center", backgroundSize: "cover"}}>
              
            </div>
          </div>
          <div className='shoes-card col-3'>
            <div className='header' style={{background: "url('/images/joseph-barrientos-4qSb_FWhHKs-unsplash.jpg') no-repeat center", backgroundSize: "cover"}}>
              
            </div>
          </div>
          <div className='shoes-card col-3'>
            <div className='header' style={{background: "url('/images/usama-akram-s-gYAbQToXk-unsplash.jpg') no-repeat center", backgroundSize: "cover"}}>
              
            </div>
          </div>
          <div className='shoes-card col-3'>
            <div className='header' style={{background: "url('/images/usama-akram-g3CMh2nqj_w-unsplash.jpg') no-repeat center", backgroundSize: "cover"}}>
              
            </div>
          </div>
          <div className='shoes-card col-3'>
            <div className='header' style={{background: "url('/images/usama-akram-g3CMh2nqj_w-unsplash.jpg') no-repeat center", backgroundSize: "cover"}}>
              
            </div>
          </div>
        </div>
      </Container>
    </div>
    <Footer />
  </>
  )
}

export default Products
