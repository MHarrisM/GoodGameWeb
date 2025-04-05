import "./ChallengeCard.css"
import ProgressBar from "/src/components/ProgressBar/ProgressBar"
import React, { useEffect } from "react"
import { useData } from '../../DataContext';
import { stringify } from "postcss";
const ChallengeCard = () => {
    
    const {challenge} = useData();
    if (challenge.num_of_games === null){
        challenge.num_of_games = 0;
    }
    return(
        <div className="div-CC">
            <p style={{fontSize: "20px"}}>Game Challenge</p>
            
            <div className="div-CC-layout">
                <img src="/src/assets/GameImages/EldenRingImg.jpeg" alt="N/A" style={{gridRow: "span 2", margin: "10px 0px 20px 10px", width: "80%", borderRadius: "10px"}}></img>
                <p style={{fontSize: "40px",marginTop: "30px"}}>
                    {challenge.num_of_completed}/{challenge.num_of_games}
                </p>
                <ProgressBar completed= {challenge.num_of_completed} target= {challenge.num_of_games}></ProgressBar>
            </div>
            
        </div>
    )
}
export default ChallengeCard