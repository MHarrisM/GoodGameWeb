
import ChallengeCard from "../components/ChallengeCard/ChallengeCard";
import CurrentlyPlayingCard from "../components/CurrentlyPlayingCard/CurrentlyPlayingCard";
import VaultCard from "../components/VaultCard/VaultCard"
import RecCard from "../components/RecCard/RecCard";
import ActivityCard from "../components/ActivityCard/ActivityCard"
import ScrollCard from "../components/ScrollCard/ScrollCard"
import React, { useEffect, useState } from "react";
import { fetchGames } from "../data/services";

const Home = () => {
    const [games, setGames] = useState([]);
    useEffect(() => {
    fetchGames().then(setGames);
    }, []);
    return (
        <div className="container">
            <div className="container-1">
                <RecCard games={games} filters="Adventure" title="Adventure Games"></RecCard>
                <RecCard games={games} filters="Indie" title="Indie Games"></RecCard>  
            </div>
            <div>
                <ActivityCard></ActivityCard>
            </div>
        </div>


    );
    
    
};
export default Home;