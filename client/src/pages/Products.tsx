import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Container } from 'react-bootstrap'
import Filter from '../components/Filter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ShoesCard from '../components/ShoesCard'

type ShoeCard = {
  id: number,
  name: string,
  slug: string,
  category: number,
  price: number,
  images: [{
    get_image: string,
    get_thumbnail: string
  }]
}

function Products() {
  const [shoes, setShoes] = useState<[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState<number>(0);

  function handleShowFilter() {
    setShowFilter(!showFilter);
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.currentTarget.value)
  }

  function handleClearFilter() {
    setFilter(0),
    setShowFilter(!showFilter);
  }

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL+'/shoes/')
      const data = response.data
      setShoes(data)
    }
    getProducts()
  }, [])

  return (
  <>
    <div className='bg-secondary min-vh-100'>
      <NavBar />
      {(showFilter) ? 
        <Filter filter={filter} handleClick={handleShowFilter} handleFilterChange={handleFilterChange} handleClearFilter={handleClearFilter} />
      :
        <FontAwesomeIcon onClick={handleShowFilter} icon={ faFilter } className="bg-light w-100 position-absolute text-danger" style={{height: "40px"}} />
      }
      <Container className='h-100 mt-1' fluid>
        <div className='row h-100 justify-content-center mx-auto py-5 position-relative'>
          {(filter !== 0) ?
            shoes.filter((shoe: ShoeCard) => 
              shoe.category == filter
            ).map((shoe: ShoeCard) => {
              return(
                <ShoesCard id={shoe.id} slug={shoe.slug} image={shoe.images[0]?.get_thumbnail} name={shoe.name} price={shoe.price} />
              )
            })
          :
            shoes.map((shoe: ShoeCard) => {
              return(
                <ShoesCard id={shoe.id} slug={shoe.slug} image={shoe.images[0]?.get_thumbnail} name={shoe.name} price={shoe.price} />
              )
            })
          }
        </div>
      </Container>
    </div>
    <Footer />
  </>
  )
}

export default Products
