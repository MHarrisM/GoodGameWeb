import GameCard from "../GameCard/GameCard"
import { Link } from "react-router-dom"
import "./CurrentlyPlayingCard.css"

import SearchBar from "/src/components/SearchBar/SearchBar"
import React, { useEffect, useState } from "react";
import { selectUserLibrary} from "/public/data/supabase/supabaseFunctions";
import { insertGameToUserLibrary, selectCurrentlyPlayingGames, selectVaultGamesByName } from "../../../public/data/supabase/supabaseFunctions";

const CurrentlyPlayingCard = ({image, name, score, playtime}) => {
    const [library, setLibrary] = useState([]);
        useEffect(() => {
            selectUserLibrary().then(setLibrary);
    }, []);
    const[currentPlayingGames, setcurrentlyPlayingGames] = useState([]);
        useEffect(() => {
            selectVaultGamesByName("Currently Playing").then(setcurrentlyPlayingGames)
        },[]);



 
    const view = "Currently Playing";
    return(
        <div>
            <div className="background-card">
                <p style={{fontSize: "20px"}}>Currently Playing?</p>
                    <div style={{display: "flex"}}>
                        {currentPlayingGames.slice(0,2).map((game) => (
                            <GameCard
                                variant="small"
                                key={game.id}
                                gameID={game.id}
                                image={game.cover_url}  
                                name={game.name}
                                score={game.user_rating}
                                playtime={game.current_playtime}
                            />
                        ))}
                    </div>
                {/* <nav className="text-link">
                    <Link className="text-link" to={{ pathname:`/library`, state: {passedView: "Currently Playing"}}}>See more...</Link>
                </nav> */}
            </div>
        </div>
         

        


    )

}
export default CurrentlyPlayingCard

