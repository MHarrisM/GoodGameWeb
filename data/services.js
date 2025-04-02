import supabase from "./supabase/supabaseClient.js";

export const fetchGames = async () => {
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


export const fetchSingleGame = async (gameID) => {
  const games =await fetchGames();
  return games.find(game => game.id === gameID);

}
