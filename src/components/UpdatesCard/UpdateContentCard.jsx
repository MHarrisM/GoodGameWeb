import GameCard from '../GameCard/GameCard';
import '../UpdatesCard/UpdatesCard.css'

const UpdatesCard = ({activityData}) => {
    //console.log(JSON.stringify(activityData,null,2))
    const activityData_1 = activityData.map(item => item.id)
    const activityData_2 = activityData.map(item => item.img)
    return (
        
            <div style={{display:'flex',flex:'auto'}}>
                {/* <img className='content-pic' src={`${activityData_2}`} alt='pic_of_game'></img>
                <p>{activityData_1}</p> */}
                <GameCard
                    variant='small'
                    key={activityData_1}
                    gameID={activityData_1}
                    image = {activityData_2}
                ></GameCard>
            </div>
            

        
    );
};

export default UpdatesCard