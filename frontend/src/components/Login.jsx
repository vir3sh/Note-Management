import React from 'react'
import profileicon from '../assets/profileicon.png'
import './Signup.css'
import Text from './Text'
const Login = () => {
  
  return (
    

<div className="whole">
  <Text/>
<div className="container">
  
  <div className="left-section">
    <form action="{}">
  
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="emailId" />

      <label htmlFor="password">Password</label>
      <input type="password" name="pass" id="passwordId" />

      <button type='submit'>Submit</button>
    </form>
  </div>
  <div className="right-section">
    <img src={profileicon} alt="image1" />
  </div>
</div>
</div>
  )
}

export default Login
