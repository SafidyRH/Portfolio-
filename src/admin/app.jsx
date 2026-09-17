import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'
import Dashboard from './dashboard.jsx'
import Login from './login.jsx'
import './admin.css'

function SetupRequired() {
  return (
    <main className="admin-login-shell">
      <a href="/" className="admin-back-link">← Retour au portfolio</a>
      <section className="admin-login-card admin-setup-card">
        <div className="admin-brand-mark">SR</div>
        <p className="admin-eyebrow">Configuration requise</p>
        <h1>Connectez Convex.</h1>
        <p className="admin-login-copy">Le back-office est installé. Il reste à relier votre déploiement Convex à cette application.</p>
        <ol>
          <li><span>1</span><div><code>npx convex dev</code><small>Crée le projet et génère VITE_CONVEX_URL.</small></div></li>
          <li><span>2</span><div><code>npx @convex-dev/auth</code><small>Configure les clés sécurisées de Convex Auth.</small></div></li>
          <li><span>3</span><div><code>npx convex env set ADMIN_EMAIL vous@exemple.com</code><small>Autorise votre adresse administrateur.</small></div></li>
        </ol>
        <p className="admin-secure-note">Relancez ensuite le serveur de développement.</p>
      </section>
    </main>
  )
}

function AdminApp({ convexConfigured }) {
  if (!convexConfigured) return <SetupRequired />

  return (
    <div className="admin-root">
      <AuthLoading><div className="admin-screen-loading">Ouverture de l’espace privé…</div></AuthLoading>
      <Unauthenticated><Login /></Unauthenticated>
      <Authenticated><Dashboard /></Authenticated>
    </div>
  )
}

export default AdminApp
