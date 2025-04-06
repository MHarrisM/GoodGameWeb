
import React from "react"
import UpdatesCard from "../components/UpdatesCard/UpdatesCard";

const Profile = () => {
    return (

        <div style={{backgroundColor: 'black', width:'100%'}}>
            <UpdatesCard></UpdatesCard>
            <ul><li>user_friend_list</li></ul>
            <p>user_updates</p>
        </div>
    );
  
};
export default Profile;


