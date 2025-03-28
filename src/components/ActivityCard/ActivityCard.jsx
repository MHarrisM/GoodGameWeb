import ChallengeCard from "/src/components/ChallengeCard/ChallengeCard";
import CurrentlyPlayingCard from "/src/components/CurrentlyPlayingCard/CurrentlyPlayingCard";
import VaultCard from "/src/components/VaultCard/VaultCard"
import "./ActivityCard.css"
import React from "react"
const ActivityCard = () => {
    return(
        <div style={{display: "flex", flexDirection: "column",alignItems: "flex-end"}}>
            <div className="div-container">
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