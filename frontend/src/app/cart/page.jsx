'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../redux/slice'
import { loadStripe } from '@stripe/stripe-js'

const Page = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const [isProcessing, setIsProcessing] = useState(false); // Loading state

  console.log(cart);

  const handleRemoveCart = (id) => {
    dispatch(removeFromCart({ id })); // Remove item by id
  };

  const totalCost = cart.reduce((acc, item) => acc + item.price, 0);

  const makePayment = async () => {
    setIsProcessing(true); // Set processing to true when payment starts

    const stripe = await loadStripe('pk_test_51Pz6WERoTuW6EzfZMfdekxghKcp4HeLFpylRthgBdNLRu7HOOFasCgsWxBHtBxz5VLgkJNYVqIqYSMPQ0nPUVMU500iSvuZ0et');
    
    const body = { products: cart };
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await fetch(`https://stripecheck.onrender.com/`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log('Payment error: ', error);
    } finally {
      setIsProcessing(false); // Set processing to false after payment process ends
    }
  };

  return (
    <div className='text-center mt-9 lg:mx-[100px]'>
      <Link href={'/'} className='hover:text-red-500 bg-slate-100 shadow-md p-2 text-black'>
        Back Home
      </Link>

      <div className='text-center flex flex-wrap gap-2 mt-9'>
        {cart.map((item, index) => (
          <div key={index} className='flex flex-col border w-[150px] mt-3 mx-auto p-4 bg-yellow-200 rounded-lg'>
            <label className='text-black'>{item.name}</label>
            <button
              onClick={() => handleRemoveCart(item.id)}
              className='bg-red-400 w-[100px] rounded-lg mx-auto mt-1 hover:opacity-85'>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className='mt-[100px] w-[300px]  lg:w-[350px] mx-auto bg-green-600 rounded-lg shadow-lg'>
        <h1 className='mt-5 p-2 text-lg font-bold text-white'>Checkout</h1>

        {/* Pay Button */}
        <button
          onClick={makePayment}
          className={`bg-slate-100 p-2 rounded-lg mb-3 mt-2 text-black hover:bg-slate-300 ${isProcessing ? 'cursor-not-allowed' : ''}`}
          disabled={isProcessing} // Disable button while processing
        >
          {isProcessing ? 'Processing...' : `Pay $${totalCost}`}
        </button>
      </div>
    </div>
  );
};

export default Page;
