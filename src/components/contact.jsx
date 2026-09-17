import validator from 'validator'
import { Facebook, Linkedin, Mail, Send } from 'grommet-icons'
import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/raoelinirina-safidy-775902243',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://web.facebook.com/profile.php?id=100009578931225',
    label: 'Facebook',
    icon: Facebook,
  },
  {
    href: 'mailto:safidytiavina21@gmail.com',
    label: 'E-mail',
    icon: Mail,
  },
]

const inputClassName = hasError => [
  'w-full rounded-2xl border bg-black/30 px-4 py-3 text-sm text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-tertiary)]',
  hasError
    ? 'border-[color:var(--color-danger)]'
    : 'border-[color:var(--color-border-default)]',
].join(' ')

const ContactForm = () => {
  const formReference = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState('')

  const validateForm = () => {
    const nextErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = 'Le nom est requis.'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'L e-mail est requis.'
    }
    else if (!validator.isEmail(formData.email)) {
      nextErrors.email = 'Veuillez saisir une adresse e-mail valide.'
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Le message est requis.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      await emailjs.sendForm(
        'service_bpiw6sa',
        'template_unpnj9i',
        formReference.current,
        'hmDtRRM2EWJAciaU0',
      )

      setFormData({
        name: '',
        email: '',
        message: '',
      })
      setErrors({})
      setStatus('Votre message a bien ete envoye.')
    }
    catch (error) {
      console.error('Error sending email:', error)
      setStatus('L envoi a echoue. Veuillez reessayer ou me contacter directement par e-mail.')
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

    if (errors[field]) {
      setErrors(previousErrors => ({
        ...previousErrors,
        [field]: undefined,
      }))
    }
  }

  return (
    <div className="section-frame">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="section-kicker">Contact</p>
            <h2 className="section-title">Construisons quelque chose de clair, utile et pret à être livré.</h2>
            <p className="section-copy">
              Si vous cherchez un developpeur front-end attentif a la structure, au detail et à la livraison,
              je serai ravi d&apos;echanger sur votre projet.
            </p>
          </div>

          <div className="grid gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between rounded-[22px] border border-[color:var(--color-border-default)] bg-black/30 px-4 py-4"
              >
                <span className="flex items-center gap-3">
                  <span className="rounded-full border border-[color:var(--color-border-default)] p-2">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>{label}</span>
                </span>
                <span className="text-sm text-[color:var(--color-text-tertiary)]">Ouvrir</span>
              </a>
            ))}
          </div>
        </div>

        <form ref={formReference} onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm text-[color:var(--color-text-secondary)]">
                Nom
              </label>
              <input
                id="name"
                name="from_name"
                type="text"
                value={formData.name}
                onChange={handleChange('name')}
                className={inputClassName(Boolean(errors.name))}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm text-[color:var(--color-danger)]">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-[color:var(--color-text-secondary)]">
                E-mail
              </label>
              <input
                id="email"
                name="from_email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                className={inputClassName(Boolean(errors.email))}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-[color:var(--color-danger)]">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm text-[color:var(--color-text-secondary)]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange('message')}
              className={`${inputClassName(Boolean(errors.message))} min-h-[180px] resize-y`}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-2 text-sm text-[color:var(--color-danger)]">
                {errors.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Envoi...' : 'Envoyer le message'}
            </button>

            {status && (
              <p className="text-sm text-[color:var(--color-text-tertiary)]" role="status">
                {status}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
