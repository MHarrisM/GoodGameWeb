import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllGames } from "/src/data/supabase/supabaseFunctions"


const IGDBGames = () => {
  const [games, setGames] = useState([]);


  useEffect(() => {
    getAllGames().then(setGames);
  }, []);

  return (
    <div>
      <h1>IGDB Games</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <h2>{game.name}</h2>
            {/* {game.cover_url && <img src={game.cover_url.replace("t_thumb", "t_cover_big")} alt={game.name} />} */}
            {/* <p>{game.summary || "No summary available"}</p> */}
            {/* <p><strong>Genres:</strong> {game.genres?.map(g => g.name).join(", ")}</p> */}
            {/* <p><strong>Release Date:</strong> {game.release_dates?.[0]?.human}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IGDBGames;
