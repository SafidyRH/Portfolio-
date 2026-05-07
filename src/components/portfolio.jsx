import { Github, Link } from 'grommet-icons'
import portfolioImg from '../assets/portfolio12.png'
import madagemBoImg from '../assets/boMadagems.0c300561.png'
import pdbImg from '../assets/etang.8915b60d.png'
import argumentsImg from '../assets/ARGS.4951ed63.png'
import jlrImg from '../assets/jlr.2b9c01ea.png'
import simoImg from '../assets/SIMO.png'
import partoImg from '../assets/parto.png'
import dataMaurice from '../assets/data-maurice.png'
import nextaCrowdfunding from '../assets/screencapture-nexta-crowdfunding-vercel-app-2025-11-03-07_07_07.png'

const projects = [
  {
    id: 1,
    title: 'Ce portfolio',
    type: 'Projet personnel',
    description: 'Un portfolio personnel reconstruit comme une vitrine guidee par un systeme de design, au service de la vision produit et de l execution front-end.',
    image: portfolioImg,
    technologies: ['React', 'JavaScript', 'Tailwind'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 3,
    title: 'Madagem Bo',
    type: 'Plateforme client',
    description: 'Un produit back-office concu pour aider un client a gerer ses produits et services avec un parcours administratif plus clair.',
    image: madagemBoImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Jotai'],
    githubUrl: '',
    liveUrl: 'https://bo.madagems.bdnhub.com/',
  },
  {
    id: 4,
    title: 'Etang de Puy de Bost',
    type: 'Site vitrine',
    description: 'Un site marketing concu pour presenter des services avec plus de credibilite, de portee et de clarte visuelle.',
    image: pdbImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Styled Components', 'Jotai'],
    githubUrl: '',
    liveUrl: 'https://pdb.bdnhub.com/',
  },
  {
    id: 5,
    title: 'Args',
    type: 'Site d entreprise',
    description: 'Un site vitrine pour une entreprise IT, qui equilibre positionnement technique et confiance visuelle.',
    image: argumentsImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Jotai', 'Three.js'],
    githubUrl: '',
    liveUrl: 'https://args.bdnhub.com/',
  },
  {
    id: 6,
    title: 'Jean Le Rasta',
    type: 'Site client',
    description: 'Une plateforme promotionnelle de marque concue pour un client base a Madagascar souhaitant gagner en visibilite et en audience.',
    image: jlrImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Styled Components', 'Jotai'],
    githubUrl: '',
    liveUrl: 'https://jlr.bdnhub.com/',
  },
  {
    id: 7,
    title: 'SIMO',
    type: 'Plateforme e-commerce',
    description: 'Une experience de vitrine et de commerce en ligne qui combine decouverte produit, narration de marque et parcours transactionnels.',
    image: simoImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Styled Components', 'Jotai', 'Supabase', 'PostgreSQL', 'Node.js'],
    githubUrl: '',
    liveUrl: 'https://simo.bdnhub.com/',
  },
  {
    id: 8,
    title: 'Parto',
    type: 'Site tourisme',
    description: 'Un site vitrine oriente tourisme cree pour un guide a Majunga afin de mieux presenter ses services et convertir les visiteurs en contacts.',
    image: partoImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Styled Components', 'Jotai'],
    githubUrl: '',
    liveUrl: 'https://parto.bdnhub.com/',
  },
  {
    id: 9,
    title: 'Plateforme de fidelite voyage',
    type: 'Integration UI',
    description: 'Un projet d integration front-end pour une experience de reservation de voyages dediee aux employes d entreprise.',
    image: dataMaurice,
    technologies: ['Next.js App Router', 'React', 'TypeScript', 'Material UI', 'Styled Components', 'Tailwind CSS'],
    githubUrl: '',
    liveUrl: 'https://data-maurice-srqw.vercel.app/dashboard',
  },
  {
    id: 10,
    title: 'NextA Crowdfunding',
    type: 'Test technique',
    description: 'Un test technique pour une plateforme de financement participatif orientee vers les petites entreprises malgaches et les initiatives entrepreneuriales locales.',
    image: nextaCrowdfunding,
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    githubUrl: 'https://github.com/SafidyRH/test-technique-nexta',
    liveUrl: 'https://nexta-crowdfunding.vercel.app/',
  },
]

const Portfolio = () => {
  return (
    <section id="portfolio" className="section-shell">
      <div className="section-frame">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="section-kicker">Projets selectionnes</p>
            <h2 className="section-title">Des projets construits autour d&apos;une UI claire, d&apos;une architecture pragmatique et de vraies contraintes de livraison.</h2>
          </div>
          <p className="section-copy">
            Ces projets couvrent portfolio personnel, plateformes clients, sites d&apos;entreprise et tests techniques.
            Leur point commun : des interfaces lisibles, une implementation fiable et un rendu soigné.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map(project => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-[26px] border border-[color:var(--color-border-default)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]"
            >
              <div className="overflow-hidden border-b border-[color:var(--color-border-default)]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="space-y-5 p-6">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[color:var(--color-text-tertiary)]">
                    {project.type}
                  </p>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                </div>

                <p className="min-h-[96px] text-sm leading-6 text-[color:var(--color-text-tertiary)]">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="pill text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="panel-link"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="panel-link"
                    >
                      <Link className="h-4 w-4" />
                      Aperçu
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
