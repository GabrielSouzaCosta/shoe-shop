import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const categories:string[] = [
  "sport",
  "casual",
  "heel",
  "sport"
]

function ProductsAdmin() {
  const [shoes, setShoes] = useState<[]>([]);
  const [name, setName] = useState<string>("")
  const [category, setCategory] = useState<string>("1")
  const [price, setPrice] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [images, setImages] = useState<any>("");

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL+'/shoes/', {
      headers: {
        "Authorization": "Token "+sessionStorage.getItem("token")
        }
    })
    .then(res => setShoes(res.data))
  })

  async function handleRegisterProduct () {
    await axios.post(import.meta.env.VITE_BACKEND_URL+'/shoes/', {name, category, price, description}, {
      headers: {
      "Authorization": "Token "+sessionStorage.getItem("token")
      }
    })
  }

  return (
    <>
      <h1 className='text-center title pt-5'>
      Products
      </h1>
      <h2>Add new Product</h2>
      <Form className="row align-items-center mb-3">
        <div className="d-flex col-6 align-items-center mt-2">
          <Form.Label className='pe-2 pt-1'>
            Name:
          </Form.Label>
          <Form.Control className='text-dark' value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder="name" required/>
        </div>
        <div className="d-flex col-3">
          <Form.Label className='pe-2 pt-1'>
            Category:
          </Form.Label>
          <Form.Select className='text-dark' value={category} onChange={(e: React.FormEvent<HTMLSelectElement>) => setCategory(e.currentTarget.value)}>
            {
              categories.map((category, id) => {
                return (
                <option  value={id+1}>
                  {category}
                </option>
                )
              })
            }
          </Form.Select>
        </div>
        <div className="d-flex col-3">
          <Form.Label className='pe-2 pt-1'>
            Price: 
          </Form.Label>
          <Form.Control className='text-dark' value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.currentTarget.value)} type="number" step="0.01" placeholder="$99.99" required/>
        </div>

        <div className="col-8">
          <Form.Label className='pb-0 pt-2'>
            Description:
          </Form.Label>
          <Form.Control className='text-dark' value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.currentTarget.value)} as="textarea" rows={4} placeholder='product description...' required/>
        </div>
        <div className="d-flex col-4 align-self-start mt-5">
          <Form.Label className='pe-2 pt-1'>
            Images: 
          </Form.Label>
          <Form.Control type="file" className="text-dark" required/>
        </div>
        <Button onClick={handleRegisterProduct} type="submit" variant="success col-3 mx-auto mt-3 rounded">
          Add Product
        </Button>
      </Form>
      {shoes.map((shoe: any) => {
        return (
          <div className='row px-3 mx-auto justify-content-center fs-5 mt-1'>
            <div className='col-3 bg-light border'>
              {shoe.name}
            </div>
            <div className='col-1 bg-light border'>
              ${shoe.price}
            </div>
            <div className='col-4 bg-light border'>
              {shoe.description.substring(0,30)}
            </div>
            <div className='col-2 bg-light border'>
              Added in: {shoe.date_added.substring(0,10)}
            </div>
            <div className='col-auto bg-primary border'>
              <FontAwesomeIcon icon={faEdit} />
            </div>
            <div className='col-auto bg-danger border'>
              <FontAwesomeIcon icon={faClose} />
            </div>
          </div>
        )
      })

      }

    </>
  )
}

export default ProductsAdmin
