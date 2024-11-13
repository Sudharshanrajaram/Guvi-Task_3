import React from 'react'

function CartModel({ closeCart,cartItems,cartCount,removeFromCart }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-10'>
        <div className='bg-white p-6 rounded-lg w-full px-10 shadow-xl '>
            <div className='flex flex-col justify-center items-center'><h2 className='text-xl font-bold text-indigo-600 mb-4'>Your Cart Items</h2>
            <p className='mb-4 font-bold text-indigo-600'> NO OF ITEMS : {cartCount}</p>
                </div>
            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className='flex justify-between items-center mb-2 md:px-20'>
                           <p><img className='h-16 w-12' src={item.image} alt={item.title} /></p>
                            <p className='h-14 w-34'>{item.title}</p>
                            <div>
                            <p className='font-bold text-red-500 text-lg'>$ {item.price}</p>
                            <button onClick={() => removeFromCart(item.id)} className='bg-[#FFEB00] p-2 font-bold mt-2 rounded-full hover:bg-black hover:text-white'>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-gray-500'>Your cart is empty.</p>
            )}
            <div className='flex justify-center items-center'><button onClick={closeCart} className='bg-[#FFEB00] text-black  p-2 font-semibold rounded-full hover:bg-black hover:text-white'>Close Cart</button>
            </div>
        </div>
    </div>
  )
}

export default CartModel