import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { fetchSingleGame } from '../assets/services';

function GameInfo() {
  const { gameId } = useParams();
    const gameNumID = Number(gameId);
    console.log('Game ID from URL:', gameId);
    const [game, setGame] = useState(null);

    useEffect(() => {
        const getGameData = async () => {
            const gameData = await fetchSingleGame(gameNumID);
            console.log('gameData:', gameData);
            setGame(gameData);
            console.log('game set', game);
        };
        if(gameId){
            getGameData();
            
        }
        
    }, [gameId]);
    console.log (game);
    if (!game) return <div>Loading...</div>;

    return (
        <div>
        <h1>{game.name}</h1>
        <p>{game.summary}</p>
        {game.cover_url && <img src={game.cover_url.replace("t_thumb", "t_cover_big")} alt={game.name} />}
        {/* Add other game details */}
        </div>
    );
}

export default GameInfo;