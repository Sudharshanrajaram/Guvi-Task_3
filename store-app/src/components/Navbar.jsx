import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from "../assets/screenshots/Cluster-logo.png";
import logo1 from "../assets/screenshots/cluster-logo-black.png";


function Navbar({ openCart,cartCount }) {
  return (
    <nav className='bg-[#E4B1F0] py-5 border-2 border-black'>
       <div className='flex md:justify-between mx-auto px-4 '>
        <div className=''>
        <img src={logo1} alt="logo" className='h-14 w-60' />
        </div>
       <div className='flex '>
       <svg className='h-6 w-6 mt-6 md:mt-4 md:mr-2 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 
       464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/> </svg><p className='absolute ml-3 font-bold bg-black text-white rounded-full w-5 h-6 text-center'>{cartCount}</p>
       <button className='font-bold text-xl px-4 py-2 hover:bg-black hover:text-white  p-2 rounded-lg'>Products</button>
       <button onClick={openCart} className='font-bold text-xl hover:bg-black hover:text-white  p-2 rounded-lg '>
        Cart Items</button>
        </div>
        </div>
    </nav>
  )
}

export default Navbar
// bg-gradient-to-r  from-[#15B392] to-[#37AFE1]