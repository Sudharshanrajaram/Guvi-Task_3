import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordRequest, resetPassword } from '../services/api';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useParams();  // To get the token from the URL
  const navigate = useNavigate();

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      await resetPasswordRequest(email);
      setSuccess('Password reset email sent!');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(token, password);
      setSuccess('Password reset successfully!');
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className='flex justify-center'> 
      {token ? (
        <div className='mt-10 '> 
          <h2 className='text-3xl'>Reset Password</h2>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <form onSubmit={handleResetPassword} className='flex flex-col'>
            <input className='mt-5 p-3 md:w-80 border-2 border-blue-500 rounded-lg'
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className='bg-blue-500 text-white p-3 mt-4 rounded-lg' type="submit">Reset Password</button>
          </form>
        </div>
      ) : (
        <div className='mt-10'>
          <h2 className='text-3xl'>Request Password Reset</h2>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <form onSubmit={handleRequestReset} className='flex flex-col'>
            <input className='mt-5 p-3 md:w-80 border-2 border-blue-500 rounded-lg'
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className='bg-blue-500 text-white p-3 mt-4 rounded-lg' type="submit">Send Reset Link</button>
            <p className='w-80 mt-5'>*Copy the regenerated link from the recived on your mail and paste the Token number </p>

          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
