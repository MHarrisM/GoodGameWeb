import supabase from "./supabaseClient"
//Should have separate function files?? how to separate??
//if select added at the end of an insert, will return that query



//-----------------------------user DB-----------------------------
export const createProfile = async (id) =>{
    const { data, error } = await supabase
        .from('user_profile')
        .insert(
            {id: user.id}
        );
        if (error){
            console.error("Couldn't create profile")
        }else{
            console.error("Profile Created!")
        }
};

//-----------------------------games DB-----------------------------
export const selectAllGames = async () => {
    try {
      const { data, error } = await supabase
        .from('games')
        .select();
        
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      console.error("Error fetching games from DB:", error);
      return [];
    }
};
export const selectGameById = async (id) => {
    const { data: [game], error } = await supabase
    .from('games')
    .select()
    .eq('id', id)
    //console.log(JSON.stringify(game, null, 2));
    return game;
};


//-----------------------------library DB-----------------------------
export const selectUserLibrary = async () => {
    const {data: {user}} = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('library')
    .select()
    .eq('user_id', user.id)

    if (error){
        console.error("Couldn't get library")
    }else{
        console.error("Library retrieved!")
        //console.log(JSON.stringify(data, null, 2));
        //console.log(JSON.stringify(user.id,null,2));
        return data;
    }
};
export const selectGamesFromUserLibrary = async () => {
    // const {data: {user}} = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('library')
    .select('game_id')
    .eq('user_id', user.id)

    if (error){
        console.error("Couldn't get games from library")
    }else{
        console.error("Games from library retrieved!")
    }
    const gameIDs = data.map(item=>item.game_id)
    const {data: gamesData, error: gamesError} = await supabase
        .from('games')
        .select()
        .in('id',gameIDs)
    // console.log(JSON.stringify(gamesData,null,2))
    return gamesData;
};
export const selectLibGameById = async () => {};//TODO (might not need)
export const insertGameToUserLibrary = async (game_id) => {
    const {data: {user}} = await supabase.auth.getUser();
    console.log(`${user.id}`)
    const { data, error } = await supabase
        .from('library')
        .insert(
            {user_id: user.id, game_id: game_id}
        );
        if (error){
            console.error("Couldn't add game to library")
        }else{
            console.error("Game Added to Library!")
        }

};
export const updateUserGameScore = async (game_id, user_rating) =>{
    const {data: {user}} = await supabase.auth.getUser();
    const { data, error } = await supabase
        .from('library')
        .update({user_rating: user_rating})
        .eq('game_id',game_id)
        .eq('user_id', user.id);
        if (error){
            console.error("Couldn't update Rating")
        }else{
            console.error("Rating updated !")
        }
};
export const updateUserGamePlaytime = async (game_id, current_playtime) =>{
    const {data: {user}} = await supabase.auth.getUser();
    const { data, error } = await supabase
        .from('library')
        .update({current_playtime: current_playtime})
        .eq('game_id',game_id)
        .eq('user_id', user.id);
        if (error){
            console.error("Couldn't update Playtime")
        }else{
            console.error("Playtime updated !")
        }
};
export const deleteGameFromUserLibrary = async (game_id) => {
    const {data: {user}} = await supabase.auth.getUser();
    console.log(`${user.id}`)
    const { data, error } = await supabase
        .from('library')
        .delete()
        .eq('user_id', user.id)
        .eq('game_id', game_id)
        if (error){
            console.error("Couldn't remove from library")
        }else{
            console.error("Game Removed from Library!")
        }
};
export const selectCurrentlyPlayingGames = async() => {
    const {data: {user}} = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('library')
    .select()
    .eq('user_id', user.id)

    if (error){
        console.error("Couldn't get currently playing")
    }else{
        console.error("Currently Playing Retrieved!")
    }
    const libGameIds = data.filter(item => item.iscurrentlyplaying === true).map(item=>item.game_id)
    // console.log(JSON.stringify(data, null, 2));
    // console.log(JSON.stringify(libGameIds, null, 2));
    const {data: currentlyPlayingGames, error:gameError} = await supabase
        .from('games')
        .select()
        .in('id',libGameIds)
    //console.log(JSON.stringify(currentlyPlayingGames, null, 2));    
    return currentlyPlayingGames; 
};


//-----------------------------vaults DB-----------------------------
export const selectVaults = async () => {
    const {data: {user}} = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('vaults')
    .select()
    .eq('user_id', user.id)

    if (error){
        console.error("Couldn't get vaults")
    }else{
        console.error("Vaults retrieved!")
    }
    // console.log(JSON.stringify(data, null, 2));
    return data;

};
export const insertVault = async(name) =>{
    console.log(`${name}`)
    const {data: {user}} = await supabase.auth.getUser();
    const {data, error} = await supabase
    .from('vaults')
    .insert(
        {user_id: user.id, name: name}
    )
    
    console.log(JSON.stringify(name, null,2 ))
}
export const deleteVault = async(id) => {
    const {data: {user}} = await supabase.auth.getUser();
    console.log(`${user.id}`)
    const { data, error } = await supabase
        .from('vaults')
        .delete()
        .eq('user_id', user.id)
        .eq('id', id)
        if (error){
            console.error("Couldn't delete Vault")
        }else{
            console.error("Vault Deleted!")
        }
};


