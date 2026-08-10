import { lazy, Suspense } from 'react';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';

// Lazy-load the 3D scene so the page shell loads instantly
const SystemScene = lazy(() => import('./3d/SystemScene.jsx'));

export default function App() {
  return (
    <>
      {/* Fixed nav — sits on top of the canvas */}
      <Nav />

      {/* 3D System Scene — the entire portfolio experience */}
      <Suspense fallback={<div className="scene-loading" />}>
        <SystemScene />
      </Suspense>

      {/* Footer absolutely positioned at the bottom of the scroll area */}
      <Footer />
    </>
  );
}
