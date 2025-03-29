import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GameInfo from '../components/GameInfo/GameInfo';
import { selectGameById, selectUserLibrary, selectVaultGamesById, selectVaults } from '../../public/data/supabase/supabaseFunctions';

const GameInfoPage = () =>{
    const { gameId } = useParams();
    const gameNumID = parseInt(gameId,10);
    let de_vaultGames = []
    const [game, setGame] = useState(null);
        useEffect(() => {
            const getGameData = async () => {
                const gameData = await selectGameById(gameNumID);
                setGame(gameData);
            };
            if(gameId){
                getGameData();
            }  
        }, [gameId]);
    const [vault, setVault] = useState([]);
        useEffect(() => {
            selectVaults().then(setVault)
        },[])
    const [vaultGames, setVaultGames] = useState([]);
    useEffect(() => {
        selectVaultGamesById(vault.id).then(setVaultGames)
        de_vaultGames = vaultGames.map(item=>item)
    },[])
    const [library, setLibrary] = useState([]);
        useEffect(() => {
            selectUserLibrary().then(setLibrary)
        },[]);
    const isInLibrary = (gameId) => {
        return library.some(item=>item.game_id ===gameId)
    };
    console.log(`${de_vaultGames}`)



    if (!game) return <div>Loading...</div>;

    return (

        <GameInfo
        gameID = {game.id}
        name = {game.name}
        imageURL = {game.cover_url}
        genres = {game.genres}
        description = {game.summary}
        inUserLibrary={isInLibrary(game.id)}
        
        />
    );
}

export default GameInfoPage;