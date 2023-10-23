import React from 'react'
import IMG1 from '../../assets/portfolio.jpg'
import IMG2 from '../../assets/hui0.jpg'
import IMG3 from '../../assets/memoire.png'

import './portfolio.css'

const Portfolio = () => {
  return (
    <section id='portfolio'>
      <h5>My Recent Accomplishment</h5>
      <h2>Portfolio</h2>

      <div className='container portfolio__container'>
        <article className='portfolio__item'>
          <div className="portfolio__item-image">
            
            <img src={IMG1} alt="" />
          </div>
          <h3>This Portfolio</h3>
          <div className="portfolio__item-cta">
            <a href="https://github.com/SafidyRH" className='btn'>Github</a>
          </div>
        </article>
        <article className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={IMG2} alt="" srcset="" />
          </div>
          <h3>Hackathon Inter-Universitaire 2023</h3>
          <div className='texta'>
            <p className='text-light'>
              Our team finished in the Top 8 of thirsty teams participants during the Inter-University
              HACKATHON 2023. 
            </p>
          </div>
          
        </article>
        <article className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={IMG3} alt="" srcset="" />
          </div>
          <h3>Anemometer</h3>
          <div className='texta'>
            <p className='text-light'>
              This electronic device was created during my Licence Thesis. 
              It is a device that used to measure wind speed.
            </p>
          </div>
          
        </article>
      </div>

    </section>
  )
}

export default Portfolio