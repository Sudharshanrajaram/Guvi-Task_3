import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className=' flex justify-center items-center'>
     <div>
      <div className='mt-10 text-3xl'>
        <h1>Welcome User....</h1>
        <h1>Login Sucessfull</h1>
        </div>
        <button className='bg-blue-500 text-white p-3 mt-4 rounded-lg' onClick={() => navigate('/reset')}>Reset Password</button>
        <p className='text-md mt-2'>You can reset password by raising request</p>
    </div>
    </div>
  )
}

export default Dashboard