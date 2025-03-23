import "./ChallengeCard.css"
import ProgressBar from "/src/components/ProgressBar/ProgressBar"
const ChallengeCard = () => {
    return(
        <div className="div-CC">
            <text style={{fontSize: "20px"}}>Game Challenge</text>
            
            <div className="div-CC-layout">
                <img src="/src/assets/GameImages/EldenRingImg.jpeg" alt="N/A" style={{gridRow: "span 2", margin: "10px 0px 20px 10px", width: "80%", borderRadius: "10px"}}></img>
                <text style={{fontSize: "40px",marginTop: "30px"}}>9/10</text>
                <ProgressBar completed= {9} target= {10}></ProgressBar>
            </div>
            
        </div>
    )
}
export default ChallengeCard