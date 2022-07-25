import { Form, Button } from 'react-bootstrap'

function ProductsAdmin() {
  return (
    <>
      <h1 className='text-center title pt-5'>
      Products
      </h1>
      <h2>Add new Product</h2>
      <Form className="row align-items-center">
        <div className="d-flex col-6 align-items-center">
          <Form.Label className='pe-2 pt-1'>
            Name:
          </Form.Label>
          <Form.Control placeholder="name" required/>
        </div>
        <div className="d-flex col-2">
          <Form.Label className='pe-2 pt-1'>
            Price: 
          </Form.Label>
          <Form.Control type="number" placeholder="$99.99" required/>
        </div>
        <div className="d-flex col-4">
          <Form.Label className='pe-2 pt-1'>
            Images: 
          </Form.Label>
          <Form.Control type="file" className="text-dark" required/>
        </div>
        <div className="col-12">
          <Form.Label className='pb-0 pt-2'>
            Description:
          </Form.Label>
          <Form.Control as="textarea" rows={4} placeholder='product description...' required/>
        </div>
        <Button type="submit" variant="success col-3 mx-auto mt-3 rounded">
          Add Product
        </Button>
      </Form>
    </>
  )
}

export default ProductsAdmin
