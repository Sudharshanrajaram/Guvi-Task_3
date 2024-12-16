import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import img1 from '../assets/images/login img.avif';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);  // Save JWT token to localStorage
      navigate('/dashboard');

    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className='md:flex justify-center '>
    <img src={img1} className='ml-20 h-34 w-22 md:h-80 w-80 opacity-50 ' alt="" />
    <div >
    <div className='mt-10 '>
      <h2 className='text-4xl text-center'>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className='flex flex-col '>
        <input className='mt-5 p-3 md:w-80 border-2 border-blue-500 rounded-lg'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input className='mt-5 p-3 md:w-80 border-2 border-blue-500 rounded-lg'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='bg-blue-500 text-white mt-4 p-3 rounded-lg' type="submit">Login</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Login;
