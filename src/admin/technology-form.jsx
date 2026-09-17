import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api.js'

function TechnologyForm({ technology, onClose }) {
  const createTechnology = useMutation(api.portfolio.createTechnology)
  const updateTechnology = useMutation(api.portfolio.updateTechnology)
  const generateUploadUrl = useMutation(api.portfolio.generateUploadUrl)
  const [form, setForm] = useState({
    name: technology?.name || '',
    category: technology?.category || 'Front-end',
    color: technology?.color || '#22c55e',
    description: technology?.description || '',
  })
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(technology?.resolvedLogoUrl || '')
  const [removeLogo, setRemoveLogo] = useState(false)
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  function updateField(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  }

  function selectLogo(event) {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setError('Le logo doit peser moins de 2 Mo.')
      event.target.value = ''
      return
    }

    setError('')
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
    setRemoveLogo(false)
  }

  async function uploadLogo() {
    if (!logoFile) return removeLogo ? undefined : technology?.logoId

    const uploadUrl = await generateUploadUrl()
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: { 'Content-Type': logoFile.type },
      body: logoFile,
    })

    if (!response.ok) throw new Error('Logo upload failed')
    const result = await response.json()
    return result.storageId
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSaving(true)

    try {
      const logoId = await uploadLogo()
      const values = { ...form, logoId }

      if (technology) await updateTechnology({ id: technology._id, ...values })
      else await createTechnology(values)

      onClose()
    } catch {
      setError('Impossible d’enregistrer cette technologie. Vérifiez le logo et le nom utilisé.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className="admin-modal admin-tech-modal" role="dialog" aria-modal="true" aria-labelledby="technology-form-title">
        <header className="admin-modal-header">
          <div>
            <p className="admin-eyebrow">Stack technique</p>
            <h2 id="technology-form-title">{technology ? 'Modifier la technologie' : 'Ajouter une technologie'}</h2>
          </div>
          <button className="admin-icon-button" type="button" onClick={onClose} aria-label="Fermer">×</button>
        </header>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-technology-logo-field">
            <div className="admin-technology-logo-preview" style={{ '--preview-color': form.color }}>
              {logoPreview && !removeLogo
                ? <img src={logoPreview} alt="Aperçu du logo" />
                : <span>{form.name.slice(0, 2).toUpperCase() || 'LOGO'}</span>}
            </div>
            <div>
              <p className="admin-input-label">Logo de la technologie</p>
              <label className="admin-secondary-button admin-file-button">
                {logoPreview && !removeLogo ? 'Remplacer le logo' : 'Importer un logo'}
                <input type="file" accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml" onChange={selectLogo} />
              </label>
              <p className="admin-field-hint">SVG, PNG, JPG, WebP ou AVIF · 2 Mo max.</p>
              {logoPreview && !removeLogo && (
                <button
                  className="admin-text-button danger"
                  type="button"
                  onClick={() => {
                    setRemoveLogo(true)
                    setLogoFile(null)
                  }}
                >
                  Retirer le logo
                </button>
              )}
            </div>
          </div>

          <label className="admin-field">
            <span>Nom *</span>
            <input name="name" value={form.name} onChange={updateField} placeholder="Ex. React" required autoFocus />
          </label>
          <label className="admin-field">
            <span>Catégorie *</span>
            <select name="category" value={form.category} onChange={updateField}>
              <option>Front-end</option>
              <option>Back-end</option>
              <option>Base de données</option>
              <option>Outils</option>
              <option>DevOps</option>
              <option>Design</option>
              <option>Autre</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Courte description</span>
            <textarea name="description" value={form.description} onChange={updateField} rows="3" placeholder="Usage ou expertise associée…" />
          </label>
          <label className="admin-field">
            <span>Couleur d’identification</span>
            <div className="admin-color-field">
              <input name="color" type="color" value={form.color} onChange={updateField} />
              <input name="color" value={form.color} onChange={updateField} pattern="#[0-9a-fA-F]{6}" required />
            </div>
          </label>
          {error && <p className="admin-error" role="alert">{error}</p>}
          <footer className="admin-modal-actions">
            <button className="admin-secondary-button" type="button" onClick={onClose}>Annuler</button>
            <button className="admin-primary-button" type="submit" disabled={isSaving}>
              {isSaving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
          </footer>
        </form>
      </section>
    </div>
  )
}

export default TechnologyForm
