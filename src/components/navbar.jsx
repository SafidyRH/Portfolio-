import { Home, User, Briefcase, Mail } from 'grommet-icons'
import { Link } from 'react-scroll'

const Navbar = () => {
  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-lg rounded-full px-6 py-3 flex gap-4 z-50">
      <Link to="home" smooth={true} className="p-2 hover:bg-white/30 rounded-full cursor-pointer">
        <Home color="white" className="w-6 h-6 text-white" />
      </Link>
      <Link to="about" smooth={true} className="p-2 hover:bg-white/30 rounded-full cursor-pointer">
        <User color="white" className="w-6 h-6 text-white" />
      </Link>
      <Link to="portfolio" smooth={true} className="p-2 hover:bg-white/30 rounded-full cursor-pointer">
        <Briefcase color="white" className="w-6 h-6 text-white" />
      </Link>
      <Link to="contact" smooth={true} className="p-2 hover:bg-white/30 rounded-full cursor-pointer">
        <Mail color="white" className="w-6 h-6 text-white" />
      </Link>
    </nav>
  )
}

export default Navbar
