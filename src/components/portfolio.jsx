import { useQuery } from "convex/react";
import { Github, Link } from "grommet-icons";
import { api } from "../../convex/_generated/api.js";
import { fallbackProjects, normalizeConvexProject } from "../data/projects.js";

function ProjectGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <article
          key={project.id}
          className="group overflow-hidden rounded-[26px] border border-[color:var(--color-border-default)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]"
        >
          <div className="overflow-hidden border-b border-[color:var(--color-border-default)] bg-white/5">
            {project.image ? (
              <img
                src={project.image}
                alt={project.imageAlt || project.title}
                className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-56 items-end bg-[linear-gradient(135deg,#202020,#080808)] p-6 text-sm text-white/40">
                Aucun visuel
              </div>
            )}
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
              {project.technologies.map((technology) => (
                <span key={technology} className="pill text-xs">
                  {technology}
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
                  <Github className="h-4 w-4" /> Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel-link"
                >
                  <Link className="h-4 w-4" /> Aperçu
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ConvexProjectGrid() {
  const projects = useQuery(api.portfolio.listPublished);

  if (projects === undefined) {
    return (
      <div className="portfolio-loading" aria-label="Chargement des projets" />
    );
  }

  const visibleProjects =
    projects.length > 0
      ? projects.map(normalizeConvexProject)
      : fallbackProjects;

  return <ProjectGrid projects={visibleProjects} />;
}

const Portfolio = ({ convexConfigured = false }) => {
  return (
    <section id="portfolio" className="section-shell">
      <div className="section-frame">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="section-kicker">Projets sélectionnés</p>
            <h2 className="section-title">
              Des projets construits autour d&apos;une UI claire, d&apos;une
              architecture pragmatique et de vraies contraintes de livraison.
            </h2>
          </div>
          <p className="section-copy">
            Ces projets couvrent portfolio personnel, plateformes clients, sites
            d&apos;entreprise et tests techniques. Leur point commun : des
            interfaces lisibles, une implémentation fiable et un rendu soigné.
          </p>
        </div>

        {convexConfigured ? (
          <ConvexProjectGrid />
        ) : (
          <ProjectGrid projects={fallbackProjects} />
        )}
      </div>
    </section>
  );
};

export default Portfolio;
