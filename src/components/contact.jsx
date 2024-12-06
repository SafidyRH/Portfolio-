import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Linkedin, Facebook, Mail, Send } from 'grommet-icons'
import validator from 'validator'

const ContactForm = () => {
  const formReference = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const errorsNew = {}

    // Validate name
    if (!formData.name.trim()) {
      errorsNew.name = 'Name is required'
    }

    // Validate email
    if (!formData.email.trim()) {
      errorsNew.email = 'Email is required'
    }
    else if (!validator.isEmail(formData.email)) {
      errorsNew.email = 'Please enter a valid email address'
    }

    // Validate message
    if (!formData.message.trim()) {
      errorsNew.message = 'Message is required'
    }

    setErrors(errorsNew)
    return Object.keys(errorsNew).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Validate form before submission
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      await emailjs.sendForm(
        'service_bpiw6sa',
        'template_unpnj9i',
        formReference.current, // Pass the form reference
        'hmDtRRM2EWJAciaU0',
      )
      alert('Message sent successfully!')

      // Reset form data
      setFormData({
        name: '',
        email: '',
        message: '',
      })

      // Clear any previous errors
      setErrors({})
    }
    catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to send message. Please try again.')
    }
    finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = field => (event) => {
    const value = event.target.value
    setFormData(previousData => ({
      ...previousData,
      [field]: value,
    }))

    // Clear the specific error when user starts typing
    if (errors[field]) {
      setErrors(previousErrors => ({
        ...previousErrors,
        [field]: undefined,
      }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-center gap-6 mb-8">
        <a
          href="https://www.linkedin.com/in/raoelinirina-safidy-775902243"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <Linkedin className="w-6 h-6 text-white" />
        </a>
        <a
          href="https://web.facebook.com/profile.php?id=100009578931225"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <Facebook className="w-6 h-6 text-white" />
        </a>
        <a
          href="mailto:safidytiavina21@gmail.com"
          className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <Mail className="w-6 h-6 text-white" />
        </a>
      </div>

      <form
        ref={formReference}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
              Name
            </label>
            <input
              id="name"
              name="from_name"
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              className={`w-full p-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-2 border-red-500 focus:ring-red-500'
                  : 'focus:ring-blue-500'
              } text-white placeholder-white/60`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
              Email
            </label>
            <input
              id="email"
              name="from_email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              className={`w-full p-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-2 border-red-500 focus:ring-red-500'
                  : 'focus:ring-blue-500'
              } text-white placeholder-white/60`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange('message')}
            className={`w-full p-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 ${
              errors.message
                ? 'border-2 border-red-500 focus:ring-red-500'
                : 'focus:ring-blue-500'
            } text-white placeholder-white/60 min-h-[150px]`}
            required
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? 'Sending...'
            : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
