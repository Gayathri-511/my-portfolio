import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CaseStudy from './pages/CaseStudy';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Playground from './pages/Playground';
import './App.css';

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="page">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/playground/:slug" element={<CaseStudy />} />
      </Routes>
    </div>
  );
}

export default App;
