import '../ProfileBoxCard/ProfileBoxCard.css'
import { useData } from '../../DataContext';
const ProfileBoxCard = ({sentUserProfile}) => {

    return (
        <div className="top-info-box">
            <div className='top-profile-pic'>
                <img src="GoodGameWeb/src/assets/GameImages/HollowKnightImg.jpeg" alt="profile_pic"/>
            </div>
            <div className='top-ub'>
                <div className='top-username'>
                    <h3 >{sentUserProfile.user_name}</h3>
                </div>
                <div className='top-bio'>
                    <p>
                        {sentUserProfile.user_bio}
                    </p>
                </div>
            </div>
        
            
            
        </div>
    )
};

export default ProfileBoxCard