import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className='flex  justify-center'>
    <div className='mt-10'>
      <h2 className='text-center text-3xl'>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input  className='mt-5 p-3 md:w-80 border-2 border-blue-500 rounded-lg'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input  className='mt-5 p-3 md:w-80 border-2 border-blue-500 rounded-lg'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='bg-blue-500 p-3 mt-4 text-white rounded-lg' type="submit">Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
