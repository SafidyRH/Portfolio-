import { Link } from 'react-scroll'
import { FormNextLink, Linkedin } from 'grommet-icons'
import profileImage from '../assets/profil.png'

const ConnectBanner = () => {
  return (
    <section className="section-shell">
      <div className="relative overflow-hidden border-b border-[color:var(--color-border-default)] px-2 pb-6 pt-10 sm:px-4 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[7.5rem] z-0 w-[120vw] -translate-x-1/2 text-center font-mono text-[clamp(4.4rem,30vw,8.2rem)] font-black uppercase leading-none tracking-[0.1em] text-[#12341d] sm:hidden"
        >
          HELLO
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <span className="absolute -left-5 top-5 inline-flex h-10 w-10 items-center justify-center bg-[#22c55e] text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_10px_30px_rgb(34_197_94_/_0.3)]">
              FR
            </span>
            <div className="h-[300px] w-[240px] overflow-hidden border border-white/5 bg-transparent sm:h-[420px] sm:w-[320px]">
              <img
                src={profileImage}
                alt="Portrait de Raoelinirina Safidy"
                className="h-full w-full object-cover object-top grayscale"
              />
            </div>
          </div>

          <div className="mt-14 flex w-full max-w-[560px] flex-col gap-4 sm:flex-row">
            <a
              href="https://www.linkedin.com/in/raoelinirina-safidy-775902243"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-4 border border-white/12 bg-transparent px-6 py-6 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-white"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
            <Link
              to="contact"
              smooth={true}
              offset={-32}
              className="inline-flex flex-1 cursor-pointer items-center justify-center gap-4 bg-[#22c55e] px-6 py-6 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-black shadow-[0_18px_40px_rgb(34_197_94_/_0.24)]"
            >
              Demarrer un projet
              <FormNextLink className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[-2.2rem] hidden text-center font-mono text-[clamp(6rem,26vw,19rem)] font-black uppercase leading-none tracking-[0.22em] text-[#12341d] sm:block"
        >
          HELLO
        </div>
      </div>
    </section>
  )
}

export default ConnectBanner
