import "./SideLibBar.css"
import GameCard from "../GameCard/GameCard"
import React, { useEffect, useState } from "react";
import { getUserLibrary } from "../../data/supabase/supabaseFunctions";
import "../../data/constants";
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from "../../data/constants";
export default function SideLibBar  ({gameCard})  {
    const [view,setView] = useState("All");
    const views = ["All", "Currently Playing","Adventure","Shooter","Role-playing (RPG)", "Indie"]
    const [games, setGames] = useState([]);
        useEffect(() => {
        getUserLibrary().then(setGames);
        
        }, []);
      // Filtered games based on current view **important to get the games i want
      // TODO: limit # of games returned
      const filteredGames = games.filter((game) => {
        if (view === "All") return true;
        if (view === "Currently Playing") return game.playing;
        if (game.genres.includes(view)) return game;
      });
    return(
        <div style={{display: "grid", gridTemplateColumns: "1fr 3fr 1fr"}}>
             <div >
                <div style={{width: "180px", height: "100vh", marginTop: "110px",marginLeft: "10px", marginRight: "20px"}}>
                    {/* <h4 >Categories</h4> */}
                    <ul className="list-group sidenavbar-custom" >
                    {views.map((v) => (
                        <li
                        key={v}
                        className={`list-group-item ${view === v ? "active" : ""}`}
                        onClick={() => setView(v)} // Change state on click
                        style={{ cursor: "pointer", backgroundColor:`${view === v ? `${PRIMARY_COLOR}` :`${TERTIARY_COLOR}` }`, color: `${SECONDARY_COLOR}`}}
                        >
                        {v}
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            {/* Actual sidenavbar display */}


        <div style={{width: "700px"}}>
            <h2 style={{ display: "flex",  flexWrap: "wrap", marginTop: "40px",borderBottom:"3px solid" }} className="display-6">
                {view} Games
            </h2>

            {/* State-Based Rendering */}
            {filteredGames.length > 0 ? (
                <div >
                    <div >
                        
                        <div style={{ display: "flex", gap: "15px" }}>
                            {filteredGames.map((game) => (
                                
                                <GameCard
                                    key={game.id}
                                    gameID={game.id}
                                    image={game.cover_url}
                                    name={game.name}
                                    score={game.score}
                                    playtime={game.playtime}
                                />
                            ))}
                        </div>       
                    </div>
                </div>
                            
            ) : (
                <p>No games found for this category.</p>
            )}
        </div>

        <div>Tesssst</div>
  </div>
);
}



