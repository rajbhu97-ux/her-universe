import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BottomNavigation from "./components/BottomNavigation";
import MusicPlayer from "./components/MusicPlayer";
import FloatingHearts from "./components/FloatingHearts";
import LoadingScreen from "./components/LoadingScreen";
import "./styles/global.css";

const Home = lazy(() => import("./pages/Home"));
const OurStory = lazy(() => import("./pages/OurStory"));
const Memories = lazy(() => import("./pages/Memories"));
const LoveNotes = lazy(() => import("./pages/LoveNotes"));
const Surprise = lazy(() => import("./pages/Surprise"));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<OurStory />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/love-notes" element={<LoveNotes />} />
          <Route path="/surprise" element={<Surprise />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <LoadingScreen show={loading} />
      {!loading && (
        <>
          <FloatingHearts />
          <MusicPlayer />
          <AnimatedRoutes />
          <BottomNavigation />
        </>
      )}
    </BrowserRouter>
  );
}
