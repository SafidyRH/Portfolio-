import reactLogo from '../assets/logo/react-1-logo-svgrepo-com.svg'
import nextLogo from '../assets/logo/logo-next.png'
import typescriptLogo from '../assets/logo/typescript-logo-svgrepo-com.svg'
import tailwindLogo from '../assets/logo/tailwind-svgrepo-com.svg'
import grommetLogo from '../assets/logo/grommet-svgrepo-com.svg'
import jotaiLogo from '../assets/logo/jotai-mascot.png'
import axiosLogo from '../assets/logo/logo-axios.svg'
import nodeLogo from '../assets/logo/node-svgrepo-com.svg'
import expressLogo from '../assets/logo/express-svgrepo-com.svg'
import supabaseLogo from '../assets/logo/supabase-logo-icon.svg'
import postgresLogo from '../assets/logo/postgresql-logo-svgrepo-com.svg'
import mongoLogo from '../assets/logo/mongo-svgrepo-com.svg'
import gitLogo from '../assets/logo/git-svgrepo-com.svg'
import gitlabLogo from '../assets/logo/gitlab-svgrepo-com.svg'
import githubLogo from '../assets/logo/github-svgrepo-com.svg'
import dockerLogo from '../assets/logo/docker-svgrepo-com.svg'
import vscodeLogo from '../assets/logo/vscode-svgrepo-com.svg'
import bearLogo from '../assets/logo/bear.jpg'
import neutralLogo from '../assets/logo/logo-color-100.png'
import nestLogo from '../assets/logo/logo-nest.svg'
import shadcnuiLogo from '../assets/logo/shadcnui-logo.jpg'

const logoMap = {
  'React': reactLogo,
  'Next.js': nextLogo,
  'TypeScript': typescriptLogo,
  'Tailwind CSS': tailwindLogo,
  'shadcn/ui': shadcnuiLogo,
  'Grommet': grommetLogo,
  'Jotai': jotaiLogo,
  'Zustand': bearLogo,
  'TanStack': neutralLogo,
  'Axios': axiosLogo,
  'Node.js': nodeLogo,
  'Express': expressLogo,
  'Supabase': supabaseLogo,
  'PostgreSQL': postgresLogo,
  'MongoDB': mongoLogo,
  'Git': gitLogo,
  'GitLab': gitlabLogo,
  'GitHub': githubLogo,
  'Docker': dockerLogo,
  'VS Code': vscodeLogo,
  'Nest.js': nestLogo,
}

const SkillLogo = ({ skill }) => {
  const logo = logoMap[skill]

  if (logo) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center overflow-hidden bg-white/8 p-1">
        <img src={logo} alt="" aria-hidden="true" className="h-full w-full object-contain" />
      </span>
    )
  }

  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/10 text-[10px] font-semibold text-white">
      {skill.slice(0, 2).toUpperCase()}
    </span>
  )
}

const About = () => {
  const skills = [
    {
      id: 1,
      category: 'Front-end',
      speed: 'slow',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Grommet', 'Jotai', 'Zustand', 'TanStack', 'Axios'],
    },
    {
      id: 2,
      category: 'Back-end',
      speed: 'normal',
      items: ['Node.js', 'Express', 'Next.js', 'Supabase', 'PostgreSQL', 'MongoDB', 'Nest.js'],
    },
    {
      id: 3,
      category: 'Outils',
      speed: 'reverse',
      items: ['Git', 'GitLab', 'GitHub', 'Docker', 'VS Code'],
    },
  ]

  return (
    <section id="about" className="section-shell">
      <div className="section-frame">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="section-kicker">A propos</p>
            <h2 className="section-title">Un developpeur orienté produit qui aime autant les systèmes que les écrans.</h2>
          </div>
          <p className="section-copy">
            Mon approche est simple : transformer des idées en interfaces rapides a comprendre,
            fiables à utiliser et maintenables pour les équipes. J&apos;aime travailler là où la clarté de l&apos;UI,
            la structure technique et la rigueur de livraison comptent en meme temps.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="w-full rounded-[24px] border border-[color:var(--color-border-default)] bg-black/30 p-6">
            <p className="mb-6 text-sm uppercase tracking-[0.25em] text-[color:var(--color-text-tertiary)]">
              Principes de travail
            </p>
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold">La clarte avant tout</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--color-text-tertiary)]">
                  Je privilegie les interfaces avec une hierarchie forte, des actions explicites et des parcours prévisibles.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Conçu pour la livraison</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--color-text-tertiary)]">
                  Des composants propres, des patterns réutilisables et des choix d&apos;implémentation pragmatiques font partie du design.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Front-end plus back-end</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--color-text-tertiary)]">
                  Je peux prendre en charge l&apos;éxperience de bout en bout, du detail des interactions jusqu&apos;aux API et a l&apos;intégration des données.
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0 w-full grid gap-4">
            {skills.map((skillGroup) => {
              const marqueeItems = [...skillGroup.items, ...skillGroup.items]

              return (
                <section
                  key={skillGroup.category}
                  className="min-w-0 w-full overflow-hidden rounded-[24px] border border-[color:var(--color-border-default)] bg-[rgb(255_255_255_/_0.03)] p-6"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold">{skillGroup.category}</h3>
                    <span className="text-sm text-[color:var(--color-text-tertiary)]">
                      {skillGroup.items.length}
                      {' '}
                      competences
                    </span>
                  </div>

                  <div className="skill-marquee-mask">
                    <div className={`skill-marquee-track ${skillGroup.speed === 'reverse' ? 'skill-marquee-reverse' : ''} ${skillGroup.speed === 'slow' ? 'skill-marquee-slow' : ''}`}>
                      {marqueeItems.map((skill, index) => (
                        <span key={`${skill}-${index}`} className="pill shrink-0 gap-2 whitespace-nowrap px-4 py-2">
                          <SkillLogo skill={skill} />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
