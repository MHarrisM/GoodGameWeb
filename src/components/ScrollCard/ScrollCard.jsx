import "./ScrollCard.css";
import GameCard from "../GameCard/GameCard"
const ScrollCard = ({games}) => {
  const game = 0;
  const gameL = {games}
  return (
    <div className="div-scroll-container">
      <div className="div-scroll-content">
        
        {games?.map((game) => (
          <div key={game.id} className="div-scroll-game-card">
            <GameCard
              key={game.id}
              gameID={game.id}
              image={game.cover_url}
              name={game.name}
              variant="extralarge"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollCard;
