import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import PageLoader from './components/PageLoader';

// Scroll to top on navigation component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Instant scroll to top to avoid visual jittering
    });
  }, [pathname]);

  return null;
};

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const Characters = lazy(() => import('./pages/Characters'));
const Watch = lazy(() => import('./pages/Watch'));
const MeetAndPlay = lazy(() => import('./pages/MeetAndPlay'));
const News = lazy(() => import('./pages/News'));
const Shop = lazy(() => import('./pages/Shop'));
const Business = lazy(() => import('./pages/Business'));
const GamesHub = lazy(() => import('./pages/GamesHub'));
const MemoryGame = lazy(() => import('./pages/MemoryGame'));
const ColoringGame = lazy(() => import('./pages/ColoringGame'));
const PuzzleGame = lazy(() => import('./pages/PuzzleGame'));
const HideAndSeekGame = lazy(() => import('./pages/HideAndSeekGame'));
const MusicAtSeaGame = lazy(() => import('./pages/MusicAtSeaGame'));
const CarrotGame = lazy(() => import('./pages/CarrotGame'));
const SnakeGame = lazy(() => import('./pages/SnakeGame'));
const SergiRunGame = lazy(() => import('./pages/SergiRunGame'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Copyright = lazy(() => import('./pages/Copyright'));
const CRM = lazy(() => import('./pages/CRM'));
const Pro = lazy(() => import('./pages/Pro'));
const IdaraWorld = lazy(() => import('./pages/IdaraWorld'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/meet-and-play" element={<MeetAndPlay />} />
            <Route path="/news" element={<News />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/business" element={<Business />} />
            <Route path="/pro" element={<Pro />} />
            <Route path="/play" element={<GamesHub />} />
            <Route path="/play/memorama" element={<MemoryGame />} />
            <Route path="/play/colors" element={<ColoringGame />} />
            <Route path="/play/puzzle" element={<PuzzleGame />} />
            <Route path="/play/hide" element={<HideAndSeekGame />} />
            <Route path="/play/music" element={<MusicAtSeaGame />} />
            <Route path="/play/carrots" element={<CarrotGame />} />
            <Route path="/play/snake" element={<SnakeGame />} />
            <Route path="/play/sergi" element={<SergiRunGame />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/copyright" element={<Copyright />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/idara" element={<IdaraWorld />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
