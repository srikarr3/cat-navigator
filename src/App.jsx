import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Home from './components/Home.jsx'
import MarksVsPercentile from './components/MarksVsPercentile'
import IIMCutoffs from './components/IIMCutoffs'
import PostCATProcess from './components/PostCATProcess'
import LowPIWATIIMs from './components/LowPIWATIIMs'
import OtherColleges from './components/OtherColleges'
import Tools from './components/Tools'
import StudyMaterials from './components/StudyMaterials'
import CAT2025Guide from './components/CAT2025Guide'
import Footer from './components/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import BackToTop from './components/common/BackToTop'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white">
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Home />
              </>
            } />
            <Route path="/marks-vs-percentile" element={<MarksVsPercentile />} />
            <Route path="/iim-cutoffs" element={<IIMCutoffs />} />
            <Route path="/post-cat-process" element={<PostCATProcess />} />
            <Route path="/low-pi-wat-iims" element={<LowPIWATIIMs />} />
            <Route path="/other-colleges" element={<OtherColleges />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/study-materials" element={<StudyMaterials />} />
            <Route path="/cat-2025-guide" element={<CAT2025Guide />} />
          </Routes>
        </main>
        <BackToTop />
        <Footer />
      </div>
    </Router>
  )
}

export default App
