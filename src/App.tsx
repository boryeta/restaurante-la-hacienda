import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Carta } from './components/Carta';
import { DomingoFamilia } from './components/DomingoFamilia';
import { GaleriaMarquee } from './components/GaleriaMarquee';
import { AmbientesShowcase } from './components/AmbientesShowcase';
import { Ubicacion } from './components/Ubicacion';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { SiteHeader } from './components/SiteHeader';
import { useSmoothScroll } from './lib/useSmoothScroll';

export default function App() {
  useSmoothScroll();

  return (
    <main className="relative">
      <ScrollProgress />
      <SiteHeader />
      <Hero />
      <TrustBar />
      <Carta />
      <DomingoFamilia />
      <GaleriaMarquee />
      <AmbientesShowcase />
      <Ubicacion />
      <Footer />
    </main>
  );
}
