import { useEffect, useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api.js'

const EMPTY_FORM = {
  title: '',
  type: '',
  description: '',
  status: 'draft',
  featured: false,
  order: 0,
  technologyIds: [],
  imageAlt: '',
  githubUrl: '',
  liveUrl: '',
}

function ProjectForm({ project, technologies, onClose }) {
  const createProject = useMutation(api.portfolio.createProject)
  const updateProject = useMutation(api.portfolio.updateProject)
  const generateUploadUrl = useMutation(api.portfolio.generateUploadUrl)
  const [form, setForm] = useState(EMPTY_FORM)
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [removeImage, setRemoveImage] = useState(false)
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!project) return
    setForm({
      title: project.title,
      type: project.type,
      description: project.description,
      status: project.status,
      featured: project.featured,
      order: project.order,
      technologyIds: project.technologyIds,
      imageAlt: project.imageAlt,
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
    })
    setPreview(project.resolvedImageUrl || '')
  }, [project])

  function updateField(event) {
    const { name, value, type, checked } = event.target
    setForm(current => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function toggleTechnology(id) {
    setForm(current => ({
      ...current,
      technologyIds: current.technologyIds.includes(id)
        ? current.technologyIds.filter(item => item !== id)
        : [...current.technologyIds, id],
    }))
  }

  function selectImage(event) {
    const file = event.target.files?.[0]
    if (!file) return
    if (file.size > 8 * 1024 * 1024) {
      setError('Le visuel doit peser moins de 8 Mo.')
      return
    }
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
    setRemoveImage(false)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSaving(true)

    try {
      let imageId = removeImage ? undefined : project?.imageId
      let imageUrl = removeImage ? undefined : project?.imageUrl

      if (imageFile) {
        const uploadUrl = await generateUploadUrl()
        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers: { 'Content-Type': imageFile.type },
          body: imageFile,
        })
        if (!response.ok) throw new Error('upload')
        const result = await response.json()
        imageId = result.storageId
        imageUrl = undefined
      }

      const values = {
        ...form,
        order: Number(form.order),
        imageId,
        imageUrl,
      }

      if (project) {
        await updateProject({ id: project._id, ...values })
      } else {
        await createProject(values)
      }
      onClose()
    } catch {
      setError('La sauvegarde a échoué. Vérifiez les champs et réessayez.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className="admin-modal admin-project-modal" role="dialog" aria-modal="true" aria-labelledby="project-form-title">
        <header className="admin-modal-header">
          <div>
            <p className="admin-eyebrow">{project ? 'Modification' : 'Nouveau contenu'}</p>
            <h2 id="project-form-title">{project ? 'Modifier le projet' : 'Créer un projet'}</h2>
          </div>
          <button className="admin-icon-button" type="button" onClick={onClose} aria-label="Fermer">×</button>
        </header>

        <form className="admin-form admin-project-form" onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Nom du projet *</span>
              <input name="title" value={form.title} onChange={updateField} placeholder="Ex. Plateforme e-commerce" required />
            </label>
            <label className="admin-field">
              <span>Type *</span>
              <input name="type" value={form.type} onChange={updateField} placeholder="Projet client" required />
            </label>
          </div>

          <label className="admin-field">
            <span>Description *</span>
            <textarea name="description" value={form.description} onChange={updateField} rows="4" placeholder="Présentez le contexte, la solution et la valeur du projet…" required />
            <small>{form.description.length} caractères</small>
          </label>

          <div className="admin-image-field">
            <div className="admin-image-preview">
              {preview && !removeImage ? <img src={preview} alt="Aperçu du visuel" /> : <span>Aucun visuel</span>}
            </div>
            <div>
              <p className="admin-input-label">Visuel du projet</p>
              <label className="admin-secondary-button admin-file-button">
                Choisir une image
                <input type="file" accept="image/png,image/jpeg,image/webp,image/avif" onChange={selectImage} />
              </label>
              <p className="admin-field-hint">PNG, JPG, WebP ou AVIF · 8 Mo max.</p>
              {preview && !removeImage && (
                <button className="admin-text-button danger" type="button" onClick={() => { setRemoveImage(true); setImageFile(null) }}>
                  Retirer le visuel
                </button>
              )}
            </div>
          </div>

          <label className="admin-field">
            <span>Texte alternatif</span>
            <input name="imageAlt" value={form.imageAlt} onChange={updateField} placeholder={form.title || 'Description du visuel'} />
          </label>

          <fieldset className="admin-fieldset">
            <legend>Technologies</legend>
            {technologies.length > 0 ? (
              <div className="admin-tech-picker">
                {technologies.map(technology => {
                  const selected = form.technologyIds.includes(technology._id)
                  return (
                    <button
                      key={technology._id}
                      className={selected ? 'selected' : ''}
                      type="button"
                      onClick={() => toggleTechnology(technology._id)}
                      aria-pressed={selected}
                    >
                      <span style={{ background: technology.color }} />{technology.name}
                    </button>
                  )
                })}
              </div>
            ) : <p className="admin-field-hint">Créez d’abord une technologie depuis l’onglet Technologies.</p>}
          </fieldset>

          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Lien du projet</span>
              <input name="liveUrl" type="url" value={form.liveUrl} onChange={updateField} placeholder="https://…" />
            </label>
            <label className="admin-field">
              <span>Dépôt GitHub</span>
              <input name="githubUrl" type="url" value={form.githubUrl} onChange={updateField} placeholder="https://github.com/…" />
            </label>
          </div>

          <div className="admin-form-grid compact">
            <label className="admin-field">
              <span>Statut</span>
              <select name="status" value={form.status} onChange={updateField}>
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="archived">Archivé</option>
              </select>
            </label>
            <label className="admin-field">
              <span>Ordre d’affichage</span>
              <input name="order" type="number" min="0" value={form.order} onChange={updateField} />
            </label>
          </div>

          <label className="admin-check-field">
            <input name="featured" type="checkbox" checked={form.featured} onChange={updateField} />
            <span><strong>Mettre en avant</strong><small>Le projet pourra être utilisé dans les sélections éditoriales.</small></span>
          </label>

          {error && <p className="admin-error" role="alert">{error}</p>}

          <footer className="admin-modal-actions">
            <button className="admin-secondary-button" type="button" onClick={onClose}>Annuler</button>
            <button className="admin-primary-button" type="submit" disabled={isSaving}>
              {isSaving ? 'Enregistrement…' : project ? 'Enregistrer' : 'Créer le projet'}
            </button>
          </footer>
        </form>
      </section>
    </div>
  )
}

export default ProjectForm
