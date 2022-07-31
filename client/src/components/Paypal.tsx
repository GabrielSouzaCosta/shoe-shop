import React from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import toast from 'react-hot-toast'

type Props = {
    quantity: number,
    value: string
}

function Paypal({
    quantity,
    value
}: Props) {
  return (
    <div>
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