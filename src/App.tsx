import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Footer from "./components/Footer";
import HamlinServices from "./components/HamlinServices";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SuccessStories from "./components/SuccessStories";
import Contact from "./components/Contact";
import ContactPage from "./components/ContactPage";
import Hero from "./components/Hero";
import BrandValues from "./components/BrandValues";
import MergersAcquisitionsPage from "./components/Service/MergersAcquisitionsPage";
import FundraisingPage from "./components/Service/FundraisingPage";
import AdvisoryPage from "./components/Service/AdvisoryPage";
import Research from "./components/Service/Research";
import ResearchPage from "./components/ResearchPage";
import ServicesPage from "./components/servicePage";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Home Route (main page with all sections) */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <HamlinServices />
              <About />
              <ServicesPage />
              <SuccessStories />
              <Hero />
              <Contact />
            </>
          }
        />

        {/* Brand Values (loaded when About Us + is clicked) */}
        <Route path="/about/values" element={<BrandValues />} />
        <Route path="/service" element={<HamlinServices />} />
        <Route path="/service/fundraising" element={<FundraisingPage />} />
        <Route path="/service/ma" element={<MergersAcquisitionsPage />} />
        <Route path="/service/advisory" element={<AdvisoryPage />} />
        <Route path="/service/research" element={<Research />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
