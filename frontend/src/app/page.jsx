'use client';

import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './redux/slice';

function Page() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart); // Retrieve cart from Redux state directly

  const list = [
    { name: 'Bread', price: 30, id: 1 },
    { name: 'Milk', price: 60, id: 2 },
    { name: 'Banana', price: 10, id: 3 },
    { name: 'Apple', price: 30, id: 4 },
    { name: 'Orange', price: 20, id: 5 },
    { name: 'Eggs', price: 40, id: 6 },
    { name: 'Cheese', price: 80, id: 7 },
    { name: 'Butter', price: 50, id: 8 },
    { name: 'Yogurt', price: 25, id: 9 },
    { name: 'Chicken', price: 150, id: 10 },
    { name: 'Beef', price: 200, id: 11 },
    { name: 'Rice', price: 70, id: 12 },
    { name: 'Pasta', price: 45, id: 13 },
    { name: 'Tomatoes', price: 15, id: 14 },
    { name: 'Potatoes', price: 35, id: 15 },
    { name: 'Onions', price: 25, id: 16 },
    { name: 'Garlic', price: 10, id: 17 },
    { name: 'Peppers', price: 20, id: 18 },
    { name: 'Cereal', price: 60, id: 19 },
    { name: 'Honey', price: 40, id: 22 },
    { name: 'Sugar', price: 40, id: 23 },
  ];

  const handleAddToCart = (id) => {
    const item = list.find((items) => items.id === id);
    if (item && !cart.find((cartItem) => cartItem.id === id)) {
      dispatch(addToCart(item));
    }
  };

  return (
    <div className='text-center mt-9 lg:mx-[100px]'>
      <Link href='/cart' className='hover:text-red-500 bg-slate-100 shadow-md p-2 text-black'>
        View Cart
      </Link>

      <div className='text-center flex flex-wrap gap-2 mt-9'>
        {list.map((item) => {
          const isInCart = cart.some(cartItem => cartItem.id === item.id);
          return (
            <div key={item.id} className='flex flex-col border w-[150px] lg:w-[200px] mx-auto p-4 bg-slate-100 rounded-lg shadow-md gap-2 mt-3'>
              <label className='text-black'>{item.name}</label>
              <button
                onClick={() => handleAddToCart(item.id)}
                className={`w-[100px] text-black rounded-lg mx-auto ${isInCart ? 'bg-green-300 cursor-not-allowed' : 'bg-yellow-300 hover:opacity-85'}`}
                disabled={isInCart}
              >
                {isInCart ? 'Added' : 'Add to cart'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
