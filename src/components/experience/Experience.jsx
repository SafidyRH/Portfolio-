import React from 'react'
import './experience.css'
import { BsPatchCheckFill } from 'react-icons/bs'


const Experience = () => {
  return (
    <section id='experience'>
      <h5>What Skills I Have</h5>
      <h2>My Experience</h2>

      <div className="container experience__container">
        <div className="experience">
          <h3>Frontend Development</h3>
          <div className="experience__content">
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>
                  <h4>HTML</h4>
                  <small className='text-light'>Basic</small>

                </div>
            </article>
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>

                  <h4>CSS</h4>
                  <small className='text-light'>Basic</small>
                </div>
            </article>
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>

                  <h4>JavaScript</h4>
                  <small className='text-light'>Basic</small>
                </div>
            </article>
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>
                  <h4>Bootstrap</h4>
                  <small className='text-light'>Basic</small>

                </div>
            </article>
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>

                  <h4>React</h4>
                  <small className='text-light'>Basic</small>
                </div>
            </article>
            
          </div>
        </div>
        <div className="experience">
        <h3>Backend Development</h3>
          <div className="experience__content">
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>

                  <h4>Java / JavaEE</h4>
                  <small className='text-light'>Intermediate</small>
                </div>
            </article>
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>

                  <h4>Python</h4>
                  <small className='text-light'>Intermediate</small>
                </div>
            </article>
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>

                  <h4>Node JS</h4>
                  <small className='text-light'>Basic</small>
                </div>
            </article>
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>

                  <h4>Django</h4>
                  <small className='text-light'>Intermediate</small>
                </div>
            </article>
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>

                  <h4>Express</h4>
                  <small className='text-light'>Intermediate</small>
                </div>
            </article>
            <article className='experience__details'>
                <div>
                <BsPatchCheckFill className='experience__details-icon'/>
                </div>
                
                <div>
                <h4>MySQL / PostgreSQL / SQLServer / MongoDB</h4>
                <small className='text-light'>Intermediate</small>
                </div>
            </article>
            
          </div>
        </div>
          
        
        <div className="experience">
        <h3>Embedded System Development</h3>
          <div className="experience__content">
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>

                  <h4>C</h4>
                  <small className='text-light'>Intermediate</small>
                </div>
            </article>
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>

                  <h4>C++</h4>
                  <small className='text-light'>Intermediate</small>
                </div>
            </article>
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>

                  <h4>Arduino</h4>
                  <small className='text-light'>Intermediate</small>
                </div>
            </article>
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon' />
                <div>

                  <h4>PIC</h4>
                  <small className='text-light'>Basic</small>
                </div>
            </article>
            
          </div>
          
        </div>

        <div className="experience__embedded">
        <h3>Development Tools</h3>
          <div className="experience__content">
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>

                  <h4>VIsual Studio Code</h4>
                  <small className='text-light'>Intermediate</small>
                </div>
            </article>
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>

                  <h4>Git</h4>
                  <small className='text-light'>Intermediate</small>
                </div>
            </article>
            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon' />
                <div>

                  <h4>Linux</h4>
                  <small className='text-light'>Advance</small>
                </div>
            </article>

            <article className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon' />
                <div>

                  <h4>Docker</h4>
                  <small className='text-light'>Basic</small>
                </div>
            </article>
            
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Experience