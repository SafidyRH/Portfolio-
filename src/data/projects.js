import portfolioImg from '../assets/portfolio12.png'
import madagemBoImg from '../assets/boMadagems.0c300561.png'
import pdbImg from '../assets/etang.8915b60d.png'
import argumentsImg from '../assets/ARGS.4951ed63.png'
import jlrImg from '../assets/jlr.2b9c01ea.png'
import simoImg from '../assets/SIMO.png'
import partoImg from '../assets/parto.png'
import dataMaurice from '../assets/data-maurice.png'
import nextaCrowdfunding from '../assets/screencapture-nexta-crowdfunding-vercel-app-2025-11-03-07_07_07.png'

export const fallbackProjects = [
  {
    id: 1,
    title: 'Ce portfolio',
    type: 'Projet personnel',
    description: "Un portfolio personnel reconstruit comme une vitrine guidée par un système de design, au service de la vision produit et de l’exécution front-end.",
    image: portfolioImg,
    technologies: ['React', 'JavaScript', 'Tailwind'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 3,
    title: 'Madagem Bo',
    type: 'Plateforme client',
    description: 'Un produit back-office conçu pour aider un client à gérer ses produits et services avec un parcours administratif plus clair.',
    image: madagemBoImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Jotai'],
    liveUrl: 'https://bo.madagems.bdnhub.com/',
  },
  {
    id: 4,
    title: 'Étang de Puy de Bost',
    type: 'Site vitrine',
    description: 'Un site marketing conçu pour présenter des services avec plus de crédibilité, de portée et de clarté visuelle.',
    image: pdbImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Styled Components', 'Jotai'],
    liveUrl: 'https://pdb.bdnhub.com/',
  },
  {
    id: 5,
    title: 'Args',
    type: "Site d’entreprise",
    description: 'Un site vitrine pour une entreprise IT, qui équilibre positionnement technique et confiance visuelle.',
    image: argumentsImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Jotai', 'Three.js'],
    liveUrl: 'https://args.bdnhub.com/',
  },
  {
    id: 6,
    title: 'Jean Le Rasta',
    type: 'Site client',
    description: 'Une plateforme promotionnelle de marque conçue pour un client basé à Madagascar souhaitant gagner en visibilité et en audience.',
    image: jlrImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Styled Components', 'Jotai'],
    liveUrl: 'https://jlr.bdnhub.com/',
  },
  {
    id: 7,
    title: 'SIMO',
    type: 'Plateforme e-commerce',
    description: 'Une expérience de vitrine et de commerce en ligne qui combine découverte produit, narration de marque et parcours transactionnels.',
    image: simoImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Styled Components', 'Jotai', 'Supabase', 'PostgreSQL', 'Node.js'],
    liveUrl: 'https://simo.bdnhub.com/',
  },
  {
    id: 8,
    title: 'Parto',
    type: 'Site tourisme',
    description: 'Un site vitrine orienté tourisme créé pour un guide à Majunga afin de mieux présenter ses services et convertir les visiteurs en contacts.',
    image: partoImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Styled Components', 'Jotai'],
    liveUrl: 'https://parto.bdnhub.com/',
  },
  {
    id: 9,
    title: 'Plateforme de fidélité voyage',
    type: 'Intégration UI',
    description: 'Un projet d’intégration front-end pour une expérience de réservation de voyages dédiée aux employés d’entreprise.',
    image: dataMaurice,
    technologies: ['Next.js App Router', 'React', 'TypeScript', 'Material UI', 'Styled Components', 'Tailwind CSS'],
    liveUrl: 'https://data-maurice-srqw.vercel.app/dashboard',
  },
  {
    id: 10,
    title: 'NextA Crowdfunding',
    type: 'Test technique',
    description: 'Un test technique pour une plateforme de financement participatif orientée vers les petites entreprises malgaches et les initiatives entrepreneuriales locales.',
    image: nextaCrowdfunding,
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    githubUrl: 'https://github.com/SafidyRH/test-technique-nexta',
    liveUrl: 'https://nexta-crowdfunding.vercel.app/',
  },
]

export function normalizeConvexProject(project) {
  return {
    ...project,
    id: project._id,
    image: project.resolvedImageUrl,
    technologies: project.technologies.map(technology => technology.name),
  }
}
