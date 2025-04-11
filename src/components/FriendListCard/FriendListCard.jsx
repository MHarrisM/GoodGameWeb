import '../FriendListCard/FriendListCard.css'
import { useData } from '../../DataContext';
import React, { useEffect, useState } from "react";
const FriendListCard = ({userProfile}) => {
    const [friend, setFriend] = useState('')
    const {addFriend, setRequestStatus, fetchUserProfile} = useData()
    
    const [friendListName, setFriendListName] = useState([])
    
    
    const handleAddFriend = async() => {
        await addFriend(friend, 'pending');
    }
    const handleAcceptRequest = async(requester, statusSent) => {
        await setRequestStatus(requester.id,statusSent);
        if(statusSent == 'accepted'){
            await addFriend(requester.user_name,'accepted')
        }
        await fetchUserProfile();
    } 
    
    return(
        <div className='friend-list-box'>
            <span style={{fontSize: '1.5vw'}}>Friends</span>
            <div class="dropdown mb-3">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                        
                    </button>
                <div className="dropdown-menu p-2">
                    <div className="mb-1">
                        <label className='addfriend-dropdown-item' >Add a Friend</label>
                        <input className="form-control addfriend-dropdown-item" maxLength={30} type="text" value={friend} onChange={(e) => setFriend(e.target.value)} placeholder="Search for a friend by Email" />
                        <button onClick={handleAddFriend} type="submit" className="btn btn-secondary addfriend-dropdown-item">Add Vault</button>
                    </div>
                </div>
            </div>



            {userProfile?.friend_profile?.length > 0 ? (
                <ul className='friend-list'>

                    <li className='friend-list-item'>


                        {userProfile.friend_profile.map((friendl) => (
                            <div >
                                <img className='friend-profile-pic' src='GoodGameWeb/src/assets/GameImages/HollowKnightImg.jpeg'></img>
                                <a className='friend-profile-name' href='#'>{friendl.user_name}</a>
                            </div>
                        ))}

                    </li>

                </ul>
            ) : (
                <p>No Friends :/</p>
            )}
            <div style={{border: "1px solid gray", width: "100%"}}></div>

            {userProfile?.request_profile?.length > 0 ? (
                <ul className='friend-list'>

                    <li className='friend-list-item'>


                        {userProfile.request_profile.map((friendr) => (
                            <div >
                                <img className='friend-profile-pic' src='GoodGameWeb/src/assets/GameImages/HollowKnightImg.jpeg'></img>
                                <a className='friend-profile-name' href='#'>{friendr.user_name}</a>
                                <button onClick={() => handleAcceptRequest(friendr,'accepted')}>Accept</button>
                                <button onClick={() => handleAcceptRequest(friendr,'rejected')}>Cancel</button>
                            </div>
                        ))}





                    </li>

                </ul>
            ) : (
                <p>No Friend Request!</p>
            )}
        </div>
    );
};
export default FriendListCard;