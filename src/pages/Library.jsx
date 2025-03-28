import GameCard from "/src/components/GameCard/GameCard";
import React, { useEffect, useState } from "react";
import SideLibBar from "../components/SideLibBar/SideLibBar";

import { fetchGames } from "../data/services";
import supabase from "../data/supabase/supabaseClient";
import { getUserLibrary } from "../data/supabase/supabaseFunctions";

const Library = () => {
    const [games, setGames] = useState([]);
    useEffect(() => {
    getUserLibrary().then(setGames);
    }, []);
    return (
        <div>

            <div>
                <SideLibBar
                    games={games} 
                    gameCard = {games.map((game) => (
                        <GameCard
                            key={game.id}
                            gameID={game.id}
                            image={game.cover_url}
                            name={game.name}
                            score={game.score}
                            playtime={game.playtime}
                        />
                    ))}
                        
                /> 
                
            </div>
        </div>
        
        
    );
};
export default Library;