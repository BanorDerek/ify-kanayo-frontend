import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import WeddingMemories from './pages/WeddingMemories/WeddingMemories';
import WeddingDetails from './pages/WeddingDetails/WeddingDetails';
import GiftRegistry from './pages/GiftRegistry/GiftRegistry';
import RSVP from './pages/RSVP/RSVP';

import './styles/global.css';
import './styles/theme.css';

const Seating = () => <div>Seating Arrangement Page - Coming Soon</div>;
const Hotels = () => <div>Waiting for the list of hotels, would update when available </div>;

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  if (!loadingComplete) {
    return <Loader onLoadingComplete={() => setLoadingComplete(true)} />;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wedding-details" element={<WeddingDetails />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/wedding-memories" element={<WeddingMemories />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/gift-registry" element={<GiftRegistry />} />
      </Routes>
    </Router>
  );
}

export default App;