import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Carta } from './components/Carta';
import { DomingoFamilia } from './components/DomingoFamilia';
import { AmbientesDetalle } from './components/AmbientesDetalle';
import { Ubicacion } from './components/Ubicacion';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <main className="relative">
      <Hero />
      <TrustBar />
      <Carta />
      <DomingoFamilia />
      <AmbientesDetalle />
      <Ubicacion />
      <Footer />
    </main>
  );
}
