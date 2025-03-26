import express from "express";
import axios from "axios";
import cors from "cors";
import fs from "fs";
import path from "path";
import supabase from "./src/supabaseClient.js";



const app = express();
const PORT = 5000;
const TWITCH_CLOUD_ID = '6vtspaf98lx532egnt6r1r5zy99ii7';
const TWITCH_SECRET = 'bhch53q25kdq1w61d8fd2prt20ajhl';
const CLIENT_ID = TWITCH_CLOUD_ID;
const CLIENT_SECRET = TWITCH_SECRET;
//const GAME_FILE = path.join(process.cwd(), "GoodGame/GoodGameWeb/public/data/gamesdb.json");


// if (!fs.existsSync(GAME_FILE)){
//   fs.writeFileSync(GAME_FILE, "[]");
// }

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const getAccessToken = async () => {
  const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;
  try {
    const response = await axios.post(tokenUrl);
    console.log('Access Token:', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    return null;
  }
};
const fetchGamesFromIGDB = async (gameNames = []) => {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const headers = {
    'Client-ID': CLIENT_ID,
    'Authorization': `Bearer ${accessToken}`,
 
  };

  const IGDB_API_URL = 'https://api.igdb.com/v4/games';
  let query = `
  fields name, cover, genres,summary;
  limit 500;
  offset 50 ;
  `;
  

  if(gameNames.length > 0 ){
    const formattedNames = gameNames
      .map(name=> `"${name}"`)
      .join(",")
      query += `where name = (${formattedNames});`;
  }
  try{
    const gamesResponse = await axios.post(IGDB_API_URL, query, { headers});
    const games = gamesResponse.data;
    const coverIds = games.map(game => game.cover).filter(id => id);
    const genreIds = [...new Set(games.flatMap(game => game.genres || []))];

    let covers = {};
    if (coverIds.length > 0) {
      const coversQuery = `fields url; where (id = (${coverIds.join(",")}) & url != null) ;`;
      const coversResponse = await axios.post('https://api.igdb.com/v4/covers', coversQuery, { headers });
      covers = Object.fromEntries(coversResponse.data.map(cover => [cover.id, cover.url ? cover.url.replace("t_thumb", "t_cover_big") : null]));

    }

    let genres = {};
    if (genreIds.length > 0) {
      const genresQuery = `fields name; where id = (${genreIds.join(",")});`;
      const genresResponse = await axios.post('https://api.igdb.com/v4/genres', genresQuery, { headers });
      genres = Object.fromEntries(genresResponse.data.map(genre => [genre.id, genre.name]));
    }

    const comepleteGame = games.map(game => ({
      id: game.id,
      name: game.name,
      cover_url: covers[game.cover] ? `https:${covers[game.cover]}`: null,
      genres: game.genres? game.genres.map(id => genres[id]).filter(Boolean): [],
      // releaseDate: game.release_dates?.[0]?.human || "Unkown",
      summary: game.summary || "No summary available."
    })).filter(game=> game.cover_url != null);

    // fs.writeFileSync(GAME_FILE, JSON.stringify(comepleteGame,null,2));
    await insertGamestoSB(comepleteGame);
    return comepleteGame;
  } catch (error){
    console.error('Error fetching IGDB games:', error);
    return null;
  }
}
const insertGamestoSB = async (games) => {
  try {
    const { data, error } = await supabase
      .from('games')
      .upsert(games, {onConflict: 'id'});

      if(error) {
       throw new Error(error.message);
      }else{
        console.log("Games inserted successfully:", data);
      }
  } catch (error){
    console.error("Unexpected error inserting games:", error);
  }
};



app.get('/games', async (req, res) => {
  const {names} = req.query;
  const gameNames = names ? names.split(",").map(name=>name.trim()) :[];
  
  console.log(`Fetching games: ${gameNames.length ? `with names: ${gameNames.join(",")}`: ''}`);
  try {
    let fetchedGames = await fetchGamesFromIGDB(gameNames);
    // if (fs.existsSync(GAME_FILE)){
    //   const gamesData = JSON.parse(fs.readFileSync(GAME_FILE, "utf8"));

    // }
      if (!fetchedGames) return res.status(500).json({error:"Failed to fetch games"});
      res.json(fetchedGames);
    
  } catch (error) {
    console.error('Error fetching IGDB games:', error);
    res.status(500).json({ error: 'Error Reading stored games' });
  }
});
setInterval(fetchGamesFromIGDB, 24 * 60 * 60 * 1000);
app.listen(PORT, () => {
  console.log(`Server isss running on port ${PORT}`);
});
