import React from 'react';
import './contact.css';
import {MdOutlineEmail} from 'react-icons/md';
import { BsLinkedin } from 'react-icons/bs';
import { useRef } from 'react';
import emailjs from 'emailjs-com';
import CustomAlert from '../customAlert/CustomAlert';
import { useState } from 'react';

const Contact = () => {

  const form = useRef();
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [openAlert, setOpenAlert] = useState(false);
  const [, setIsChampVide] = useState("");

  const [isSuccesMessage, setIsSuccesMessage] = useState(false);
 
  const handleOpenAlert = () => {
    /*if(champ1 && champ2 && champ3 !== ""){
      setOpenAlert(true);
    }*/
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if( !toEmail || !subject || !message){
      setIsChampVide('Veuillez remplir tous les champs du formulaire.');
      setOpenAlert(true);
      return;
    }

    emailjs.sendForm('service_bpiw6sa', 'template_unpnj9i', form.current, 'hmDtRRM2EWJAciaU0')

      .then((result) => {
          //alert(result.text);
          console.log('Succes', result);
          setIsSuccesMessage(true);
          setIsChampVide('');
          //document.getElementById('popup').style.display = 'block';
          
      }, (error) => {
          //alert(error.text);
          console.error('error', error);
          setIsSuccesMessage(false);
          setIsChampVide('error d\'envoie, reessaye');
          //document.getElementById('popup').style.display = 'block';  
         
      });
    e.target.reset();
    
  }

  return (
    <section id='contact'>
      <h5>Get in Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className='contact__option'>
            <MdOutlineEmail className='contact__option-icon'/>
            <h4>Email</h4>
            <h5 className='text-light'>safidytiavina21@gmail.com</h5>
            <a href="mailto:safidytiavina21@gmail.com">Send a Message</a>
          </article>
          <article className='contact__option'>
            <BsLinkedin className='contact__option-icon'/>
            <h4>Linkedin</h4>
            <h5 className='text-light'>Safidy Tiavina</h5>
            <a href="https://www.linkedin.com/in/raoelinirina-safidy-775902243">Send a Message</a>
          </article>
        </div>
        <form ref={form} onSubmit={sendEmail}>

          <input type="text" name='Name' value={toEmail} placeholder='Your full Name' onChange={(e) => setToEmail(e.target.value)} required />
          <input type="text" name='Email' value={subject} placeholder='Your Email' onChange={(e) => setSubject(e.target.value)} required />
          <textarea name='message' value={message} rows="7" placeholder='Your Message' onChange={(e) => setMessage(e.target.value)} required ></textarea>
            
          <button type='submit' className='btn btn-primary' onClick={handleOpenAlert} id='popup'>Send Message</button>
 
        </form>

        <CustomAlert open={openAlert} onClose={handleCloseAlert} title={isSuccesMessage ? 'Thank You' : 'Sorry'} message={isSuccesMessage ? 'Your email has been sent Successfully' : 'An error has occured'} />
        
      </div>
    </section>
  )
}

export default Contact;