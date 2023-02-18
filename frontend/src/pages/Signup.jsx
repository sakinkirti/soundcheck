import React from 'react'
import './signup.css'
import SignupForm from '../components/SignupForm'


const Signup = () => {
  return (
    <div className='container'>
      <h1 style={{fontSize:'20px', paddingTop:'40px'}} className='title'>Soundcheck! Signup</h1>
      <SignupForm/>
    </div>
  )
}

export default Signup