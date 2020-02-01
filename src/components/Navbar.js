import React from 'react'
import {
  Link
} from "react-router-dom";
import '../css/navbar.css';
import Test from './test';


const Navbar= ()=>{
  
  return (
    <div className = 'navbar'>

        <ul>
          <li><Link to="/" className='navlink'>Home</Link></li>
          <li><Link to="/list" className='navlink'>Lista</Link></li>
          <li><Link to="/add" className='navlink'>Dodaj nowy</Link></li>
          <li><Link to="/" className='navlink'>Konto</Link></li>
          <li><Link to="/signup" className='navlink'>Sign Up</Link></li>
        </ul>
        <Test/>
    </div> 

  )

}

export default Navbar