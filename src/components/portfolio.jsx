import { Github, Link } from 'grommet-icons'
import portfolioImg from '../assets/portfolio12.png'
import madagemBoImg from '../assets/boMadagems.0c300561.png'
import pdbImg from '../assets/etang.8915b60d.png'
import argumentsImg from '../assets/ARGS.4951ed63.png'
import jlrImg from '../assets/jlr.2b9c01ea.png'
import simoImg from '../assets/SIMO.png'
import partoImg from '../assets/parto.png'

const projects = [
  {
    id: 1,
    title: 'This Portfolio',
    description: 'As an inaugural project, this achievement represents my first successful development hosted online, marking a significant milestone in my professional development journey.',
    image: portfolioImg,
    technologies: ['React', 'JavaScript', 'Tailwind'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 3,
    title: 'Madagem Bo',
    description: 'This project was developed for a client who wanted an online platform to manage their products and services',
    image: madagemBoImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Jotai'],
    githubUrl: '',
    liveUrl: 'https://bo.madagems.bdnhub.com/',
  },
  {
    id: 4,
    title: 'Etang de Puy de Bost',
    description: 'This project was developed for a client who wanted an online platform to showcase their products and services to a wider audience, allowing them to increase their customer base.',
    image: pdbImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Styled Component', 'Jotai'],
    githubUrl: '',
    liveUrl: 'https://pdb.bdnhub.com/',
  },
  {
    id: 5,
    title: 'Args',
    description: 'This project was developed to Showcase a web site for an IT development company',
    image: argumentsImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Grommet UI', 'Jotai', 'ThreeJS'],
    githubUrl: '',
    liveUrl: 'https://args.bdnhub.com/',
  },
  {
    id: 6,
    title: 'Jean Le Rasta',
    description: 'This project was developed for a client, Jean le Rasta in Morondava Madagascar, who wanted an online platform to showcase their products and services to a wider audience, allowing them to increase their customer base.',
    image: jlrImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Styled Component', 'Jotai'],
    githubUrl: '',
    liveUrl: 'https://jlr.bdnhub.com/',
  },
  {
    id: 7,
    title: 'SIMO',
    description: 'This project was developed for a client who wanted an online platform to showcase their products and services to a wider audience, allowing them to increase their customer base. and also to sell their products online',
    image: simoImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Styled Component', 'Jotai', 'Supabase', 'PostgreSQL', 'NodeJS'],
    githubUrl: '',
    liveUrl: 'https://simo.bdnhub.com/',
  },
  {
    id: 8,
    title: 'Parto',
    description: 'This project was developed for a client who wanted an online platform to showcase their products and services to a wider audience, allowing them to increase their customer base. This client is a tour guide in region of Majunga in Madagascar',
    image: partoImg,
    technologies: ['React', 'TypeScript', 'Grommet UI', 'Styled Component', 'Jotai'],
    githubUrl: '',
    liveUrl: 'https://parto.bdnhub.com/',
  },
]

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">My Work</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div
              key={project.id}
              className="bg-white/5 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-white/60 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors"
                    >
                      <Link className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
