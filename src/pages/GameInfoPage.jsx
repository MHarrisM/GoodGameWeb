import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GameInfo from '../components/GameInfo/GameInfo';
import { fetchSingleGame } from '../../public/data/services';

function GameInfoPage() {
  const { gameId } = useParams();
    const gameNumID = parseInt(gameId,10);
    const [game, setGame] = useState(null);

    useEffect(() => {
        const getGameData = async () => {
            const gameData = await fetchSingleGame(gameNumID);
            setGame(gameData);
  
        };
        if(gameId){
            getGameData();
            
        }
        
    }, [gameId]);

    if (!game) return <div>Loading...</div>;

    return (
        <GameInfo
        gameID = {game.id}
        name = {game.name}
        imageURL = {game.cover_url}
        genres = {game.genres}
        description = {game.summary}

        
        />
    );
}

export default GameInfoPage;