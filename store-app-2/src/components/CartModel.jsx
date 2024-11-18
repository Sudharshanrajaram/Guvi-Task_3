import React, { useEffect } from 'react'
import { useState } from 'react'   
import Home from './Home';

function CartModel({ closeCart,cartItems,cartCount,removeFromCart,setCartItems }) {
    const [total, setTotal] = useState(0);
    var fix = total.toFixed(2);
    useEffect(() => {
        setTotal(cartItems.reduce((total, item) => total + item.price * item.quantity, 0));
        
    },[cartItems]);
   
    const handleQuantityChange = (id, action) => {
        const updatedCart = cartItems.map((item) => {
          if (item.id === id) {
            const newQuantity =
              action === "increase" ? item.quantity + 1 : item.quantity - 1;
            return { ...item, quantity: Math.max(1, newQuantity) }; // Prevent quantity from going below 1
          }
          return item;
        });
        setCartItems(updatedCart);
      };

    
    

  return (
    <div>
      
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
                            <div>
                            <div className="flex items-center space-x-4 ml-5 mt-5">
                            <button
                              onClick={() => handleQuantityChange(item.id, "decrease")}
                                             className="px-3 py-1 bg-red-300 rounded hover:bg-red-500"> -</button>
                            <span className="text-lg">{item.quantity}</span>
                             <button
                              onClick={() => handleQuantityChange(item.id, "increase")}
                              className="px-3 py-1 bg-green-300 rounded  hover:bg-green-500"> + </button>
                              <button onClick={() => removeFromCart(item.id)} className='bg-indigo-500 text-white py-1 px-3 font-bold mt-2 rounded-full hover:bg-red-500 hover:text-white'> X </button>
                            </div>
                           
                            
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
    </div>
  )
}

export default CartModel