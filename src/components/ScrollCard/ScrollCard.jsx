import "./ScrollCard.css";

const ScrollCard = ({games}) => {
  const gameL = {games}
  return (
    <div className="div-scroll-container">
      <div className="div-scroll-content">
        
        {games?.map((game) => (
          <div key={game.id} className="div-scroll-game-card">
            <img src={game.cover_url} alt={game.name} className="img-scroll-image" />
            <p>{game.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollCard;
