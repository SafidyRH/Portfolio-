import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api.js'
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
  React: reactLogo,
  'Next.js': nextLogo,
  TypeScript: typescriptLogo,
  'Tailwind CSS': tailwindLogo,
  'shadcn/ui': shadcnuiLogo,
  Grommet: grommetLogo,
  Jotai: jotaiLogo,
  Zustand: bearLogo,
  TanStack: neutralLogo,
  Axios: axiosLogo,
  'Node.js': nodeLogo,
  Express: expressLogo,
  Supabase: supabaseLogo,
  PostgreSQL: postgresLogo,
  MongoDB: mongoLogo,
  Git: gitLogo,
  GitLab: gitlabLogo,
  GitHub: githubLogo,
  Docker: dockerLogo,
  'VS Code': vscodeLogo,
  'Nest.js': nestLogo,
}

const fallbackTechnologies = [
  ...['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Grommet', 'Jotai', 'Zustand', 'TanStack', 'Axios']
    .map(name => ({ name, category: 'Front-end' })),
  ...['Node.js', 'Express', 'Next.js', 'Supabase', 'PostgreSQL', 'MongoDB', 'Nest.js']
    .map(name => ({ name, category: 'Back-end' })),
  ...['Git', 'GitLab', 'GitHub', 'Docker', 'VS Code']
    .map(name => ({ name, category: 'Outils' })),
]

const categoryOrder = ['Front-end', 'Back-end', 'Base de données', 'Outils', 'DevOps', 'Design', 'Autre']

function normalizeCategory(category) {
  if (category === 'Outil') return 'Outils'
  return category || 'Autre'
}

function mergeTechnologies(technologies) {
  if (!technologies?.length) return fallbackTechnologies

  const managedNames = new Set(technologies.map(technology => technology.name.toLowerCase()))
  const untouchedFallbacks = fallbackTechnologies.filter(technology => !managedNames.has(technology.name.toLowerCase()))
  return [...untouchedFallbacks, ...technologies]
}

function groupTechnologies(technologies) {
  const groups = new Map()

  for (const technology of technologies) {
    const category = normalizeCategory(technology.category)
    const items = groups.get(category) || []
    items.push(technology)
    groups.set(category, items)
  }

  return [...groups.entries()]
    .sort(([categoryA], [categoryB]) => {
      const indexA = categoryOrder.indexOf(categoryA)
      const indexB = categoryOrder.indexOf(categoryB)
      return (indexA === -1 ? categoryOrder.length : indexA) - (indexB === -1 ? categoryOrder.length : indexB)
    })
    .map(([category, items], index) => ({
      category,
      items: items.sort((a, b) => a.name.localeCompare(b.name)),
      speed: index % 3 === 0 ? 'slow' : index % 3 === 1 ? 'normal' : 'reverse',
    }))
}

function SkillLogo({ technology }) {
  const logo = technology.resolvedLogoUrl || logoMap[technology.name]

  if (logo) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center overflow-hidden bg-white/8 p-1">
        <img src={logo} alt="" aria-hidden="true" className="h-full w-full object-contain" />
      </span>
    )
  }

  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/10 text-[10px] font-semibold text-white"
      style={technology.color ? { borderColor: technology.color, color: technology.color } : undefined}
    >
      {technology.name.slice(0, 2).toUpperCase()}
    </span>
  )
}

function SkillGroups({ technologies }) {
  const groups = groupTechnologies(mergeTechnologies(technologies))

  return (
    <div className="min-w-0 w-full grid gap-4">
      {groups.map(skillGroup => {
        const marqueeItems = [...skillGroup.items, ...skillGroup.items]

        return (
          <section
            key={skillGroup.category}
            className="min-w-0 w-full overflow-hidden rounded-[24px] border border-[color:var(--color-border-default)] bg-[rgb(255_255_255_/_0.03)] p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold">{skillGroup.category}</h3>
              <span className="text-sm text-[color:var(--color-text-tertiary)]">
                {skillGroup.items.length} compétence{skillGroup.items.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="skill-marquee-mask">
              <div className={`skill-marquee-track ${skillGroup.speed === 'reverse' ? 'skill-marquee-reverse' : ''} ${skillGroup.speed === 'slow' ? 'skill-marquee-slow' : ''}`}>
                {marqueeItems.map((technology, index) => (
                  <span key={`${skillGroup.category}-${technology.name}-${index}`} className="pill shrink-0 gap-2 whitespace-nowrap px-4 py-2">
                    <SkillLogo technology={technology} />
                    <span>{technology.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}

function ConvexSkillGroups() {
  const technologies = useQuery(api.portfolio.listTechnologies, {})
  return <SkillGroups technologies={technologies || []} />
}

const About = ({ convexConfigured = false }) => {
  return (
    <section id="about" className="section-shell">
      <div className="section-frame">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="section-kicker">À propos</p>
            <h2 className="section-title">Un développeur orienté produit qui aime autant les systèmes que les écrans.</h2>
          </div>
          <p className="section-copy">
            Mon approche est simple : transformer des idées en interfaces rapides à comprendre,
            fiables à utiliser et maintenables pour les équipes. J&apos;aime travailler là où la clarté de l&apos;UI,
            la structure technique et la rigueur de livraison comptent en même temps.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="w-full rounded-[24px] border border-[color:var(--color-border-default)] bg-black/30 p-6">
            <p className="mb-6 text-sm uppercase tracking-[0.25em] text-[color:var(--color-text-tertiary)]">Principes de travail</p>
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold">La clarté avant tout</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--color-text-tertiary)]">
                  Je privilégie les interfaces avec une hiérarchie forte, des actions explicites et des parcours prévisibles.
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
                  Je peux prendre en charge l&apos;expérience de bout en bout, du détail des interactions jusqu&apos;aux API et à l&apos;intégration des données.
                </p>
              </div>
            </div>
          </div>

          {convexConfigured ? <ConvexSkillGroups /> : <SkillGroups technologies={[]} />}
        </div>
      </div>
    </section>
  )
}

export default About
