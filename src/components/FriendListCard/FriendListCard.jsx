import '../FriendListCard/FriendListCard.css'
import { useData } from '../../DataContext';
import React, { useEffect, useState } from "react";
const FriendListCard = () => {
    const [friend, setFriend] = useState('')
    const {addFriend, friendsList} = useData()
    const handleAddFriend = async() => {
        await addFriend(friend);
    }
    console.log(JSON.stringify(friendsList,null,2))
    return(
        <div className='friend-list-box'>
            <span style={{fontSize: '1.5vw'}}>user_friend_list</span>
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
            {friendsList.length > 0 ? (
            <ul className='friend-list'>
            
                <li className='friend-list-item'>
                    
                        
                            {friendsList.map((friendl)=>(
                                <div >
                                    <img className='friend-profile-pic' src='GoodGameWeb/src/assets/GameImages/HollowKnightImg.jpeg'></img>
                                    <a className='friend-profile-name' href='#'>{friendl.user_name}</a>
                                </div>  
                            ))}
                        
                    
                  
                    
                    
                </li>
                  
            </ul>
            ):(
                <p>No Friends :/</p>
            )}
        </div>
    );
};
export default FriendListCard;