import { createContext, useContext, useEffect, useState } from "react";
import { 
    selectUserLibrary, 
    selectVaults, 
    selectVaultGamesById, 
    selectGameById, 
    selectUserChallenge,
    deleteVault,
    insertFriendToList,
    selectFriendsList,
    selectFriendRequest,
    selectUserProfile,
    alterFriendStatus,
    selectActivityFeed,
    insertActivityFeed,
    selectFriendActivityFeed
} from "../public/data/supabase/supabaseFunctions"


const DataContext = createContext();

export function DataProvider ({children}) {
    const [game, setGame] = useState(null);
    const [vaults, setVaults] = useState([]);
    const [vaultGames, setVaultGames] = useState([]);
    const [library, setLibrary] = useState([]);
    const [challenge, setChallenge] = useState([]);
    const [friend, setFriend] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [friendsRequest, setFriendsRequest] = useState([]);
    const [userProfile, setUserProfile] = useState([]);
    const [activityFeed, setActivityFeed] = useState([]);
    const [friendActivityFeed, setFriendActivityFeed] = useState([]);
    


    //--------------------Library Functions--------------------

    //Get user Library
    const updateLibrary = async () =>{
        await selectUserLibrary().then(setLibrary);
    }
    useEffect( () => {
       selectUserLibrary().then(setLibrary);
    }, []);
    //console.log(JSON.stringify(library));
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
    //--------------------Friend Functions--------------------
    // useEffect(() =>{
    //     selectFriendsList().then(setFriendsList)
    // },[]);
    useEffect(() =>{
        selectFriendRequest().then(setFriendsRequest)
    },[]);
    const addFriend = async (friend_email, status) => {
       await insertFriendToList(friend_email,status).then(setFriend);
    };
    const setRequestStatus = async (requesterId,status_sent) => {
        await alterFriendStatus(requesterId,status_sent);
     };
    //--------------------UserProfile Functions--------------------

    const fetchUserProfile = async () => {
        await selectUserProfile().then(setUserProfile)
    };
    useEffect(() =>{
        fetchUserProfile();
    },[]);

    //--------------------ActivityFeed Functions--------------------
    const fetchActivityFeed = async () => {
        await selectActivityFeed().then(setActivityFeed)
    }
    useEffect( ()=> {
        fetchActivityFeed();
        
    },[]);

    const addActivity = async (activity_type, activity_data) => {
        await insertActivityFeed(activity_type, activity_data);
    };

    const fetchFriendActivityFeed = async () =>  {
        await selectFriendActivityFeed().then(setFriendActivityFeed)

    }
    useEffect(() => {
        fetchFriendActivityFeed();

    },[]);









    return (
        <DataContext.Provider value={{
            game,vaults,vaultGames,challenge,library,
            friendsList,friendsRequest,userProfile,activityFeed,
            friendActivityFeed,
            selectGame,selectVaultGames,
            isInLibrary,deleteVaultById,updateVaults,updateLibrary,
            addFriend, setRequestStatus,fetchUserProfile,fetchActivityFeed,
            fetchFriendActivityFeed
            ,addActivity
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData(){
    return useContext(DataContext);
}
