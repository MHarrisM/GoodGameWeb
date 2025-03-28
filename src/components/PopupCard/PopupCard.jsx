import React,{ useState } from "react";
import "./PopupCard.css";

const PopupCard = ({parameter,currentVal, onSave, onCancel}) =>{

    const [tempVal, setTempVal] = useState(currentVal);
    // const [tempPT, setTempPT] = useState(currentPlaytime);


    return (
        <div>
            
            <div className="div-popup-card">
                <h3>Edit {parameter}</h3>
             
                <input
                    type="number"
                    value={tempVal}
                    onChange={(e) => setTempVal(e.target.value)}
                />
                <button onClick={() => onSave(tempVal)}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
            
        </div>
            
    );
};
export default PopupCard;