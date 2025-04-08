import GameCard from "/src/components/GameCard/GameCard";
import React, { useEffect, useState } from "react";
import SideLibBar from "../components/SideLibBar/SideLibBar";
import { useParams } from 'react-router-dom';
import { fetchGames } from "../../public/data/services";
import supabase from "../../public/data/supabase/supabaseClient";
import { selectUserLibrary, selectGamesFromUserLibrary } from "../../public/data/supabase/supabaseFunctions";

const Library = () => {
    const { name } = useParams();

    return (
        
            <div >
                <div >
                    <SideLibBar
                    
                    vaultPassedName={name}
                    
                />   
                </div>
            </div>
        
    );
};
export default Library;