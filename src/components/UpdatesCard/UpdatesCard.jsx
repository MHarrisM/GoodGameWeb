import '../UpdatesCard/UpdatesCard.css'
import UpdateContentCard from '../UpdatesCard/UpdateContentCard'
import { Link} from "react-router-dom";
const UpdatesCard = ({userName, activityId ,activityType, activityData}) => {
    const activityData_1 = activityData.map(item => item.id)
    const activityData_3 = activityData.map(item => item.name)
    return (
        <div className='updates-box'>
            <div className='updates-type'>
                <a href='#'>{userName}</a> {activityType} <Link to={`/game/${activityData_1}`}>{activityData_3}</Link>  
                
                </div>
            <div className='updates-etime'></div>
            <div className='content-box'>
                <UpdateContentCard activityData={activityData} ></UpdateContentCard>
                {/* <div>comment</div> */}
            </div>
            
            
                {/* <div className='comment-bar-button-box'>
                    <button className='updates-comment-btn'>Comment</button>
                    <input className='updates-comment-input'></input>
                </div>  */}
                
            
            
        </div>
    );
};

export default UpdatesCard