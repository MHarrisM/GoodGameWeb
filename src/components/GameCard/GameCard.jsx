import React, { useState,useEffect} from 'react'
import "./GameCard.css";
import { Link, useParams } from "react-router-dom";
import PopupCard from '../PopupCard/PopupCard';
import { fetchSingleGame } from "/src/assets/services.js";

//TO DO: Figureout how to dynamically change font size for larger game titles*********
const GameCard = ({gameID,image, name, score, playtime, variant = "large"}) => {  
    const [cscore, setScore] = useState(score); 
    const [cplaytime, setPlaytime] = useState(playtime);
    const [isEditing, setIsEditing]  = useState(false);
    const [isPTEditing, setIsPTEditing] = useState(false);
    if(image === null){
        image = "/src/assets/GameImages/BC.jpg";
    }
    

    return(
        
        <div key={gameID} className = "game-card"> 
            <Link to={`/game/${gameID}`}>
                <img src={image} alt={name} className={`game-image ${variant}`}/>
            </Link>
            {variant === "extralarge" ? (
                <div>
                    <div className={`game-nametab ${variant}`}> 
                        <h2 className={`game-name ${variant}`}>{name}</h2>
                    </div>
                </div>
            ):(
            <div className='game-info'>
                <div className={`game-nametab ${variant}`}> 
                    <h2 className={`game-name ${variant}`}>{name}</h2>
                </div>
                <div className='game-tab'>
                    <p className="game-score" onClick={() => setIsEditing(true)}>{cscore}%</p>
                    {isEditing && (
                        <PopupCard 
                            parameter={"Score"}
                            currentVal= {cscore} 
                            onSave={(newScore) => {
                                setScore(newScore);
                                score = newScore;
                                setIsEditing(false);
                            }}
                            onCancel= {() => setIsEditing(false)} 
                            
                            />
                            )}
                </div>
                <div className="game-tab">
                    <p className="game-playtime" onClick={() => setIsPTEditing(true)}>{cplaytime} hrs</p>
                    {isPTEditing && (
                        <PopupCard 
                            parameter={"Playtime"}
                            currentVal={cplaytime} 
                            onSave={(newPlaytime) => {
                                
                                setPlaytime(newPlaytime);
                                setIsPTEditing(false);
                            }}
                            onCancel= {() => setIsPTEditing(false)} 
                            
                            />
                            )}
                </div>
            </div>
        )}

            
            
            

            
        </div>
    )

}
export default GameCard