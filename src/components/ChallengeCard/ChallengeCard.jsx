import "./ChallengeCard.css"
import ProgressBar from "/src/components/ProgressBar/ProgressBar"
import React from "react"
const ChallengeCard = () => {
    return(
        <div className="div-CC">
            <p style={{fontSize: "20px"}}>Game Challenge</p>
            
            <div className="div-CC-layout">
                <img src="/src/assets/GameImages/EldenRingImg.jpeg" alt="N/A" style={{gridRow: "span 2", margin: "10px 0px 20px 10px", width: "80%", borderRadius: "10px"}}></img>
                <p style={{fontSize: "40px",marginTop: "30px"}}>9/10</p>
                <ProgressBar completed= {9} target= {10}></ProgressBar>
            </div>
            
        </div>
    )
}
export default ChallengeCard