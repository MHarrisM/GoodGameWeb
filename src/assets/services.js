export const fetchGames = async () => {
    try {
      const response = await fetch('/data/gamesdb.json'); // Relative path from `public/`
      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  };


export const fetchSingleGame = async (gameID) => {
  const games =await fetchGames();
  return games.find(game => game.id === gameID);

  }