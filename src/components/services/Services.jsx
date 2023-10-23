import React from 'react'
import './services.css'
import { BiCheck } from 'react-icons/bi'

const Services = () => {
  return (
    <section id='services'>
      <h5>What I offer </h5>
      <h2>Services</h2>

      <div className='container services__container'>
        <article className="service">
           <div className="service__head">
            <h3>Backend Development</h3>
           </div>

           <ul className='service__list'>
            <li>
              <div className='service__list-icon'>
              <BiCheck />
              </div>
              
              <p>
                Transform your idea into the logic of things,
                logics in code, and codes in reality
              </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p>
                Database developer and designer
              </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p>
                API integrator
              </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p>
                Software Architecture
              </p>
            </li>
           </ul>
        </article>

        <article className="service">
           <div className="service__head">
            <h3>API Development</h3>
           </div>

           <ul className='service__list'>
            <li>
              <BiCheck className='service__list-icon'/>
              <p>
                REST
              </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p>
                SOAP
              </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p>
                JSON
              </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p>
                RPC
              </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p>
                WebSocket
              </p>
            </li>
           </ul>
        </article>

        <article className="service">
           <div className="service__head">
            <h3>Embedded System Development</h3>
           </div>

           <ul className='service__list'>
            <li>
              <BiCheck className='service__list-icon'/>
              <p>
                System Design
              </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p>
                PCB Design
              </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p>
                Arduino
              </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p>
                System with Microprocessor
              </p>
            </li>
           </ul>
        </article>


      </div>
    </section>
  )
}

export default Services