import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

const About = lazy(() => import('./components/About'));
const Expertise = lazy(() => import('./components/Expertise'));
const Projects = lazy(() => import('./components/Projects'));
const DataLab = lazy(() => import('./components/DataLab'));
const Experience = lazy(() => import('./components/Experience'));
const Approach = lazy(() => import('./components/Approach'));
const Contact = lazy(() => import('./components/Contact'));

function LoadingFallback() {
  return (
    <div style={{
      minHeight: '40vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 32,
        height: 32,
        border: '2px solid rgba(0, 229, 255, 0.2)',
        borderTopColor: '#00E5FF',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
          <Expertise />
          <Projects />
          <DataLab />
          <Experience />
          <Approach />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
