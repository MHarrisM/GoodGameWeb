import GameCard from "../GameCard/GameCard"
import { Link } from "react-router-dom"
import "./CurrentlyPlayingCard.css"

import SearchBar from "/src/components/SearchBar/SearchBar"
import React, { useEffect, useState } from "react";
import { fetchGames } from "/src/assets/services";

const CurrentlyPlayingCard = ({image, name, score, playtime}) => {
    const [searchTermCPC, setSearchTermCPC] = useState("");
    const handleGameSelect = (game) => {
        alert(`Adding ${game.name} to Currently Playing!`);
    };
    const [games, setGames] = useState([]);
        useEffect(() => {
        fetchGames().then(setGames);
        }, []);
    return(
        <div>
            <div className="background-card">
                <p className="text-title">Currently Playing?
                    <SearchBar searchTerm={searchTermCPC} setSearchTerm={setSearchTermCPC} onSelect={handleGameSelect}> </SearchBar>    
                </p>
                {games.slice(0,3).map((game) => (
                    <GameCard
                        variant="small"
                        key={game.id}
                        image={game.cover_url}  
                        name={game.name}
                        score={game.score}
                        playtime={game.playtime}
                        
                    />
                ))}
                <nav className="text-link">
                    <Link className="text-link" to="/library">See more...</Link>
                </nav>
            </div>
        </div>
         

        


    )

}
export default CurrentlyPlayingCard

