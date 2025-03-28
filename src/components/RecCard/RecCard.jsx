import "./RecCard.css"
import ScrollCard from "../ScrollCard/ScrollCard"
import React from "react"
const RecCard = ({searchTerm, setSearchTerm,title,games, filters}) => {
     const filteredGames = games.filter((game) => {
        if (filters === "All") return true;
        if (game.genres.includes(filters)) return game;
      });
    return (
        <div className="background-card-rc" >
            <p>{title}</p>
            
            <ScrollCard games={filteredGames}></ScrollCard>
            
        </div>
    )
}
export default RecCard