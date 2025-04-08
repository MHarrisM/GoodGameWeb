
import React from "react"
import UpdatesCard from "../components/UpdatesCard/UpdatesCard";
import FriendListCard from "../components/FriendListCard/FriendListCard";
import ProfileBoxCard from "../components/ProfileBoxCard/ProfileBoxCard";

const Profile = () => {
    return (

        <div style={{display:'flex', width:'100%', marginTop: '70px'}}>
            <div>
                <ProfileBoxCard></ProfileBoxCard>
                <UpdatesCard></UpdatesCard>
                <UpdatesCard></UpdatesCard>

            </div>
            
            
            <FriendListCard></FriendListCard>
            
        </div>
    );
  
};
export default Profile;


