import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Kart listesi (20 adet)
const cards = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `/cards/card${i + 1}.png`,
}));

// Ana Sayfa Bileşeni
function Home() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [mintedCard, setMintedCard] = useState(null);

  useEffect(() => {
    if (!mintedCard) {
      const interval = setInterval(() => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [mintedCard]);

  const handleMint = () => {
    setMintedCard(cards[currentCardIndex]);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = mintedCard.src;
    link.download = `minted-card-${mintedCard.id}.png`;
    link.click();
  };

  const handleShare = () => {
    const tweet = `I did a random mint and came across this @irys_xyz character! 👇 powered by @emir_ethh`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  return (
    <div className="app">
      <div className="card-container">
        <img
          src={mintedCard ? mintedCard.src : cards[currentCardIndex].src}
          alt={`Card ${mintedCard ? mintedCard.id : currentCardIndex + 1}`}
          className="card-image"
        />

        {!mintedCard && (
          <>
            <button className="mint-button" onClick={handleMint}>
              Mint Your Card
            </button>
            <div className="warning-message">🔁 You can mint it again with F5</div>
          </>
        )}

        {mintedCard && (
          <div className="action-buttons">
            <button onClick={handleDownload}>Download Card</button>
            <button onClick={handleShare}>Share on X</button>
          </div>
        )}
      </div>

      <footer className="footer">
        <span>Powered by</span>
        <a href="https://x.com/emir_ethh" target="_blank" rel="noopener noreferrer">
          <img src="/x-icon.png" alt="X" className="x-icon" />
          Emir.Eth
        </a>
        <Link to="/gallery" className="gallery-link">→ View Gallery</Link>
      </footer>
    </div>
  );
}

// Galeri Sayfası Bileşeni
function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-page">
      <div className="back-button-top">
        <Link to="/">
          <button>← Back to Mint</button>
        </Link>
      </div>

      <div className="gallery-grid">
        {cards.map((card) => (
          <div className="gallery-card" key={card.id} onClick={() => handleImageClick(card.src)}>
            <img src={card.src} alt={`Card ${card.id}`} />
          </div>
        ))}
      </div>

      <footer className="footer">
        <span>Powered by</span>
        <a href="https://x.com/emir_ethh" target="_blank" rel="noopener noreferrer">
          <img src="/x-icon.png" alt="X" className="x-icon" />
          Emir.Eth
        </a>
	<Link to="/" className="gallery-link">← Back to Mint</Link>
      </footer>

      {/* MODAL */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✖</button>
            <img src={selectedImage} alt="Selected Card" />
          </div>
        </div>
      )}
    </div>
  );
}

// Ana Uygulama
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
