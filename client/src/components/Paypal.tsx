import React from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

type Props = {
    quantity: number,
    value: string
}

function Paypal({
    quantity,
    value
}: Props) {
  const navigate = useNavigate()

  return (
    <div>
        <h2 className='mb-3 text-center'>
            A new window will open to proceed with the payment
        </h2>
        <PayPalButtons 
        style={{ layout: "horizontal" }}
        createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: value
                        }
                    }
                ]
            })
        }}

        onApprove={async (data, actions) => {
            return await actions.order?.capture().then(details => {
                toast.success("Payment success. Thank you "+ details.payer.name?.given_name)
                navigate('/payment-success', {state: {paypal: details}})
            })
        }}
        onCancel={() => {
            toast("The payment was cancelled", {
                duration: 6000
            })
        }}
        onError={(err) => {
            console.log(err)
            toast.error("There was an error with the payment, try again.")
        }}
         />
    </div>
  )
}

export default Paypal