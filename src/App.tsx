import { useEffect, useState } from 'react'
import Scene from './three/Scene'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Loader from './components/Loader'
import { useLenis } from './hooks/useLenis'

export default function App() {
  const scrollProgress = useLenis()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 600)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      <Loader done={ready} />
      <Scene scrollProgress={scrollProgress} />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
