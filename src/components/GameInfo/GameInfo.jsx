import { useParams } from 'react-router-dom';
import { useState} from 'react';
import supabase from '../../../public/data/supabase/supabaseClient';
import {deleteGameFromUserLibrary, insertGameToUserLibrary} from "../../../public/data/supabase/supabaseFunctions";
import React from "react"
import './GameInfo.css'

function GameInfo({gameID, name, imageURL,genres, description, inUserLibrary, userVaults, userVaultGames}) {
    if(imageURL === null){
        imageURL = "/src/assets/GameImages/BC.jpg";
    }
    const [isInUserLibrary, setIsInLibrary] = useState(inUserLibrary)
    const gid = gameID
    const handleAddGame = async () =>{
        if(isInUserLibrary){
            await deleteGameFromUserLibrary(gid);
            alert(`Game removed from library`)
        }else{
            await insertGameToUserLibrary(gid);
            alert(`Game added to library`)
        }
        setIsInLibrary(!isInUserLibrary)
    }
    return (
        <div>
            <div className='game-info-card'>
                <div className='game-info-image-box'>
                    <div className='game-info-image-sticky-div'>
                        {imageURL && <img className='game-info-image' src={imageURL.replace("t_thumb", "t_cover_big")} alt={name} />}
                        <div class="btn-group " role="group" aria-label="Button group with nested dropdown">
                            <button  onClick={handleAddGame} type="button" class="btn btn-primary" >{isInUserLibrary ? "In your Library" : "Add Game to Library"}</button>   
                                                    
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Dropdown link</a></li>
                                    <li><a class="dropdown-item" href="#">Dropdown link</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
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
                    
                </div>
            </div>
                
        </div>
    );
}

export default GameInfo;