//-----------------------------vaults_games DB-----------------------------
export const selectVaultGamesById = async(vault_id) => {
    const {data: {user}} = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('vaults')
    .select('id')
    .eq('user_id', user.id);
    // console.log(JSON.stringify(data, null, 2));
    const vaultIDs = data.map(item=>item.id)
    const {data: vaultData, error: gamesError} = await supabase
        .from('vault_games')
        .select('game_id')
        .eq('vault_id',vaultIDs)
    // console.log(JSON.stringify(vaultData, null, 2));
    const gameIDs = vaultData.map(item=>item.game_id)
    const {data: vaultGameData, error: vaultGameError} = await supabase
        .from('games')
        .select('')
        .eq('id',gameIDs)
    // console.log(JSON.stringify(vaultGameData, null, 2));
    return vaultGameData;
};//TODO: Fix
export const selectVaultGamesByName = async(name) => {
    const {data: {user}} = await supabase.auth.getUser();
    const {data: vaultGameData, error } = await supabase
        .from('vaults')
        .select(`
            id, 
            vault_games(vault_id,game_id, games(*))
        `)
        .eq('user_id', user.id)
        .eq('name', name)
        .single(); // Fetch only one vault
    //console.log(JSON.stringify(vaultGameData, null, 2));
    if (error) {
        console.error("Error fetching games:", error);
        return [];
    };

    // Extracting game details
    const games = vaultGameData?.vault_games?.map(entry => entry.games) || [];
    //console.log(JSON.stringify(games, null, 2));
    return games;

    // --------------Below code does the same as above, but three calls to DB, above 1 joined call

    // const { data, error } = await supabase
    // .from('vaults')
    // .select('id')
    // .eq('user_id', user.id)
    // .eq('name',name)
    
    // const vaultId = data.map(item=>item.id)
    // // console.log(JSON.stringify(vaultId, null, 2));
    // const {data: vaultData, error: gamesError} = await supabase
    //     .from('vault_games')
    //     .select('game_id')
    //     .eq('vault_id',vaultId)
        
    // // console.log(JSON.stringify(vaultData, null, 2));
    // const gameIDs = vaultData.map(item=>item.game_id)
    // const {data: vaultGameData, error: vaultGameError} = await supabase
    //     .from('games')
    //     .select()
    //     .in('id',gameIDs)   //'in' and not 'eq', somethign to do with SB can interpret Ids well but not int
    //                         //  so return as Array of string as oppose to individual. Research later.

    //     // console.log(JSON.stringify(vaultGameData, null, 2));
    // return vaultGameData;

    
};//TODO: Fix (Fixed - only one joined call being made as oppose to 3 separate calls)
export const selectVaultGameCount = async() =>{

}
export const insertGameToVault = async(game_id, name) => {
    const {data: {user}} = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('vaults')
    .select('id')
    .eq('user_id', user.id)
    .eq('name', name)
    .single();
    console.log(JSON.stringify(data, null, 2));
    // const vaultId = data.map(item=>item.id)
    const {data: vaultData, error: gamesError} = await supabase
    .from('vault_games')
    .insert(
        {user_id:user.id,vault_id: data.id, game_id: game_id}
    )
    console.log(JSON.stringify(vaultData, null, 2));
};

export const deleteGameInVault = async (game_id, name) =>{
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return { error: userError || 'No user found' };
  
    const { data: vault, error: vaultError } = await supabase
      .from('vaults')
      .select('id')
      .eq('user_id', user.id)
      .eq('name', vaultName)
      .single();
  
    if (vaultError || !vault) return { error: vaultError || 'Vault not found' };
  
    
    const { error: deleteError } = await supabase
      .from('vault_games')
      .delete()
      .eq('vault_id', vault.id)
      .eq('game_id', game_id);
  
    if (deleteError) return { error: deleteError };  
    return { success: true };

};


//user_completed_games (Upd; table dropped, everything is a vault, with unique bool saying if its core
// or special vault)

export const selectUserCompletedGames = async() => {
    const {data: {user}} = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('user_completed_games')
    .select()
    .eq('user_id', user.id)

    if (error){
        console.error("Couldn't retrieve Completed Games")
    }else{
        console.error("Retrieved Completed Games!")
    }
    return data;
};
export const insertUserCompletedGame = async(game_id) => {
    const {data: {user}} = await supabase.auth.getUser();
    const {data, error} = await supabase
    .from('user_completed_games')
    .insert(
        {user_id: user.id},
        {game_id: game_id}
    )
    if (error){
        console.error("Couldn't INSERT Completed Game")
    }else{
        console.error("Completed Game INSERTED!")
    }
    
};
export const deleteUserCompletedGame = async(game_id) => {
    const {data: {user}} = await supabase.auth.getUser();
    const {data, error} = await supabase
    .from('user_completed_games')
    .delete()
    .eq('user_id', user.id)
    .eq('game_id', game_id);
    if (error){
        console.error("Couldn't Delete Completed Game")
    }else{
        console.error("Completed Game DELETED!")
    }
};


