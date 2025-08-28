import Hero from "./components/hero/Hero"
/* import Navbar from "./components/layouts/Navbar" */
import Footer from "./components/layouts/Footer"
import About from "./components/about/About"

function App() {
  return (
    <main className=" min-h-screen w-screen overflow-hidden">
      <Hero/>
      <About/>
      <Footer/>
    </main>
  )
}

export default App
