import '../UpdatesCard/UpdatesCard.css'
import UpdateContentCard from '../UpdatesCard/UpdateContentCard'

const UpdatesCard = () => {
    return (
        <div className='updates-box'>
            <div className='updates-type'>type_of_update</div>
            <div className='updates-etime'>elapsed_time</div>
            <div className='content-box'>
                <UpdateContentCard ></UpdateContentCard>
                <div>comment</div>
            </div>
            
            
                <div className='comment-bar-button-box'>
                    <button className='updates-comment-btn'/>
                    <input className='updates-comment-input'></input>
                </div> 
                
            
            
        </div>
    );
};

export default UpdatesCard