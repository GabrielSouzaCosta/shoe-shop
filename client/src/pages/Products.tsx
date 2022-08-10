import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Container } from 'react-bootstrap'
import Filter from '../components/Filter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ShoesCard from '../components/ShoesCard'
import { Toaster } from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

type ShoeCard = {
  product: number,
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
  const [pageLoaded, setPageLoaded] = useState<boolean>(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const product = searchParams.get('product')

  function handleShowFilter() {
    setShowFilter(!showFilter);
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(Number(e.currentTarget.value))
  }

  function handleClearFilter() {
    setFilter(0),
    setShowFilter(!showFilter);
  }

  useEffect(() => {
    const getProducts = async () => {
      let response
      if (product) {
        response = await axios.get(import.meta.env.VITE_BACKEND_URL+'/shoes/?product='+product)
      } else {
        response = await axios.get(import.meta.env.VITE_BACKEND_URL+'/shoes/')
      }
      const data = response.data
      setPageLoaded(true)
      setShoes(data.map((item:any) => {
        return {product: item.id, name: item.name, slug: item.slug, category: item.category, price: item.price, images: item.images}
      }))
    }
    getProducts()
  }, [searchParams])

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
                    <ShoesCard product={shoe.product} slug={shoe.slug} image={shoe.images[0]?.get_thumbnail} name={shoe.name} price={shoe.price} />
                    )
                  })
                :
                  shoes.map((shoe: ShoeCard) => {
                    return(
                      <ShoesCard product={shoe.product} slug={shoe.slug} image={shoe.images[0]?.get_thumbnail} name={shoe.name} price={shoe.price} />
                      )
                    })
            }

            {(shoes.length === 0 && pageLoaded) ? 
              <>
                <div className='fs-2 text-center text-dark mt-5 text-uppercase title'>
                  Sorry, there's nothing to see here, try another search.
                </div>
                <img src='/icons/sad.svg' className='img-fluid' style={{maxHeight: '700px'}}/>
              </>
              :
              ""
            }
        </div>
      </Container>
      <Toaster   
      position="bottom-right"
      reverseOrder={false}
      />
    </div>
    <Footer />
  </>
  )
}

export default Products
