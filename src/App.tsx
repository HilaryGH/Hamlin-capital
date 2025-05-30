import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";
import HamlinServices from "./components/HamlinServices";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SuccessStories from "./components/SuccessStories";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <HamlinServices />
      <About />
      <SuccessStories />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
