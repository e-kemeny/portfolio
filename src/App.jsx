import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Dev from "./pages/Dev";
import Life from "./pages/Life";
import NotFound from "./pages/NotFound";

export default function App() {
  const { pathname } = useLocation();
  const isLife = pathname.startsWith("/life");

  // The browser's actual scrollbar belongs to <html>, not any div inside the
  // page — CSS variables only cascade down to children, so a class on an
  // inner div can never reach it. Toggle the theme class on <html> directly.
  useEffect(() => {
    document.documentElement.classList.toggle("theme-life", isLife);
  }, [isLife]);

  const isKnownRoute = pathname === "/" || pathname === "/life";

  return (
    <div className="min-h-screen bg-base bg-grid text-text font-sans">
      {isKnownRoute && <Nav />}
      <Routes>
        <Route path="/" element={<Dev />} />
        <Route path="/life" element={<Life />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Analytics />
    </div>
  );
}
