import { createContext, useContext, useEffect, useState } from "react";
import { 
    selectUserLibrary, 
    selectVaults, 
    selectVaultGamesById, 
    selectGameById, 
    selectUserChallenge,
    deleteVault
} from "../public/data/supabase/supabaseFunctions"


const DataContext = createContext();

export function DataProvider ({children}) {
    const [game, setGame] = useState(null);
    const [vaults, setVaults] = useState([]);
    const [vaultGames, setVaultGames] = useState([]);
    const [library, setLibrary] = useState([]);
    const [challenge, setChallenge] = useState([]);



    //--------------------Library Functions--------------------

    //Get user Library
    const updateLibrary = async () =>{
        await selectUserLibrary().then(setLibrary);
    }
    useEffect( () => {
       selectUserLibrary().then(setLibrary);
    }, []);
    console.log(JSON.stringify(library));
    // Helper function to check if a game is in the library
    const isInLibrary = (gameId) => {
        return library.some(item => item.game_id === gameId);
    };
    
    //--------------------Vault Functions--------------------

    // Fetch Vaults
    const updateVaults = async () =>{
        await selectVaults().then(setVaults);
    }
    useEffect(() => {
        selectVaults().then(setVaults);
    }, []);

    // Fetch Vault Games by Vault ID
    const selectVaultGames = (vaultId) => {
        selectVaultGamesById(vaultId).then(setVaultGames);
    };
    const deleteVaultById = async (vaultId) =>{
        await deleteVault(vaultId);
        
    };
    // Fetch Game by ID
    const selectGame = (gameId) => {
        selectGameById(gameId).then(setGame);
    };
    //--------------------Challenge Functions--------------------
    useEffect(() => {
        // getChallenge();
        selectUserChallenge().then(setChallenge);
    },[]);


    return (
        <DataContext.Provider value={{
            game,vaults,vaultGames,challenge,library,
            selectGame,selectVaultGames,
            isInLibrary,deleteVaultById,updateVaults,updateLibrary
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData(){
    return useContext(DataContext);
}
