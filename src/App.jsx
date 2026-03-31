import NavBar from './components/NavBar';
import HeroSection from './sections/HeroSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
  <main>
    <NavBar />
    <HeroSection />
  </main>
  );
};

export default App