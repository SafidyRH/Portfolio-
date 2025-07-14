import { Down } from 'grommet-icons'
import { Link } from 'react-scroll'
import MyTitleComponent from './typed-title'
import ME from '../assets/profil.png'

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center space-y-6 mt-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          <span className="block">RAOELINIRINA Safidy</span>
          <span className="block text-blue-400 mt-2">
            <MyTitleComponent />
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
          Crafting beautiful and functional web experiences with modern technologies
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="about"
            smooth={true}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Learn More
          </Link>
          <a
            href="/Raoelinirina-CV_2025-07.pdf"
            download
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            Download My Resume
          </a>
        </div>
      </div>

      <div className="relative flex items-center justify-center w-52 h-52 sm:w-[350px] sm:h-[450px] mt-8 sm:mt-0">
        <div className="bg-gradient-to-b from-[var(--color-primary)] to-transparent w-full h-full rounded-full sm:rounded-[15rem_15rem_0_0] overflow-hidden flex items-center justify-center">
          <img src={ME} alt="me" className="w-44 h-44 sm:w-[300px] sm:h-[400px] object-cover" />
        </div>
      </div>

      <div className="mb-8 animate-bounce">
        <Link to="about" smooth={true} className="cursor-pointer">
          <Down className="w-6 h-6 text-white/60" />
        </Link>
      </div>
    </section>
  )
}

export default Hero
