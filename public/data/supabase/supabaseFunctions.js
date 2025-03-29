import supabase from "./supabaseClient"
//Should have separate function files?? how to separate??

//games DB
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


//library DB
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
        return data;
    }
};
export const selectGamesFromUserLibrary = async () => {
    const {data: {user}} = await supabase.auth.getUser();
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


//vaults DB
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


//vaults_games DB
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

