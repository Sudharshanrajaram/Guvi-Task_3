import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import CartModel from './components/CartModel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

 const openCart = () => {
  setIsCartOpen(true);
 };

 const closeCart = () => {
  setIsCartOpen(false);
 };

 const removeFromCart = (productId) => {
  setCartItems(cartItems.filter((item) => item.id !== productId));
 };

  return (
    <>
     <Navbar openCart={openCart} cartCount={cartItems.length}  />
     <ProductList cartItems={cartItems} setCartItems={setCartItems} />
     {
      isCartOpen && (
        <CartModel cartItems={cartItems} closeCart={closeCart} cartCount={cartItems.length} removeFromCart={removeFromCart}  />
      )
     }
     
    </>
  )
}

export default App