//-----------------------------challenges DB-----------------------------
export const selectUserChallenge = async() => {
    const {data: {user}} = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('challenges')
    .select()
    .eq('user_id', user.id)
    .single();
    if (error){
        console.error("Couldn't retrieve Challenge")
    }else{
        console.error("Retrieved Challenge!")
    }
    if(data.length <= 0 || data.length ===null){
        return 'empty';
    }

    //console.log(JSON.stringify(data, null, 2));
    return data;
}; //Might not need?
export const insertUserChallenge = async(num_of_games) => {
    const {data: {user}} = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('challenges')
    .insert(
        {user_id: user.id, year: 2025,num_of_games: num_of_games},    
    )
    if (error){
        console.error("Couldn't create challenge")
    }else{
        console.error("Challenge created!")
    }

};
export const selectNumOfGames = async() =>{
    const {data: {user}} = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('challenges')
    .select(num_of_games)
    if (error){
        console.error("Couldn't create challenge")
    }else{
        console.error("Challenge created!")
    }
    
};
export const deleteUserChallenge= async() => {
    const {data: {user}} = await supabase.auth.getUser();
    const {data, error} = await supabase
    .from('user_completed_games')
    .delete()
    .eq('user_id', user.id)
    .eq('game_id', game_id);
    if (error){
        console.error("Couldn't INSERT Completed Game")
    }else{
        console.error("Completed Game INSERTED!")
    }
};

//-----------------------------friends_list DB-----------------------------
export const insertFriendToList = async (friendName) => {
    const {data: {user}} = await supabase.auth.getUser();
    const { data: friendData, error: friendLookupError } = await supabase
    .from('user_profile') // or 'auth.users' if you're querying directly from auth
    .select('id')
    .eq('user_name', friendName) // or use 'email' if using auth.users
    .single();
    console.log(JSON.stringify(friendData))
    if (friendLookupError || !friendData) {
        console.error('Friend lookup failed:', friendLookupError);
        return { error: friendLookupError || new Error("User not found") };
    }

    const friendId = friendData.id;
    console.log(JSON.stringify(friendData.id))
    if (friendId === user.id) {
        return { error: new Error("Cannot add yourself as a friend") };
    }
    const { data, error } = await supabase
        .from('friends_list')
        .insert({
            user_id: user.id,
            friend_id: friendId,
            status: 'pending'
        });
    console.log(JSON.stringify(data))
    if (error) {
        console.error('Error inserting friend:', error);
        return { error };
    }else{
        console.log("Friend added!")
    }

    return { data };
};
export const selectFriendsList = async () => {
    const {data: {user}} = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('friends_list')
    .select(`
      friend_id,
      user_profile (
        id,
        user_name
      )
    `)
    .eq('user_id', user.id)
    .eq('status', 'pending'); 

  if (error) {
    console.error('Error retrieving Friends List:', error);
    return { error };
  } else {
    console.log("Friends List Retrieved!");
    console.log(JSON.stringify(data, null, 2));
  }
  const friends = data.map(item => item.user_profile);
  return friends;
 
    // const {data, error} = await supabase
    //     .from('friends_list')
    //     .select('friend_id')
    //     .eq('user_id', user.id)
    //     .eq('status', 'pending');
    
    //     if (error) {
    //         console.error('Error retrieving Friends List:', error);
    //         return { error };
    //     }else{
    //         console.log("Friends List Retrieved!")
    //     }

    // const friendIds = data.map(item=>item.friend_id)
    // console.log(JSON.stringify(friendIds))
    // if(friendIds.length > 0){
    //     const {data:friendData, friendError} = await supabase
    //     .from('user_profile')
    //     .select('id,user_name')
    //     .eq('id', friendIds);  
    //     if (friendError) {
    //         console.error('Error retrieving Friends Names:', friendError);
    //         return { friendError };
    //     }else{
    //         console.log("Friends Names Retrieved!")
    //     }
    
    
    //     // console.log(JSON.stringify(friendData,null,2))
    //     return friendData;
    // }

}
export const selectFriendRequest = async () => {
    const {data: {user}} = await supabase.auth.getUser();
    const {data, error} = await supabase
        .from('friends_list')
        .select()
        .eq('friend_id', user.id);

        if (error) {
            console.error('Error retrieving Friend Requests:', error);
            return { error };
        }else{
            console.log("Friend Request Retrieved!")
        }
        return data;
}