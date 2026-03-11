import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ContactForm from "./components/ContactForm";
import About from "./components/About";

import { useEffect } from "react";

function App() {

  useEffect(()=>{
    document.title = "Aniket | Portfolio";
  }, []);
  return (
    <div>
      <Navbar title = "ANIKET's PORICHOY"/>
      <HeroSection name = "Aniket" role = "Full Stack Developer"/>
      <About/>
      <ContactForm/>
    </div>
  )
}

export default App;