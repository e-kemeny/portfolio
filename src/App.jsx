import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Dev from "./pages/Dev";
import Life from "./pages/Life";

export default function App() {
  return (
    <div className="min-h-screen bg-base bg-grid text-text font-sans">
      <Nav />
      <Routes>
        <Route path="/" element={<Dev />} />
        <Route path="/life" element={<Life />} />
      </Routes>
      <Footer />
    </div>
  );
}
