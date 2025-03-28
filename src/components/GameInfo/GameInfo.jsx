import { useParams } from 'react-router-dom';
import { useState} from 'react';
import supabase from '../../data/supabase/supabaseClient';
import {addGameToUserLibrary} from "../../data/supabase/supabaseFunctions";
import './GameInfo.css'

function GameInfo({gameID, name, imageURL,genres, description}) {
    if(imageURL === null){
        imageURL = "/src/assets/GameImages/BC.jpg";
    }

    const handleAddGame = async () =>{
        console.log(`${gameID}`)
        await addGameToUserLibrary(gameID);
    }
    return (
        <div>

            <div className='game-info-card'>
                <div className='game-info-image-box'>
                    {imageURL && <img className='game-info-image' src={imageURL.replace("t_thumb", "t_cover_big")} alt={name} />}    
                </div>
                <div className='game-info-box'>
                    <div className='game-info-title-box'>
                        <h1 className='display-4 game-info-title' >{name}</h1>
                    </div>
                    <div className='game-info-text-box'>
                        <p className='game-info-text'>{description}</p>
                    </div>
                    <div className='game-info-extra-box'>
                        <h5>Genres:</h5>
                        <p> {genres}</p>
                    </div>
                    <div>
                        <button onClick={handleAddGame}></button>
                       
                    </div>
                </div>
            </div>
                
        </div>
    );
}

export default GameInfo;