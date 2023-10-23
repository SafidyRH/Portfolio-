import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'
import { BsFacebook } from 'react-icons/bs'


const HeaderSocial = () => {
  return (
    <div className='header__socials'>
        <a href="https://www.linkedin.com/in/raoelinirina-safidy-775902243"><BsLinkedin/></a>
        <a href="https://github.com/SafidyRH" ><FaGithub/></a>
        <a href="https://www.facebook.com/profile.php?id=100009578931225"><BsFacebook/></a>


    </div>
  )
}

export default HeaderSocial