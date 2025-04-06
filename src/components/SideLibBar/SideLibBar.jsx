import "./SideLibBar.css"
import GameCard from "../GameCard/GameCard"
import React, { useEffect, useState } from "react";
import { insertVault, selectCurrentlyPlayingGames, selectGamesFromUserLibrary, selectUserLibrary, selectVaultGamesByName } from "../../../public/data/supabase/supabaseFunctions";
import "../../../public/data/constants";
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from "../../../public/data/constants";
import { useLocation } from "react-router-dom";
import { useData } from '../../DataContext';

export default function SideLibBar({ vaultPassedName }) {
    console.log(`${vaultPassedName}`)
    const [vault, setVault] = useState(vaultPassedName);
    let coreVaults = ["All"] //selectAllVaults(use context)
    const [vaultName, setVaultName] = useState("");

    const { vaults, updateVaults } = useData();
    const listOfVaultNames = vaults.map(item => item.name);

    const [vaultGames, setVaultGames] = useState([]);



    const allVaults = [...coreVaults, ...listOfVaultNames]

    const handleCreateNewVault = async () => {
        await insertVault(vaultName)
        updateVaults();
    }

    const [games, setGames] = useState([]);
    useEffect(() => {
        selectGamesFromUserLibrary().then(setGames);
    }, []);

    const [lib, setLib] = useState([]);
    useEffect(() => {
        selectUserLibrary().then(setLib);
    }, [])
    const [curr, setCurr] = useState([]);
    useEffect(() => {
        selectCurrentlyPlayingGames().then(setCurr);
    }, []);
    useEffect(() => {
        console.log(`${vault}`)
        if (!coreVaults.includes(vault)) {
            selectVaultGamesByName(vault).then(setVaultGames);
        }


    }, [vault]);
    console.log(JSON.stringify(vaultGames, null, 2))
    // Filtered games based on current view **important to get the games i want
    // TODO: limit # of games returned 
    const filteredGames = games.filter((game) => {
        if (vault === "All") {
            return true;
        }
        // if (vault === "Currently Playing") return  (curr.some((currGame) => currGame.id === game.id));
        // if (vault ==="Completed"){
        //     return  curr.some((currGame) => currGame.id === game.id);
        else {
            return vaultGames.some((vaultGame) => vaultGame.id === game.id);
        }

    });



    //Combine data from two different tables //TODO: move to SBDB functions (learn)
    const mergedGames = filteredGames.map(game => {
        const libEntry = lib.find(item => item.game_id === game.id);
        return {
            ...game,
            user_rating: libEntry ? libEntry.user_rating : "N/A",
            current_playtime: libEntry ? libEntry.current_playtime : "N/A"
        };
    });
    //console.log(`${lib.current_playtime}`)
    return (
        <div className='SLB-box' style={{ display: "grid", width: '99%', gridTemplateColumns: "1fr 3fr 1fr", marginTop: '30px' }}>
            <div >
                <div style={{ height: "100vh", marginTop: "110px", marginLeft: "20px", marginRight: "20px" }}>
                    {/* <h4 >Categories</h4> */}
                    <div class="dropdown mb-3">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            Create new Vault
                        </button>
                        <div className="dropdown-menu p-2">
                            <div class="mb-1">
                                <label >Vault Name</label>
                                <input className="form-control" maxLength={30} type="text" value={vaultName} onChange={(e) => setVaultName(e.target.value)} placeholder="Vault Name" />
                                <button onClick={handleCreateNewVault} type="submit" class="btn btn-secondary">Add Vault</button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <ul className="list-group sidenavbar-custom" >

                            {vaults.map((v) => (

                                <li
                                    key={v}
                                    className={`d-flex justify-content-between align-items-center p-2 list-group-item ${vault === v.name ? "active" : ""}`}
                                    onClick={() => setVault(v.name)} // Change state on click
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="d-flex align-items-center flex-grow-0 overflow-hidden">
                                        <i class="bi bi-plus" ></i>
                                        <span className="vault-name text-truncate">
                                            {v.name}
                                        </span>

                                    </div>
                                    <span>{v.length}</span>

                                </li>

                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* Actual sidenavbar display */}
            <div style={{}}>
                <h2 style={{ display: "flex", flexWrap: "wrap", marginTop: "40px", borderBottom: "3px solid" }} className="display-6">
                    {vault} Games
                </h2>
                {/* State-Based Rendering */}
                {mergedGames.length > 0 ? (
                    <div >
                        <div >
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginLeft: '24px' }}>
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
            <div>
                <div style={{ height: "100vh", marginTop: "110px", marginLeft: "20px", marginRight: "20px" }}>
                    {/* <h4 >Categories</h4> */}
                    <div class="dropdown mb-3">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            Create new Vault
                        </button>
                        <div className="dropdown-menu p-2">
                            <div class="mb-1">
                                <label >Vault Name</label>
                                <input className="form-control" type="text" value={vaultName} onChange={(e) => setVaultName(e.target.value)} placeholder="vault name" />
                                <button onClick={handleCreateNewVault} type="submit" class="btn btn-secondary">Add Vault</button>
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
        </div>
    );
};



