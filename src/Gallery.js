function Gallery() {
  return (
    <div className="gallery-page">
      <div className="gallery-grid">
        {cards.map((card) => (
          <img key={card.id} src={card.src} alt={`Card ${card.id}`} className="gallery-card" />
        ))}
      </div>
    </div>
  );
}
