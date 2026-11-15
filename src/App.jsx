import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Koalas from './pages/Koalas';
import Donate from './pages/Donate';
import News from './pages/News';
import Saved from './pages/Saved';
import More from './pages/More';
import BottomNav from './components/BottomNav';
import NewsArticle from './pages/NewsArticle';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/koalas" element={<Koalas />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsArticle />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/more" element={<More />} />
      </Routes>

      <BottomNav />
    </>
  );
}

export default App;