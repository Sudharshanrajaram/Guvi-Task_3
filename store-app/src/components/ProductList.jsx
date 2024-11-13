import React, { useEffect, useState } from 'react'

function ProductList({ cartItems, setCartItems }) {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setProduct(json))
    }, []);

    const addToCart = (product) => {
        if (cartItems.find((item) => item.id === product.id)) {
            alert('Product already in cart');
        }
        else {
            setCartItems([...cartItems, product]);
        }
    }

    
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto px-4 py-4 bg-[#006BFF] '>
        {product.map((product) => (
           <div key={product.id} className='border-4 border-[#FFEB00]  p-4 rounded-lg bg-white flex justify-between items-center hover:opacity-80 '>
            <img src={product.image} alt={product.title} className='h-56 w-48 md:ml-6 ' />
            <div className='h-48 w-48 mb-8'>
            <h2 className=' text-gray-600 font-bold mb-2'>{product.title}</h2>
            <p className='font-bold text-red-500 text-lg'>$ {product.price}</p>
            <button onClick={() => addToCart(product)} className='bg-[#FFEB00] p-3 font-bold mt-2 rounded-full hover:bg-black hover:text-white '>Add Cart</button>
            </div>
           </div> 
        ))}
    </div>
  )
}

export default ProductList