import supabase from "./supabaseClient"

export const getAllGames = async () => {
    try {
      const { data, error } = await supabase
        .from('games')
        .select();
        
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
};
export const getGameById = async (gameID) => {
    const games =await getAllGames();
    return games.find(game => game.id === gameID);
  
};
export const getUserLibrary = async () => {
    const {data: {user}} = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('library')
    .select('game_id')
    .eq('user_id', user.id)

    if (error){
        console.error("Couldn't get games from library")
    }else{
        console.error("Games retrieved!")
    }
    const gameIDs = data.map(item=>item.game_id)
    const {data: gamesData, error: gamesError} = await supabase
        .from('games')
        .select()
        .in('id',gameIDs)
    return gamesData;

};
export const addGameToUserLibrary = async (game_id, user_rating) => {
    const {data: {user}} = await supabase.auth.getUser();
    console.log(`${user.id}`)
    const { data, error } = await supabase
        .from('library')
        .insert(
            {user_id: user.id, game_id: game_id, user_rating: user_rating}
        );
        if (error){
            console.error("Couldn't add game to library")
        }else{
            console.error("Game Added!")
        }

};
export const deleteGameFromUserLibrary = async () => {};

export const getLibGameById = async () => {};//TODO
export const getVaults = async () => {
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
    console.log(JSON.stringify(data, null, 2));
    return data;

};
export const getVaultGames = async() => {};//TODO
