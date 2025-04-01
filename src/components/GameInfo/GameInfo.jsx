import { useParams } from 'react-router-dom';
import { useState} from 'react';
import supabase from '../../../public/data/supabase/supabaseClient';
import {deleteGameFromUserLibrary, insertGameToUserLibrary, insertGameToVault} from "../../../public/data/supabase/supabaseFunctions";
import React from "react"
import './GameInfo.css'
import { useData } from '../../DataContext';

function GameInfo({gameID, name, imageURL,genres, description, inUserLibrary, userVaults, userVaultGames}) {
    if(imageURL === null){
        imageURL = "/src/assets/GameImages/BC.jpg";
    }
    const {library,isInLibrary,vaults } = useData();
    const gid = gameID
    //if game exists in library then set button show In Library else Add to Library, passed as prop inUserLibrary
    const [isInUserLibrary, setIsInLibrary] = useState(inUserLibrary)
    
    const handleClick = async () =>{
        if(isInUserLibrary ){
            await deleteGameFromUserLibrary(gid);
            alert(`Game removed from library`)
        }else{
            await insertGameToUserLibrary(gid);
            alert(`Game added to library`)
        }
        setIsInLibrary(!isInUserLibrary)
    }

    const handleDropdownClick = async (vaultName) => {
        if(isInUserLibrary){
            insertGameToVault(gid, vaultName)
            alert (`Game added to Vault`)
        }else{
            await insertGameToUserLibrary(gid);
            await insertGameToVault(gid, vaultName)
            alert(`Game added to library and vault`)
        }
        
    }
    



    return (
        
            <div className='game-info-card'>
                <div className='game-info-image-box'>
                    <div className='game-info-image-sticky-div'>
                        {imageURL && <img className='game-info-image' src={imageURL.replace("t_thumb", "t_cover_big")} alt={name} />}
                        <div class="btn-group " role="group" aria-label="Button group with nested dropdown">            
                            <div class="btn-group dropend" role="group">
                                <button onClick={handleClick} type="button" class="btn btn-primary" >{isInUserLibrary ? "In your Library" : "Add Game to Library"}</button>
                                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu">
                                    {vaults.map((vault) => (
                                        <li key={vault.id}>
                                            <a className="dropdown-item" onClick={() => handleDropdownClick(vault.name)} href="#">
                                                {vault.name}  
                                            </a>
                                        </li>
                                    ))}
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
                
        
    );
}

export default GameInfo;