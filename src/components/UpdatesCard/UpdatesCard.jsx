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
            <div className='comment-button-box'>
                <div class="dropdown dropend">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                        <i class="bi bi-chat-left-text-fill"></i>
                    </button>
                    <form class="dropdown-menu p-4 ">
                        <div class="mb-2 ">
                            <label for="activityCommentForm" class="form-label">Comment</label>
                            <input type="text" class="form-control" id="activityCommentForm" placeholder="Leave a comment"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Comment</button>
                    </form>
                </div>
            </div>   
        </div>
    );
};

export default UpdatesCard