import GameCard from "/src/components/GameCard/GameCard";
import React, { useEffect, useState } from "react";
import SideLibBar from "../components/SideLibBar/SideLibBar";
import { useParams } from 'react-router-dom';
import { fetchGames } from "../../public/data/services";
import supabase from "../../public/data/supabase/supabaseClient";
import { selectUserLibrary, selectGamesFromUserLibrary } from "../../public/data/supabase/supabaseFunctions";

const Library = () => {
    const { name } = useParams();
    const [games, setGames] = useState([]);
    useEffect(() => {
    selectGamesFromUserLibrary().then(setGames);
    }, []);
    const [library, setLibrary] = useState([]);
        useEffect(() => {
            selectUserLibrary().then(setLibrary)
        },[]);
    const isInLibrary = (gameId) => {
        return library.some(item=>item.game_id ===gameId)
    };

    return (
        
            <div >
                <div >
                    <SideLibBar
                    games={games}
                    vaultPassedName={name}
                    
                />   
                </div>
            </div>
        
    );
};
export default Library;