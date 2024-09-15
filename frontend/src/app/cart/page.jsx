'use client'
import Link from 'next/link'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../redux/slice'
import { loadStripe } from '@stripe/stripe-js'

const Page = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart)
    console.log(cart)


    const handleRemoveCart = (id) => {
        dispatch(removeFromCart({ id })); // Remove item by id
      };

      const totalCost = cart.reduce((acc, item) => acc + item.price, 0);


  

  const makePayment = async ()=> {
    const stripe = await loadStripe('pk_test_51Pz6WERoTuW6EzfZMfdekxghKcp4HeLFpylRthgBdNLRu7HOOFasCgsWxBHtBxz5VLgkJNYVqIqYSMPQ0nPUVMU500iSvuZ0et');
    const body = {
      products: cart
    }
    const headers = {
     "Content-Type": "application/json"
    }
    const response = await fetch(`http://localhost:5000/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id
    });
    if (result.error) {
      console.log(error)
    }
  }



    
  return (
    <div className='text-center mt-9 lg:mx-[100px]'>
      <Link href={'/'} className='hover:text-red-500 bg-slate-100 shadow-md p-2'>
       Back Home
      </Link>

      <div className='text-center flex flex-wrap gap-2 mt-9'>
        {cart.map((item, index) => (
          <div key={index} className='flex flex-col border w-[150px] mx-auto p-4 bg-yellow-200 rounded-lg'>
            <label>{item.name}</label>
           
            <button
              onClick={() => handleRemoveCart(item.id)}
              className='bg-red-400 w-[100px] rounded-lg mx-auto mt-1 hover:opacity-85'>
              Remove
            </button>
          </div>
        ))}
          </div>
          <div className='mt-5   w-[150px] lg:w-[200px]  mx-auto bg-green-600 rounded-lg shadow-lg'>
              <h1 className='mt-5 p-2 text-lg font-bold text-white'>checkout</h1>
        <button onClick={makePayment}
          className='bg-slate-100 p-2 rounded-lg mb-3 mt-2 hover:bg-slate-300'>Pay $ {totalCost}</button>
        
          </div>
    </div>
  )
}

export default Page