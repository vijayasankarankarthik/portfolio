import Nav from "./components/Nav.jsx";
import TraceLine from "./components/TraceLine.jsx";
import Hero from "./components/Hero.jsx";
import WhatIBuild from "./components/WhatIBuild.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Direction from "./components/Direction.jsx";
import Response from "./components/Response.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-ink font-body text-paper">
      <Nav />
      <TraceLine />
      <main>
        <Hero />
        <WhatIBuild />
        <Experience />
        <Skills />
        <Projects />
        <Direction />
        <Response />
      </main>
      <Footer />
    </div>
  );
}
