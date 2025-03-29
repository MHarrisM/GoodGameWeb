import ChallengeCard from "/src/components/ChallengeCard/ChallengeCard";
import CurrentlyPlayingCard from "/src/components/CurrentlyPlayingCard/CurrentlyPlayingCard";
import VaultCard from "/src/components/VaultCard/VaultCard"
import "./ActivityCard.css"
import SearchBar from "/src/components/SearchBar/SearchBar"
import React, {useState} from "react"
import { insertGameToUserLibrary, selectCurrentlyPlayingGames } from "../../../public/data/supabase/supabaseFunctions";
const ActivityCard = () => {
     const [searchTermCPC, setSearchTermCPC] = useState("");
    const handleGameSelect = (game) => {
        insertGameToUserLibrary(game.id);
        alert(`Adding ${game.name} to Library!`);
    };
    return(
        <div style={{display: "flex", flexDirection: "column",alignItems: "flex-end"}}>
            <div className="div-container">
                <div className="text-title">
                    <SearchBar searchTerm={searchTermCPC} setSearchTerm={setSearchTermCPC} onSelect={handleGameSelect}> </SearchBar>    
                </div>
                <CurrentlyPlayingCard></CurrentlyPlayingCard> 
                <div style={{border: "1px solid gray", width: "98%"}}></div>
                <ChallengeCard></ChallengeCard>
                <div style={{border: "1px solid gray", width: "98%"}}></div>
                <VaultCard></VaultCard>
            </div>
        </div>
        
    )
}
export default ActivityCard;