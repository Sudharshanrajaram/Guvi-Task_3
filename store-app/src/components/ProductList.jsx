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
            setCartItems([...cartItems,  { ...product, quantity: 1 }]);
        }
    }

    
  return (
     <div>
         
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto px-4 py-4 bg-[#FFE1FF] '>
        {product.map((product) => (
           <div key={product.id} className='border-2 border-black  p-4 rounded-lg bg-white  '>
            <img src={product.image} alt={product.title} className='h-44 w-36 md:ml-6 ' />
            <div className=' '>
            <h2 className=' text-black font-bold mt-2 mb-2'>{product.title}</h2>
            <p className='text-xs h-10 overflow-y-auto border-2  border-gray-400 px-1'>{product.description}</p>
            <p className='font-bold mt-2 text-lg'><span className='line-through text-gray-400 mr-2'>$ 999</span>$ {product.price}</p>
            <button onClick={() => addToCart(product)} className='bg-[#E4B1F0] p-3 font-bold mt-2 rounded-full hover:bg-black hover:text-white '>Add Cart</button>
            <p className='mt-2 text-yellow-600'>★★★★☆ 2990 reviews</p>
            </div>
           </div> 
        ))}
    </div>
    </div>
  )
}

export default ProductList