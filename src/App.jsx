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

  return (
    <div className={`min-h-screen bg-base bg-grid text-text font-sans ${isLife ? "theme-life" : ""}`}>
      <Nav />
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
