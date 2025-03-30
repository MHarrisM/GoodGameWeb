import { createContext, useContext, useEffect, useState } from "react";
import { 
    selectUserLibrary, 
    selectVaults, 
    selectVaultGamesById, 
    selectGameById 
} from "../public/data/supabase/supabaseFunctions"


const DataContext = createContext();

export function DataProvider ({children}) {
    const [game, setGame] = useState(null);
    const [vaults, setVaults] = useState([]);
    const [vaultGames, setVaultGames] = useState([]);
    const [library, setLibrary] = useState([]);




    //--------------------Library Functions--------------------

    //Get user Library
    useEffect(() => {
        selectUserLibrary().then(setLibrary);
    }, []);
    // Helper function to check if a game is in the library
    const isInLibrary = (gameId) => {
        return library.some(item => item.game_id === gameId);
    };
    
    //--------------------Vault Functions--------------------

    // Fetch Vaults
    useEffect(() => {
        selectVaults().then(setVaults);
    }, []);

    // Fetch Vault Games by Vault ID
    const selectVaultGames = (vaultId) => {
        selectVaultGamesById(vaultId).then(setVaultGames);
    };

    // Fetch Game by ID
    const selectGame = (gameId) => {
        selectGameById(gameId).then(setGame);
    };









    return (
        <DataContext.Provider value={{
            game,vaults,vaultGames,library,
            selectGame,selectVaultGames,
            isInLibrary
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData(){
    return useContext(DataContext);
}
