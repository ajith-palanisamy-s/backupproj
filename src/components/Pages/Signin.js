
import React, { useState } from 'react'
import '../Styles/Signin.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
const Signin = () => {
    const[email,setEmail]=useState();
    const[name,setName]=useState();
    const[password,setPassword]=useState();
 const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('',{email,name,password})
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
 }
  return (
    <div className='sgn'>
    <div class="form-wrapper">
        <h2>Sign In</h2>
        <form action="#">
        <div class="form-control">
                <input type="email" autocomplete="off" onChange={(e)=>setEmail(e.target.value)}/>
                <label>Email</label>
            </div>
            
            <div class="form-control">
            <input type="Password" autocomplete="off" onChange={(e)=>setPassword(e.target.value)} />            
                <label>Password</label>
            </div>
            <button type="submit">Sign In</button>
            <div class="form-help"> 
                <div class="remember-me">
                    <input type="checkbox" id="remember-me"/>
                    <label for="remember-me">Remember me</label>
                </div>
              
            </div>
        </form>
        <p>Register?<NavLink
          
                to="/Signup"
                
                style={{color:'blue'}}
              >
               Sign Up Now
              </NavLink></p>
        
    </div>
    </div>
   
  )
}

export default Signin
