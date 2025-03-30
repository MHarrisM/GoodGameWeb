import "./SideLibBar.css"
import GameCard from "../GameCard/GameCard"
import React, { useEffect, useState } from "react";
import { insertVault, selectCurrentlyPlayingGames, selectGamesFromUserLibrary, selectUserLibrary } from "../../../public/data/supabase/supabaseFunctions";
import "../../../public/data/constants";
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from "../../../public/data/constants";
import { useLocation } from "react-router-dom";
import { useData } from '../../DataContext';

export default function SideLibBar  ({isInUserLibrary})  {
    const [vault,setVault] = useState("All");
    let coreVaults = ["All", "Currently Playing", "Completed"] //selectAllVaults(use context)
    const [vaultName, setVaultName] = useState("Action");

    const {vaults} = useData();
    const listOfVaultNames = vaults.map(item=>item.name);
    const allVaults = [...coreVaults,...listOfVaultNames]

    const handleCreateNewVault = async() => {
        insertVault(vaultName)
        alert(`Vault ${vaultName} created`)
    }
    
    const [games, setGames] = useState([]);
        useEffect(() => {
            selectGamesFromUserLibrary().then(setGames);
        }, []);
    const [lib, setLib] = useState([]);
        useEffect(() =>{
            selectUserLibrary().then(setLib);
        }, [])
    const [curr, setCurr] = useState([]);
        useEffect(() => {
            selectCurrentlyPlayingGames().then(setCurr);
        }, []);
    
      // Filtered games based on current view **important to get the games i want
      // TODO: limit # of games returned 
    const filteredGames = games.filter((game) => {
        if (vault === "All") return true;
        if (vault === "Currently Playing") return curr;
        if (game.genres.includes(vault)) return game;
    });

    let gamesToUse
    if(vault === "Currently Playing"){
        gamesToUse = curr;
      }else{
        gamesToUse = filteredGames;
    }
    //Combine data from two different tables //TODO: move to SBDB functions (learn)
    const mergedGames = gamesToUse.map(game => {
        const libEntry = lib.find(item => item.game_id === game.id);
        return {
            ...game,
            user_rating: libEntry ? libEntry.user_rating : "N/A",
            current_playtime: libEntry ? libEntry.current_playtime : "N/A"
        };
    });
    //console.log(`${lib.current_playtime}`)
    return(
        <div style={{display: "grid", gridTemplateColumns: "1fr 3fr 1fr"}}>
            <div >
                
                <div style={{width: "180px", height: "100vh", marginTop: "110px",marginLeft: "10px", marginRight: "20px"}}>
                    {/* <h4 >Categories</h4> */}
                    <div class="dropdown mb-3">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            Create new Vault
                        </button>
                        
                        <div className="dropdown-menu p-2">
                            <div class="mb-1">
                                <label >Vault Name</label>
                                <input className="form-control" type="text" value={vaultName} onChange={(e) => setVaultName(e.target.value)}  placeholder="vault name"/>
                                <button onClick ={handleCreateNewVault} class="btn btn-secondary">Add Vault</button>
                            </div>
                        </div>
                    </div>


                    <ul className="list-group sidenavbar-custom" >
                        
                        {allVaults.map((v) => (
                            
                            <li
                                key={v}
                                className={`list-group-item ${vault === v ? "active" : ""}`}
                                onClick={() => setVault(v)} // Change state on click
                                style={{ cursor: "pointer" }}
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
                    {vault} Games
                </h2>
                {/* State-Based Rendering */}
                {mergedGames.length > 0 ? (
                    <div >
                        <div >
                            <div style={{ display: "flex", flexWrap:"wrap", gap: "15px" }}>
                                {mergedGames.map((game) => (
                                    <GameCard
                                        key={game.id}
                                        gameID={game.id}
                                        image={game.cover_url}
                                        name={game.name}
                                        score={game.user_rating}
                                        playtime={game.current_playtime}
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



