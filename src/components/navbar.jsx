import { Link } from 'react-scroll'
import { Briefcase, Home, Mail, User } from 'grommet-icons'
import { useEffect, useMemo, useRef, useState } from 'react'

const Navbar = () => {
  const items = useMemo(() => [
    { icon: Home, label: 'Accueil', target: 'home' },
    { icon: User, label: 'A propos', target: 'about' },
    { icon: Briefcase, label: 'Projets', target: 'portfolio' },
    { icon: Mail, label: 'Contact', target: 'contact' },
  ], [])
  const containerReference = useRef(null)
  const itemReferences = useRef({})
  const [activeTarget, setActiveTarget] = useState('home')
  const [hoveredTarget, setHoveredTarget] = useState()
  const [indicatorStyle, setIndicatorStyle] = useState({
    opacity: 0,
    height: 0,
    transform: 'translateY(0px)',
  })

  useEffect(() => {
    const updateIndicator = () => {
      const container = containerReference.current
      const currentTarget = hoveredTarget ?? activeTarget
      const activeItem = itemReferences.current[currentTarget]

      if (!container || !activeItem) {
        setIndicatorStyle(previous => ({
          ...previous,
          opacity: 0,
        }))
        return
      }

      const containerRect = container.getBoundingClientRect()
      const itemRect = activeItem.getBoundingClientRect()

      setIndicatorStyle({
        opacity: 1,
        height: itemRect.height,
        transform: `translateY(${itemRect.top - containerRect.top}px)`,
      })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)

    return () => {
      window.removeEventListener('resize', updateIndicator)
    }
  }, [activeTarget, hoveredTarget])

  return (
    <nav className="fixed right-0 top-1/2 z-50 -translate-y-1/2">
      <div
        ref={containerReference}
        className="relative flex flex-col items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-2 shadow-[0_10px_30px_rgb(0_0_0_/_0.14)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/[0.04]"
        onMouseLeave={() => {
          setHoveredTarget(undefined)
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-2 top-0 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.12),0_8px_20px_rgb(0_0_0_/_0.08)] backdrop-blur-md transition-[transform,height,opacity] duration-300"
          style={indicatorStyle}
        />
        {items.map(({ icon: Icon, label, target }) => (
          <span
            key={target}
            ref={(reference) => {
              itemReferences.current[target] = reference
            }}
          >
            <Link
              to={target}
              smooth={true}
              spy={true}
              offset={-32}
              onSetActive={() => {
                setActiveTarget(target)
              }}
              title={label}
              className={`group relative z-10 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-sm ${
                (hoveredTarget ?? activeTarget) === target
                  ? 'text-white'
                  : 'text-[color:var(--color-text-tertiary)]'
              }`}
              onMouseEnter={() => {
                setHoveredTarget(target)
              }}
              onFocus={() => {
                setHoveredTarget(target)
              }}
              onBlur={() => {
                setHoveredTarget(undefined)
              }}
            >
              <Icon className="h-4 w-4" />
            </Link>
          </span>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
