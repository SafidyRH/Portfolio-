import { useMemo, useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api.js'
import { fallbackProjects } from '../data/projects.js'
import ProjectForm from './project-form.jsx'
import TechnologyForm from './technology-form.jsx'

const STATUS_LABELS = {
  published: 'Publié',
  draft: 'Brouillon',
  archived: 'Archivé',
}

function EmptyState({ type, onCreate, onImport, importing }) {
  return (
    <div className="admin-empty-state">
      <span className="admin-empty-symbol" aria-hidden="true">◇</span>
      <h3>Aucun {type === 'projects' ? 'projet' : 'technologie'} pour le moment</h3>
      <p>{type === 'projects' ? 'Créez votre premier projet et publiez-le sur le portfolio.' : 'Ajoutez les outils et technologies qui composent votre stack.'}</p>
      <button className="admin-primary-button" type="button" onClick={onCreate}>+ Ajouter</button>
      {type === 'projects' && (
        <button className="admin-import-button" type="button" onClick={onImport} disabled={importing}>
          {importing ? 'Import en cours…' : 'Importer les projets actuels'}
        </button>
      )}
    </div>
  )
}

function ProjectCard({ project, onEdit, onStatusChange, onDelete }) {
  return (
    <article className="admin-project-card">
      <div className="admin-project-visual">
        {project.resolvedImageUrl
          ? <img src={project.resolvedImageUrl} alt={project.imageAlt || project.title} />
          : <div className="admin-project-placeholder">{project.title.slice(0, 2).toUpperCase()}</div>}
        <span className={`admin-status ${project.status}`}>{STATUS_LABELS[project.status]}</span>
      </div>
      <div className="admin-project-body">
        <div className="admin-project-heading">
          <div>
            <p>{project.type}</p>
            <h3>{project.title}</h3>
          </div>
          <span className="admin-order">#{project.order}</span>
        </div>
        <p className="admin-project-description">{project.description}</p>
        <div className="admin-mini-tech-list">
          {project.technologies.slice(0, 4).map(technology => (
            <span key={technology._id}><i style={{ background: technology.color }} />{technology.name}</span>
          ))}
          {project.technologies.length > 4 && <span>+{project.technologies.length - 4}</span>}
        </div>
        <footer className="admin-project-actions">
          <button type="button" onClick={() => onEdit(project)}>Modifier</button>
          {project.status === 'archived' ? (
            <button type="button" onClick={() => onStatusChange(project._id, 'draft')}>Restaurer</button>
          ) : (
            <button type="button" onClick={() => onStatusChange(project._id, 'archived')}>Archiver</button>
          )}
          <button className="danger" type="button" onClick={() => onDelete(project)}>Supprimer</button>
        </footer>
      </div>
    </article>
  )
}

function Dashboard() {
  const { signOut } = useAuthActions()
  const projects = useQuery(api.portfolio.listAdmin)
  const technologies = useQuery(api.portfolio.listTechnologies, { adminOnly: true })
  const setProjectStatus = useMutation(api.portfolio.setProjectStatus)
  const removeProject = useMutation(api.portfolio.removeProject)
  const removeTechnology = useMutation(api.portfolio.removeTechnology)
  const createTechnology = useMutation(api.portfolio.createTechnology)
  const createProject = useMutation(api.portfolio.createProject)
  const generateUploadUrl = useMutation(api.portfolio.generateUploadUrl)
  const [section, setSection] = useState('projects')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [projectEditor, setProjectEditor] = useState(null)
  const [technologyEditor, setTechnologyEditor] = useState(null)
  const [notice, setNotice] = useState('')
  const [importing, setImporting] = useState(false)

  const filteredProjects = useMemo(() => {
    const term = search.trim().toLowerCase()
    return (projects || []).filter(project => {
      const matchesStatus = filter === 'all' || project.status === filter
      const matchesSearch = !term || `${project.title} ${project.type}`.toLowerCase().includes(term)
      return matchesStatus && matchesSearch
    })
  }, [projects, search, filter])

  const filteredTechnologies = useMemo(() => {
    const term = search.trim().toLowerCase()
    return (technologies || []).filter(technology => `${technology.name} ${technology.category}`.toLowerCase().includes(term))
  }, [technologies, search])

  async function handleDeleteProject(project) {
    if (!window.confirm(`Supprimer définitivement « ${project.title} » ?`)) return
    await removeProject({ id: project._id })
    setNotice('Projet supprimé.')
  }

  async function handleDeleteTechnology(technology) {
    if (!window.confirm(`Supprimer la technologie « ${technology.name} » ?`)) return
    try {
      await removeTechnology({ id: technology._id })
      setNotice('Technologie supprimée.')
    } catch {
      setNotice('Cette technologie est encore utilisée par un projet.')
    }
  }

  async function importCurrentPortfolio() {
    setImporting(true)
    setNotice('Préparation de l’import…')

    try {
      const technologyNames = [...new Set(fallbackProjects.flatMap(project => project.technologies))]
      const technologyIds = new Map()

      for (const name of technologyNames) {
        const id = await createTechnology({
          name,
          category: ['PostgreSQL', 'MongoDB', 'Supabase'].includes(name) ? 'Base de données' : 'Front-end',
          color: '#7f9f42',
          description: 'Importé depuis le portfolio existant.',
        })
        technologyIds.set(name, id)
      }

      for (const [index, project] of fallbackProjects.entries()) {
        setNotice(`Import du projet ${index + 1}/${fallbackProjects.length}…`)
        let imageId
        try {
          const imageResponse = await fetch(project.image)
          const imageBlob = await imageResponse.blob()
          const uploadUrl = await generateUploadUrl()
          const uploadResponse = await fetch(uploadUrl, {
            method: 'POST',
            headers: { 'Content-Type': imageBlob.type || 'image/png' },
            body: imageBlob,
          })
          const uploadResult = await uploadResponse.json()
          imageId = uploadResult.storageId
        } catch {
          imageId = undefined
        }

        await createProject({
          title: project.title,
          type: project.type,
          description: project.description,
          status: 'published',
          featured: index < 3,
          order: index + 1,
          technologyIds: project.technologies.map(name => technologyIds.get(name)),
          imageId,
          imageAlt: `Aperçu du projet ${project.title}`,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
        })
      }
      setNotice('Portfolio importé avec succès.')
    } catch {
      setNotice('Import interrompu. Les éléments déjà créés sont conservés.')
    } finally {
      setImporting(false)
    }
  }

  const loading = projects === undefined || technologies === undefined
  const counts = {
    published: (projects || []).filter(project => project.status === 'published').length,
    draft: (projects || []).filter(project => project.status === 'draft').length,
    archived: (projects || []).filter(project => project.status === 'archived').length,
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <span className="admin-brand-mark small">SR</span>
          <div><strong>Portfolio</strong><small>Back-office</small></div>
        </div>
        <nav aria-label="Navigation du back-office">
          <button className={section === 'projects' ? 'active' : ''} onClick={() => { setSection('projects'); setSearch('') }}>
            <span aria-hidden="true">▦</span> Projets <i>{projects?.length || 0}</i>
          </button>
          <button className={section === 'technologies' ? 'active' : ''} onClick={() => { setSection('technologies'); setSearch('') }}>
            <span aria-hidden="true">◇</span> Technologies <i>{technologies?.length || 0}</i>
          </button>
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer">↗ Voir le portfolio</a>
          <button type="button" onClick={() => void signOut()}>↪ Se déconnecter</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-eyebrow">Espace de gestion</p>
            <h1>{section === 'projects' ? 'Vos projets' : 'Vos technologies'}</h1>
          </div>
          <div className="admin-user-badge"><span>SR</span><div><strong>Administrateur</strong><small>Portfolio</small></div></div>
        </header>

        {section === 'projects' && (
          <>
            <section className="admin-stats" aria-label="Résumé des projets">
              <div><span>Total</span><strong>{projects?.length || 0}</strong><i>tous les projets</i></div>
              <div><span>En ligne</span><strong>{counts.published}</strong><i className="positive">● publiés</i></div>
              <div><span>À finaliser</span><strong>{counts.draft}</strong><i>● brouillons</i></div>
              <div><span>Rangés</span><strong>{counts.archived}</strong><i>● archivés</i></div>
            </section>

            <section className="admin-content-panel">
              <div className="admin-toolbar">
                <div className="admin-search"><span aria-hidden="true">⌕</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Rechercher un projet…" aria-label="Rechercher un projet" /></div>
                <select value={filter} onChange={event => setFilter(event.target.value)} aria-label="Filtrer par statut">
                  <option value="all">Tous les statuts</option>
                  <option value="published">Publiés</option>
                  <option value="draft">Brouillons</option>
                  <option value="archived">Archivés</option>
                </select>
                <button className="admin-primary-button" type="button" onClick={() => setProjectEditor('new')}>+ Nouveau projet</button>
              </div>

              {loading ? <div className="admin-loading">Chargement de votre contenu…</div> : filteredProjects.length > 0 ? (
                <div className="admin-project-grid">
                  {filteredProjects.map(project => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      onEdit={setProjectEditor}
                      onStatusChange={(id, status) => setProjectStatus({ id, status })}
                      onDelete={handleDeleteProject}
                    />
                  ))}
                </div>
              ) : search || filter !== 'all' ? (
                <div className="admin-no-result">Aucun projet ne correspond à ces critères.</div>
              ) : (
                <EmptyState
                  type="projects"
                  onCreate={() => setProjectEditor('new')}
                  onImport={importCurrentPortfolio}
                  importing={importing}
                />
              )}
            </section>
          </>
        )}

        {section === 'technologies' && (
          <section className="admin-content-panel">
            <div className="admin-toolbar">
              <div className="admin-search"><span aria-hidden="true">⌕</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Rechercher une technologie…" aria-label="Rechercher une technologie" /></div>
              <button className="admin-primary-button" type="button" onClick={() => setTechnologyEditor('new')}>+ Ajouter une technologie</button>
            </div>
            {loading ? <div className="admin-loading">Chargement de votre stack…</div> : filteredTechnologies.length > 0 ? (
              <div className="admin-technology-grid">
                {filteredTechnologies.map(technology => {
                  const usage = (projects || []).filter(project => project.technologyIds.includes(technology._id)).length
                  return (
                    <article className="admin-technology-card" key={technology._id}>
                      <div className="admin-tech-icon" style={{ '--tech-color': technology.color }}>
                        {technology.resolvedLogoUrl
                          ? <img src={technology.resolvedLogoUrl} alt="" aria-hidden="true" />
                          : technology.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="admin-tech-card-copy">
                        <p>{technology.category}</p>
                        <h3>{technology.name}</h3>
                        <span>{usage} projet{usage > 1 ? 's' : ''}</span>
                      </div>
                      <div className="admin-tech-actions">
                        <button type="button" onClick={() => setTechnologyEditor(technology)} aria-label={`Modifier ${technology.name}`}>✎</button>
                        <button type="button" onClick={() => handleDeleteTechnology(technology)} aria-label={`Supprimer ${technology.name}`}>×</button>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : search ? <div className="admin-no-result">Aucune technologie ne correspond à cette recherche.</div> : <EmptyState type="technologies" onCreate={() => setTechnologyEditor('new')} />}
          </section>
        )}
      </main>

      {projectEditor && (
        <ProjectForm
          project={projectEditor === 'new' ? null : projectEditor}
          technologies={technologies || []}
          onClose={() => setProjectEditor(null)}
        />
      )}
      {technologyEditor && (
        <TechnologyForm technology={technologyEditor === 'new' ? null : technologyEditor} onClose={() => setTechnologyEditor(null)} />
      )}
      {notice && <button className="admin-toast" type="button" onClick={() => setNotice('')}>{notice}<span>×</span></button>}
    </div>
  )
}

export default Dashboard
