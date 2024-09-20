import React from 'react'
import IMG1 from '../../assets/portfolio.jpg'
import IMG2 from '../../assets/hui0.jpg'
import img4 from '../../assets/boMadagems.png'
import img5 from '../../assets/etang.png'
import img6 from '../../assets/ARGS.png'
import img7 from '../../assets/jlr.png'

import './portfolio.css'

const Portfolio = () => {
  return (
    <section id='portfolio'>
      <h5>My Recent Accomplishment</h5>
      <h2>Portfolio</h2>

      <div className='container portfolio__container'>
        <article className='portfolio__item'>
          <div className="portfolio__item-image">

            <img src={IMG1} alt=""/>
          </div>
          <h3>This Portfolio</h3>
          <div className="portfolio__item-cta">
            <a href="https://github.com/SafidyRH/Portfolio-" className='btn'>Github</a>
          </div>
        </article>
        <article className='portfolio__item'>
          <div className="portfolio__item-image">
            <img src={IMG2} alt="" srcSet=""/>
          </div>
          <h3>Hackathon Inter-Universitaire 2023</h3>
          <div className='texta'>
            <p className='text-light'>
              Our team finished in the Top 8 of thirsty teams participants during the Inter-University
              HACKATHON 2023.
            </p>
          </div>

        </article>

        <article className='portfolio__item' onClick={() => window.open("https://bo.madagems.bdnhub.com/", "_blank")}>
          <div className="portfolio__item-image">
            <img src={img4} alt="" srcSet=""/>
          </div>
          <h3>Madagems BO</h3>
          <div className='texta'>
            <p className='text-light'>
              Back office for the administration of an e-commerce application for the sale of precious stones
            </p>
          </div>

        </article>
        <article className='portfolio__item' onClick={() => window.open("https://pdb.bdnhub.com/", "_blank")}>
          <div className="portfolio__item-image">
            <img src={img5} alt="" srcSet=""/>
          </div>
          <h3>Etang de puy de Bost</h3>
          <div className='texta'>
            <p className='text-light'>
              Showcase site for a fishing pond with integration of an online reservation system
            </p>
          </div>

        </article>
        <article className='portfolio__item' onClick={() => window.open("https://args.bdnhub.com/", "_blank")}>
          <div className="portfolio__item-image">
            <img src={img6} alt="" srcSet=""/>
          </div>
          <h3>ARGS</h3>
          <div className='texta'>
            <p className='text-light'>
              Showcase site for an IT development company
            </p>
          </div>

        </article>
        <article className='portfolio__item' onClick={() =>
            window.open(
                "https://jlr.bdnhub.com/",
                "_blank",
            )
        }
        >
          <div className="portfolio__item-image">
            <img src={img7} alt="" srcSet=""/>
          </div>
          <h3>Jean le Rasta</h3>
          <div className='texta'>
            <p className='text-light'>
              Showcase site for the Jean le Rasta hotel and restaurant in Morondava
            </p>
          </div>

        </article>
      </div>

    </section>
  )
}

export default Portfolio