import "./ChallengeCard.css"
import ProgressBar from "/src/components/ProgressBar/ProgressBar"
import React, { useEffect } from "react"
import { useData } from '../../DataContext';
import { stringify } from "postcss";

const ChallengeCard = () => {
    
    const {challenge} = useData();

    return(
        <div className="div-CC">
            <p style={{fontSize: "20px"}}>Game Challenge</p>
            
            {challenge === null ? (
                <div className="div-CC-layout">
                <img src="GoodGameWeb/src/assets/GameImages/BC.jpeg" alt="N/A" style={{gridRow: "span 2", margin: "10px 0px 20px 10px", height:'180px',width: "120px", borderRadius: "10px"}}></img>
                <p style={{fontSize: "40px",marginTop: "30px"}}>
                    {challenge.num_of_completed}/{challenge.num_of_games}
                </p>
                <ProgressBar completed= {challenge.num_of_completed} target= {challenge.num_of_games}></ProgressBar>
                </div>
            ):(
                <div>No Challenges</div>
            )}
           
            
        </div>
    )
}
export default ChallengeCard