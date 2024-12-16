import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className=''>
    <nav className='bg-blue-500 p-4 text-white'>
      <ul className='flex justify-center items-center space-x-10'>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/reset">Reset Password</Link></li>
        <Link to='/dashboard'></Link>
      </ul>
    </nav>
    </div>
  );
};

export default Navbar;
