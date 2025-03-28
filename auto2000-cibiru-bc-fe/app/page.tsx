import Navbar from "./components/navbar"
import Hero from "./components/hero"
import Features from "./components/features"
import Contact from "./components/contact"
import Location from "./components/location"
import About from "./components/about"

export default function Page() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div>
        <Hero/>
        <Features/>
        <Contact/>
        <Location />
        <About/>
      </div>
    </div>
  )
}