
import RecCard from "../components/RecCard/RecCard";
import ActivityCard from "../components/ActivityCard/ActivityCard"
import React, { useEffect, useState } from "react";
import { selectAllGames } from "../../public/data/supabase/supabaseFunctions";
import UpdatesCard from "../components/UpdatesCard/UpdatesCard";
import { useData } from '../DataContext';
const Home = () => {
    const {userProfile, friendActivityFeed, addActivity} = useData()
    const [games, setGames] = useState([]);
    useEffect(() => {
    selectAllGames().then(setGames);
    }, []);
   
    

    return (
        <div className="container-1" >
            <div  style={{ marginTop: '0px', display:'flex',flexWrap:'wrap-reverse',justifyContent: 'space-evenly'}}>
                

                    {friendActivityFeed.length > 0 ? (
                        
                        <div className="contain" >
                            {friendActivityFeed.map((activity) => (
                                
                                <div className="container" >
                   
                                <UpdatesCard
                                    userName = {activity.user_profile.user_name}
                                    activityId = {activity.user_id} 
                                    activityType = {activity.activity_type}
                                    activityData = {activity.activity_data}

                                    
                                ></UpdatesCard>
                                </div>
                                ))}
                        </div>
                        
                    
                    ) : (
                        <div>
                            no feed
                        </div>
                    )}
                <div>
                    <ActivityCard></ActivityCard>
                </div>
            </div>
            
            
        </div>


    );
    
    
};
export default Home;