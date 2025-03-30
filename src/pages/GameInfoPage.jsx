import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GameInfo from '../components/GameInfo/GameInfo.jsx';
import { useData } from '../DataContext';
import { selectGameById, selectUserLibrary, selectVaultGamesById, selectVaults } from '../../public/data/supabase/supabaseFunctions.js';

const GameInfoPage = () =>{
    const { gameId } = useParams();
    const gameNumID = parseInt(gameId,10);
    let de_vaultGames = []

    const {library,isInLibrary,vaults } = useData();

    const [retrievedGame, setGame] = useState(null);
        useEffect(() => {
            const getGameData = async () => {
                const gameData = await selectGameById(gameNumID);
                setGame(gameData);
            };
            if(gameId){
                getGameData();
            }  
        }, [gameId]);

    // const [vault, setVault] = useState([]);
    //     useEffect(() => {
    //         selectVaults().then(setVault)
    //     },[])

    // const [vaultGames, setVaultGames] = useState([]);
    // useEffect(() => {
    //     selectVaultGamesById(vault.id).then(setVaultGames)
    //     de_vaultGames = vaultGames.map(item=>item)
    // },[])

    // const [library, setLibrary] = useState([]);
    //     useEffect(() => {
    //         selectUserLibrary().then(setLibrary)
    //     },[]);
    // const TisInLibrary = (gameId) => {
    //     return library.some(item=>item.game_id ===gameId)
    // };

    
    console.log(`${de_vaultGames}`)



    if (!retrievedGame) return <div>Loading...</div>;

    return (

        <GameInfo
        gameID = {retrievedGame.id}
        name = {retrievedGame.name}
        imageURL = {retrievedGame.cover_url}
        genres = {retrievedGame.genres}
        description = {retrievedGame.summary}
        inUserLibrary={isInLibrary(retrievedGame.id)}
        
        />
    );
}

export default GameInfoPage;