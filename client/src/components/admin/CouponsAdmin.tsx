import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faClose } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

interface Coupon {
  id: number | undefined
  code: string
  amount: number
  valid_days: number
  created_at?: string
}

function CouponsAdmin () {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    id: undefined,
    code: "",
    amount: 10,
    valid_days: 7
  })
  const [isEdit, setIsEdit] = useState(false)


  function handleRegisterCoupon(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    axios.post(import.meta.env.VITE_BACKEND_URL+'/coupons/', newCoupon, {
      headers: {
        "Authorization": "Token "+sessionStorage.getItem("token")
      }
    })
    .then(res => 
      {if (res.status == 201) {
        setNewCoupon({...newCoupon, code: ""})
        setCoupons([...coupons, res.data])
      }}
    )
  }

  function handleEditCoupon(e: React.FormEvent<HTMLFormElement>, id: number | undefined) {
    e.preventDefault()
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/coupons/${id}/`, newCoupon, {
      headers: {
        "Authorization": "Token "+sessionStorage.getItem("token")
      }
    })
    .then(res => 
      {if (res.status == 200) {
        setIsEdit(false)
        setNewCoupon({...newCoupon, code: ""})
        setCoupons(coupons.map((coupon) => {
          if (coupon.id === res.data.id) {
            return res.data
          } else {
            return coupon
          }
        }))
      }}
    )
  }

  function handleDeleteCoupon(id: number | undefined) {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/coupons/${id}/`, {
      headers: {
        "Authorization": "Token "+sessionStorage.getItem("token")
      }
    })
    .then(res => {
      if (res.status === 204) {
        setCoupons(coupons.filter((coupon) => coupon.id !== id))
      }
    })
  }

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL+'/coupons/', {
      headers: {
        "Authorization": "Token "+sessionStorage.getItem('token')
      }
    })
    .then(res => setCoupons(res.data))
  }, [])

  return (
  <>
    <h1 className='text-center title pt-5'>
      Coupons
    </h1>
    <Form onSubmit={(e) => isEdit ? handleEditCoupon(e, newCoupon.id) : handleRegisterCoupon(e)} className='row justify-content-center'>
      <div className="col-2">
        <Form.Label className='text-uppercase mb-0 title'>
          Code
        </Form.Label>
        <Form.Control 
        value={newCoupon.code} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCoupon({...newCoupon, code: e.currentTarget.value.toUpperCase()})} 
        className='text-dark'
        placeholder='e.g SHOES10'
        required
        />
      </div>
      <div className="col-2">
        <Form.Label className='text-uppercase mb-0 title'>
          discount
        </Form.Label>
        <Form.Control 
        type="number" 
        className='text-dark' 
        value={newCoupon.amount} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCoupon({...newCoupon, amount: Number(e.currentTarget.value)})} 
        required
        />
      </div>
      <div className="col-2">
        <Form.Label className='text-uppercase mb-0 title'>
          Valid Days
        </Form.Label>
        <Form.Control
        type="number" 
        className='text-dark'
        value={newCoupon.valid_days} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCoupon({...newCoupon, valid_days: Number(e.currentTarget.value)})} 
        required
        />
      </div>
      <div className="col-12 text-center mt-3">
        {(isEdit)?
        <>
        <Button 
        variant="warning" 
        type="submit" 
        className='text-uppercase text-light title me-2 fw-bold'>
          Edit Coupon
        </Button>
        <Button 
        onClick={() => setIsEdit(false)} 
        variant="danger" 
        className='text-uppercase title fw-bold'>
          Cancel 
        </Button>
        </>
        :
        <Button variant="success" type="submit" className='text-uppercase title rounded fw-bold'>
          Register Coupon
        </Button>}
      </div>
    </Form>
    <div className='row mx-auto bg-light text-uppercase fs-3 mt-4'>
        <div className='col-3 border border-1 border-dark'>
          Code
        </div>
        <div className='col-3 border border-1 border-dark'>
          Discount(%)
        </div>
        <div className='col-3 border border-1 border-dark'>
          Created in
        </div>
        <div className='col-3 border border-1 border-dark'>
          Expires in
        </div>
    </div>
    {coupons?.map((coupon) => (
      <div className='row mx-auto bg-primary fs-4'>
        <div className='col-3 border border-1 border-dark'>
          {coupon.code}
        </div>
        <div className='col-3 border border-1 border-dark'>
          %{coupon.amount.toFixed(2)}
        </div>
        <div className='col-3 border border-1 border-dark'>
          {coupon.created_at?.substring(0, 10)}
        </div>
        <div className='col-3 border border-1 border-dark position-relative'>
          {coupon.created_at?.substring(0, 10)}
          <div className="position-absolute end-0 bottom-0">
            <Button onClick={() => {setNewCoupon(coupon); setIsEdit(true)}} variant='secondary' className='py-1'>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button onClick={() => handleDeleteCoupon(coupon.id)} variant='danger' className='py-1'>
              <FontAwesomeIcon icon={faClose} />
            </Button>
          </div>
        </div>
          <div className='col-auto bg-primary border'>
          </div>
          <div className='col-auto bg-danger border'>
          </div>
      </div>
    ))
    }
  
  </>
  )
}

export default CouponsAdmin
