import Typed from 'typed.js'
import { useEffect, useRef } from 'react'

const MyTitleComponent = () => {
  const element = useRef(undefined)

  useEffect(() => {
    const typed = new Typed(element.current, {
      strings: ['Developpeur Full-Stack'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <div>
      <span ref={element} />
    </div>
  )
}

export default MyTitleComponent
