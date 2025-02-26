import React, { useEffect } from 'react'
import { useState } from 'react'   

function CartModel({ closeCart,cartItems,cartCount,removeFromCart,setCartItems }) {
    const [total, setTotal] = useState(0);
    var fix = total.toFixed(2);
    useEffect(() => {
        setTotal(cartItems.reduce((total, item) => total + item.price * item.quantity, 0));
        
    },[cartItems]);
   
    
    
    

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-10'>
        <div className='bg-white p-6 rounded-lg w-full px-10 shadow-xl '>
        <div className='absolute right-3/4'><button onClick={closeCart} className='bg-red-400 text-white  px-3 py-1.5 font-semibold rounded-full hover:bg-black hover:text-white'> X </button>
        </div>
            <div className='flex flex-col justify-center items-center'><h2 className='text-xl font-bold text-indigo-600 mb-4'>Your Cart Items</h2>
            <p className='mb-4 font-bold text-indigo-600 text-xl'> Chectout Items : {cartCount}</p>
                </div>
            {cartItems.length > 0 ? (
                <div className='h-64 overflow-y-auto'>
                    {cartItems.map((item) => (
                        <div key={item.length} className='flex justify-center mb-2 md:px-20'>
                           <p><img className='h-20 w-16 p-1 mr-5' src={item.image} alt={item.title} /></p>
                            <div className='border-2 border-gray-400 p-2 h-34 w-80'>
                            <p className='text-xs pb-2 border-b-2 border-gray-400'>{item.title}</p>
                            <p className='font-bold text-red-500 '>Price : $ {item.price}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-gray-500 text-center'>Your cart is empty.</p>
            )}
           <div className='flex md:space-x-10 justify-center'>
           <p className='mt-3 font-bold text-indigo-600  md:text-2xl'>Total Amount : $ {fix} </p>
            <button className='bg-indigo-600 p-2 md:p-3  text-white rounded-lg font-semibold hover:bg-indigo-700'>Checkout</button>
           </div>
        </div>
    </div>
  )
}

export default CartModel