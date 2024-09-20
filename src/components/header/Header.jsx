import React from 'react'
import './header.css'
import CTA from './CTA'
import ME from '../../assets/profil.png'
import HeaderSocial from './HeaderSocial'
import Typed from './Typed'

const Header = () => {
  return (
    <header id='home'>
      <div className="container header__container">
        <h2>Hello I'm</h2>
        <h1>RAOELINIRINA Safidy</h1>
        <h1><Typed/></h1>
        <CTA/>
        <HeaderSocial/> 

        <div className='me'>
          <img src={ME} alt="me" srcset="" />
        </div>

        <a href="#contact" className='scroll__down'> Scroll Down</a>
      </div>
      
       
    </header>
  )
}

export default Header