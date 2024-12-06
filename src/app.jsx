import Navbar from './components/navbar.jsx'
import Hero from './components/hero.jsx'
import About from './components/about.jsx'
import Portfolio from './components/portfolio.jsx'
import Contact from './components/contact.jsx'
import FooterApp from './components/footer-app.jsx'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Get In Touch</h2>
          <Contact />
        </div>
      </section>
      <FooterApp />
    </div>
  )
}

export default App
