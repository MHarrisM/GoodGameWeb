
import React, { act } from "react"

import FriendListCard from "../components/FriendListCard/FriendListCard";
import ProfileBoxCard from "../components/ProfileBoxCard/ProfileBoxCard";
import UpdatesCard from "../components/UpdatesCard/UpdatesCard";
import { useData } from '../DataContext';
const Profile = () => {
    const {userProfile, activityFeed, addActivity} = useData()
    //console.log(JSON.stringify(activityFeed, null, 2))
 
    return (

        <div style={{display:'flex', width:'80vw', marginTop: '70px',outlineColor:'white',maxWidth: '1000px'}}>
            <div style={{outlineColor: 'orange', maxWidth: '1000px'}}>
                <ProfileBoxCard sentUserProfile = {userProfile}></ProfileBoxCard>
                {activityFeed.length > 0 ? (
                    <div className="updates-container">
                        {activityFeed.map((activity) => (
                            <UpdatesCard
                                userName = {userProfile.user_name}
                                activityId = {activity.user_id} 
                                activityType = {activity.activity_type}
                                activityData = {activity.activity_data}
                            ></UpdatesCard>
                            ))}
                    </div>
                    
                   
                ) : (
                    <div>
                        no feed
                    </div>
                )}
            </div>
            <FriendListCard userProfile = {userProfile}></FriendListCard>
            
        </div>
    );
  
};
export default Profile;


