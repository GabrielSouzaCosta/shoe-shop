import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NavBar from '../NavBar'

interface Product {
  name: string,
  category: number,
  price: number,
  description: string,
  images: []
}

const categories:string[] = [
  'Sport', 
  'Casual',
  'Sandals',
  'Heels', 
  'Social',
  'Boots', 
]

function EditProduct() {
  const [product, setProduct] = useState<Product>({
    name: "",
    category: 0,
    price: 0,
    description: "",
    images: []
  })
  console.log(product.images)

  const { slug } = useParams()
  const navigate = useNavigate()

  function handleUpdateProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData();

    if (product.images) {
      product.images.forEach((image) => {
          console.log(image)
          formData.append("file", image);
      })
    }

    Object.entries(product).forEach(entry => {
      const [key, value] = entry;
      console.log(key, value);
      formData.append(key, value);
    });


    axios.put(`${import.meta.env.VITE_BACKEND_URL}/shoes/${slug}/`, formData, {
      headers: {
        "Authorization": "Token "+sessionStorage.getItem('token')
      }
    })
    .then(res => {
      if (res.status === 200) {
        navigate('/administration')
      }
    })
  }

  function handleUploadChange(e: React.FormEvent<HTMLInputElement>) {
    const targetFiles = e.currentTarget.files
    const targetFilesObject = [...targetFiles]
    setProduct({...product, images: targetFilesObject})
  }
  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/shoes/${slug}/`)
    .then(res => setProduct(res.data))
  }, [])

  return (
    <>
      <NavBar />
      <div className='bg-secondary min-vh-100'>
        <Link to="/Administration">
          <FontAwesomeIcon icon={faArrowLeft} className="fs-1 text-warning ps-3 pt-2 position-absolute"/>
        </Link>
        <div className="container">
          <h1 className='text-center text-dark title pt-5' style={{borderBottom: "2px solid #00000066"}}>
            Edit Product
          </h1>
          <Form onSubmit={handleUpdateProduct} encType="multipart/form-data" method="post" className='text-dark title fs-4'>
            <Form.Label className='mb-0'>
              Name:
            </Form.Label>
            <Form.Control
            value={product.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProduct({...product, name: e.currentTarget.value})}
            required
            placeholder='product name...' 
            className='text-dark'
            />
            <Form.Label className='mb-0'>
              Category:
            </Form.Label>
            <Form.Select 
            className='text-dark' 
            required 
            value={product.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProduct({...product, category: Number(e.currentTarget.value)})}
            >
              {
                categories.map((category, id:number) => {
                  return (
                  <option key={id} value={id+1}>
                    {category}
                  </option>
                  )
                })
              }
            </Form.Select>
            <Form.Label className='mb-0'>
              Price: 
            </Form.Label >
            <Form.Control
            type='number'
            value={product.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {if (Number(e.currentTarget.value) > 1) {
              setProduct( {...product, price: Number(e.currentTarget.value)} )
            }}
            }
            placeholder='$99.00'
            className='text-dark'
            /> 
            <Form.Label className='mb-0'>
              Description:
            </Form.Label>
            <Form.Control 
            value={product.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProduct({...product, description: e.currentTarget.value})}
            as="textarea" 
            rows={4} 
            placeholder='product description...' 
            required
            className='text-dark'
            />
            <Form.Label className='mb-0'>
              Images:
            </Form.Label>
            <Form.Control 
              name="file"
              type="file" 
              className="text-dark"
              accept="image/*" 
              multiple
              
              onChange={(e: any) => {if (e.currentTarget.files.length < 4) {
                handleUploadChange(e);
              } else if (e.target.files.length > 3) {
                window.alert("Por favor selecione até 3 imagens")
              }}}
            />
            <div className='d-flex justify-content-center align-items-center pt-2'>
              {product.images?.map((file, i)=>{
                  return (
                    <img 
                    className='img-fluid me-1'
                    style={{maxHeight: "300px"}}
                    key={`image-${i}`} 
                    alt="shoe image" 
                    src={file.get_image? import.meta.env.VITE_BACKEND_URL_BASE+file.get_thumbnail : URL.createObjectURL(file)} 
                    />
                  )   
              })}
            </div>
            <div className="col-12 text-center mt-3">
              <Button 
              type='submit'
              className='fs-3 rounded' 
              variant='warning'
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default EditProduct