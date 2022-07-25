import { Button } from 'react-bootstrap'

function CouponsAdmin () {
  return (<>
    <h1 className='text-center title pt-5'>
    Coupons
  </h1>
  <div className='d-flex h-50 bg-gray align-items-center '>
    <div className='col-6 text-center bg-secondary card me-2'>
      <Button variant="dark" className='fs-1'>
        My Coupons
      </Button>
    </div>
    <div className='col-6 text-start card'>
      <Button className='fs-1'>
        Register New Coupons
      </Button>
    </div>
    </div>
  </>
  )
}

export default CouponsAdmin
