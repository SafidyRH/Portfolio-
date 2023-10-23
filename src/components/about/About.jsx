import React from 'react'
import './about.css'
import ME from '../../assets/IMG-removebg.png'
import { FaAward } from 'react-icons/fa'
import {FiUsers} from 'react-icons/fi'
import {VscFolderLibrary} from 'react-icons/vsc'

const About = () => {
  return (
    <section id='about'>
      <h5>Get to Know</h5>
      <h2>About Me</h2>
 
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-img">
            <img src={ME} alt="" />
          </div>
        </div>
        <div className="about__content">
          <div className='about__cards'>
            <article className='about__card'>
              <FaAward className='about__icon'/>
              <h5>Experience</h5>
              <small>Junior Developer</small>
            </article>

            <article className='about__card'>
              <FiUsers className='about__icon'/>
              <h5>Clients</h5>
              <small>WorldWide</small>
            </article>

            <article className='about__card'>
              <VscFolderLibrary className='about__icon'/>
              <h5>Projets</h5>
              <small>+10 Contributed</small>
            </article>
          </div>

          <p>
            Computer enthusiast, I learned to code from a very young age
            in various computer languages such as C, Java, Python,...
            I have created personal projects of which this portfolio is a part.
            Versatile, I master the different technical stages of the creation
            of a computer application; of understanding user needs to development
            especially at the BACKEND level
          </p>
          
          <div className="talk__button">
              <a href="#contact" className='btn btn-primary'>Let's Talk</a>

          </div>

        </div>
      </div>
    </section>
  )
}

export default About