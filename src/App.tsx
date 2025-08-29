import Hero from "./components/hero/Hero"
/* import Navbar from "./components/layouts/Navbar" */
// import Footer from "./components/layouts/Footer"
import About from "./components/about/About"
import OrbScene from "./components/scenes/OrbScene"
// import TechStack from "./components/tech-stack/TechStack"

function App() {
  return (
    <main className=" min-h-screen w-screen overflow-hidden">
      <div className="fixed inset-0 z-10 pointer-events-none">
        <OrbScene />
      </div>
      <Hero />
      <About />
      {/*  <TechStack/> */}
      {/* <Footer/> */}
    </main>
  )
}

export default App
