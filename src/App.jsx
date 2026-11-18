import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Koalas from './pages/Koalas';
import Donate from './pages/Donate';
import News from './pages/News';
import Saved from './pages/Saved';
import BottomNav from './components/BottomNav';
import NewsArticle from './pages/NewsArticle';
import KoalaProfile from './pages/KoalaProfile';
import KoalaSighting from './pages/KoalaSighting';

function App() {
  return (
    <div className="app-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/koalas" element={<Koalas />} />
        <Route path="/koalas/:id" element={<KoalaProfile />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsArticle />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/koalaSighting" element={<KoalaSighting />} />
      </Routes>

      <BottomNav />
    </div>
  );
}

export default App;