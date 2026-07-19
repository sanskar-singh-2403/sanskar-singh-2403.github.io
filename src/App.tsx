import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Scene from './three/Scene'
import Nav from './components/Nav'
import Loader from './components/Loader'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import { useLenis } from './hooks/useLenis'

export default function App() {
  const scrollProgress = useLenis()
  const [ready, setReady] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 600)
    return () => clearTimeout(id)
  }, [])

  // Jump to top on route change (blog <-> home navigation).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Loader done={ready} />
      <Scene scrollProgress={scrollProgress} />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </>
  )
}
