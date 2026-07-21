import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Carta } from './components/Carta';
import { DomingoFamilia } from './components/DomingoFamilia';
import { GaleriaMarquee } from './components/GaleriaMarquee';
import { AmbientesShowcase } from './components/AmbientesShowcase';
import { Ubicacion } from './components/Ubicacion';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <main className="relative">
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
