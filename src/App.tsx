import Hero from "./components/hero/Hero"
/* import Navbar from "./components/layouts/Navbar" */
// import Footer from "./components/layouts/Footer"
import About from "./components/about/About"
// import TechStack from "./components/tech-stack/TechStack"

function App() {
  return (
    <main className=" min-h-screen w-screen overflow-hidden">
      <Hero/>
      <About/>
     {/*  <TechStack/> */}
      {/* <Footer/> */}
    </main>
  )
}

export default App
