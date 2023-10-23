import React from 'react'
import './footer.css'
import { FaFacebook } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
        <a href="#home" className='footer__logo'>SAFIDY RH</a>

        <ul className='permalinks'>
            <li> <a href="#home">Home</a> </li>
            <li> <a href="#about">About</a> </li>
            <li> <a href="#experience">Experiences</a> </li>
            <li> <a href="#services">Services</a> </li>
            <li> <a href="#portfolio">Portfolio</a> </li>
            <li> <a href="#contact">Contact</a> </li>

        </ul>

        <div className="footer__socials">
            <a href="https://www.facebook.com/profile.php?id=100009578931225"><FaFacebook/> </a>
            <a href="https://www.linkedin.com/in/raoelinirina-safidy-775902243"><FaLinkedin/></a>
            <a href="https://github.com/SafidyRH"><FaGithub/> </a>
        </div>

        <div className="footer__copyright">
            <small> &copy; SAFIDY RH 2023. All right reserved. </small>
        </div>
    </footer>
  )
}

export default Footer