import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'

interface NewShoes {
  name: string,
  category?: number,
  price?: number,
  description: string,
  file?: []
}

type Shoe = {
  name: string,
  price: number,
  description: string,
  date_added: string,
  slug: string
}

const categories:string[] = [
  "sport",
  "casual",
  "heel",
  "sport"
]

function ProductsAdmin() {
  const [shoes, setShoes] = useState<[]>([]);
  const [newShoes, setNewShoes] = useState<NewShoes>({
    name: "",
    category: undefined,
    price: undefined,
    description: "",
    file: undefined
  })

  async function handleRegisterProduct (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData();
    if (newShoes.file) {
        newShoes.file.forEach((item) => {
            console.log(item)
            formData.append("file", item);
        })
    }

    Object.entries(newShoes).forEach(entry => {
      const [key, value] = entry;
      console.log(key, value);
      formData.append(key, value);
    });

    await axios.post(import.meta.env.VITE_BACKEND_URL+'/shoes/', formData, {
      headers: {
      "Authorization": "Token "+sessionStorage.getItem("token")
      }
    })
  }

  async function handleDeleteProduct (slug:string) {
    await axios.delete(import.meta.env.VITE_BACKEND_URL+'/shoes/'+slug+'/', {
      headers: {
      "Authorization": "Token "+sessionStorage.getItem("token")
      }
    })
  }

  function handleUploadChange(e: React.FormEvent<HTMLInputElement>) {
    const targetFiles = e.currentTarget.files
    console.log(targetFiles)  
    const targetFilesObject = [...targetFiles]
    setNewShoes({...newShoes, file: targetFilesObject})
  }

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL+'/shoes/', {
      headers: {
        "Authorization": "Token "+sessionStorage.getItem("token")
        }
    })
    .then(res => setShoes(res.data))
  }, [])

  return (
    <>
      <h1 className='text-center title pt-5'>
      Products
      </h1>
      <h2>Add new Product</h2>
      <Form onSubmit={handleRegisterProduct} encType="multipart/form-data" method="post" className="row align-items-center mb-3">
        <div className="d-flex col-6 align-items-center mt-2">
          <Form.Label className='pe-2 pt-1'>
            Name:
          </Form.Label>
          <Form.Control className='text-dark' value={newShoes.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewShoes({...newShoes, name: e.currentTarget.value})} placeholder="name" required/>
        </div>
        <div className="d-flex col-3">
          <Form.Label className='pe-2 pt-1'>
            Category:
          </Form.Label>
          <Form.Select className='text-dark' value={newShoes.category} onChange={(e: React.FormEvent<HTMLSelectElement>) => setNewShoes({...newShoes, category: Number(e.currentTarget.value)})}>
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
        </div>
        <div className="d-flex col-3">
          <Form.Label className='pe-2 pt-1'>
            Price: 
          </Form.Label>
          <Form.Control type="number" className='text-dark' value={newShoes.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewShoes({...newShoes, price: Number(e.currentTarget.value)})} step="0.01" placeholder="$99.99" required/>
        </div>

        <div className="col-8">
          <Form.Label className='pb-0 pt-2'>
            Description:
          </Form.Label>
          <Form.Control className='text-dark' value={newShoes.description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewShoes({...newShoes, description: e.currentTarget.value})} as="textarea" rows={4} placeholder='product description...' required/>
        </div>
        <div className="d-flex col-4 align-self-start mt-5">
          <Form.Label className='pe-2 pt-1'>
            Images: 
          </Form.Label>
          <Form.Control 
          name="file"
          type="file" 
          className="text-dark"
          accept="image/*" 
          multiple 
          onChange={(e) => {if (e.target.files.length < 4) {
            handleUploadChange(e);
          } else if (e.target.files.length > 3) {
            window.alert("Por favor selecione até 3 imagens")
          } }}
          />
        </div>
        <Button type="submit" variant="success col-3 mx-auto mt-3 rounded">
          Add Product
        </Button>
      </Form>
      {shoes.map((shoe: Shoe) => {
        return (
          <div key={shoe.name} className='row px-3 mx-auto justify-content-center fs-5 mt-1'>
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
              <FontAwesomeIcon onClick={() => handleDeleteProduct(shoe.slug)} icon={faClose} />
            </div>
          </div>
        )
      })

      }

    </>
  )
}

export default ProductsAdmin
