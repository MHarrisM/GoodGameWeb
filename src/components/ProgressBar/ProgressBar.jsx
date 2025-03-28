import "./ProgressBar.css";
import React from "react"
const ProgressBar = ({completed, target}) => {
    const percentage = (completed/target) *100;
    return(
        <div className="div-progress-container">
            <div className="div-progress-bar" style={{width: `${percentage}%`}}></div>
            
        </div>
    )
}
export default ProgressBar;