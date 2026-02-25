import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer2';
import Home from './pages/home/Home';
import Drivers from './pages/drivers/Drivers';
import Contact from './pages/contact/Contact';
import Legal from './pages/legal/Legal';
import News from './pages/news/News';
import Forum from './pages/forum/Forum';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
