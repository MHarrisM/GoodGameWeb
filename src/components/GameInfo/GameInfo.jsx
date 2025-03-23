import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { fetchSingleGame } from '../../assets/services';

function GameInfo() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const getGameData = async () => {
      const gameData = await fetchSingleGame(gameId);
      setGame(gameData);
    };
    getGameData();
  }, [gameId]);

  if (!game) return <div>Loading...</div>;

  return (
    <div>
      <h1>{game.name}</h1>
      <p>{game.summary}</p>
      {/* Add other game details */}
    </div>
  );
}

export default GameInfo;