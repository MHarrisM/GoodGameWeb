
import RecCard from "../components/RecCard/RecCard";
import ActivityCard from "../components/ActivityCard/ActivityCard"
import React, { useEffect, useState } from "react";
import { selectAllGames } from "../../public/data/supabase/supabaseFunctions";

const Home = () => {
    const [games, setGames] = useState([]);
    useEffect(() => {
    selectAllGames().then(setGames);
    }, []);
    return (
        <div className="container">
            <div >
                <RecCard games={games} filters="Adventure" title="Adventure Games"></RecCard>
                <RecCard games={games} filters="Strategy" title="Strategy Games"></RecCard>
                <RecCard games={games} filters="Role-playing (RPG)" title="RPG Games"></RecCard>
                <RecCard games={games} filters="Indie" title="Indie Games"></RecCard>  
                <RecCard games={games} filters="Shooter" title="Shooter Games"></RecCard> 
                <RecCard games={games} filters="Fighting" title="Fighting Games"></RecCard> 
            </div>
            <div>
                <ActivityCard></ActivityCard>
            </div>
        </div>


    );
    
    
};
export default Home;