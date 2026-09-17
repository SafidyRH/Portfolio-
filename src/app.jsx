import Navbar from './components/navbar.jsx'
import Hero from './components/hero.jsx'
import About from './components/about.jsx'
import Portfolio from './components/portfolio.jsx'
import ConnectBanner from './components/connect-banner.jsx'
import Contact from './components/contact.jsx'
import FooterApp from './components/footer-app.jsx'
import AdminApp from './admin/app.jsx'

function App({ convexConfigured = false }) {
  if (window.location.pathname.startsWith('/admin')) {
    return <AdminApp convexConfigured={convexConfigured} />
  }

  return (
    <div className="page-shell min-h-screen text-white">
      <Navbar />
      <main className="space-y-6 sm:space-y-8">
        <Hero />
        <About convexConfigured={convexConfigured} />
        <Portfolio convexConfigured={convexConfigured} />
        <ConnectBanner />
        <section id="contact" className="section-shell">
          <Contact />
        </section>
      </main>
      <FooterApp />
    </div>
  )
}

export default App
