import { Link } from 'react-scroll'
import { Down } from 'grommet-icons'

const Hero = () => {
  const services = [
    'Architectures front-end et back-end robustes et evolutives',
    'Développement full-stack de produits web sur mesure',
    'Applications maintenables et faciles à faire évoluer',
  ]

  return (
    <section id="home" className="section-shell">
      <div className="min-h-[calc(100vh-2rem)] px-2 pb-10 pt-4 sm:px-4 lg:px-8">
        <div className="grid gap-10 border-b border-[color:var(--color-border-default)] pb-12 lg:grid-cols-[1.1fr_1fr_1.2fr_0.8fr] lg:items-start">
          <div className="space-y-4">
            <p className="font-mono text-xl font-bold uppercase leading-none tracking-[0.18em] text-[color:var(--color-text-primary)]">
              RAOELINIRINA
              <br />
              Safidy
            </p>
            <div className="space-y-2 text-sm leading-6 text-[color:var(--color-text-tertiary)]">
              <p>Ingenieur de developpement logiciel</p>
              <p>Basé à Madagascar, disponible à distance.</p>
            </div>
          </div>

          <div>
            <p className="font-mono text-xl font-bold uppercase leading-none tracking-[0.18em] text-[color:var(--color-text-primary)]">
              Design &
              <br />
              Ingenierie
            </p>
          </div>

          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[color:var(--color-text-tertiary)]">
              Services // 2026
            </p>
            <ul className="space-y-2 text-sm font-medium leading-6 text-[color:var(--color-text-secondary)]">
              {services.map(service => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <div className="flex gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--color-text-secondary)]">
              <Link to="portfolio" smooth={true} offset={-32} className="cursor-pointer">
                Projets
              </Link>
              <Link to="about" smooth={true} offset={-32} className="cursor-pointer">
                Infos
              </Link>
            </div>
            <Link
              to="contact"
              smooth={true}
              offset={-32}
              className="inline-flex cursor-pointer items-center justify-center rounded-sm bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-black"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="flex min-h-[56vh] flex-col justify-end py-12 sm:py-16">
          <div className="mb-8 inline-flex w-fit items-center gap-3 border border-[color:var(--color-border-default)] bg-[rgb(18_16_32_/_0.72)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--color-text-primary)] shadow-[0_0_0_1px_rgb(94_76_170_/_0.12)]">
            <span className="status-dot" aria-hidden="true" />
            Disponible pour missions
          </div>

          <div className="max-w-6xl">
            <h1 className="text-[clamp(3.7rem,9vw,8.4rem)] font-semibold uppercase leading-[0.9] tracking-[-0.06em] text-[color:var(--color-text-primary)]">
              Je concois
              <br />
              des experiences
              <br />
              <span className="hero-accent-word normal-case">inattendues</span>
              {' '}
              mais
              <br />
              utiles & digitales.
            </h1>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-[color:var(--color-text-tertiary)] sm:text-base">
              J&apos;apporte une execution claire aux produits web : UX solide, architecture front propre,
              interfaces nettes et livraison rapide sans sacrifier la precision.
            </p>
            <Link
              to="about"
              smooth={true}
              offset={-32}
              className="inline-flex cursor-pointer items-center gap-2 text-sm uppercase tracking-[0.18em] text-[color:var(--color-text-tertiary)]"
            >
              Defiler
              <Down className="scroll-arrow h-4 w-4 text-[#22c55e]" color="#22c55e" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
