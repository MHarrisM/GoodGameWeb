
import React, { useEffect, useState} from "react"
import { Link } from "react-router-dom";
import "./SearchBar.css";
import { getAllGames } from "/public/data/supabase/supabaseFunctions";
const SearchBar = ({searchTerm, setSearchTerm, onSelect}) => {
    const [isFocused, setisFocused] = useState(false);
    const [games, setGames] = useState([]);
    useEffect(() => {
        getAllGames().then(setGames);
    }, []);
    const filteredGames = games.filter((games) => games.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return(
        <div className="search-container">
            {/* Search Input*/}
            <input className='search-bar'
                type="text"
                placeholder="Search Term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setisFocused(true)}
                onBlur={() => setTimeout(() => setisFocused(false), 200)}
                
            />
            
            {isFocused && searchTerm && filteredGames.length > 0 && (
                
                <div className="search-dropdown">
                    
                    {filteredGames.map((game) => (
                        <div>
                            
                            <div key={game.id}>
                                {onSelect ? (
                                    <p className="search-item" onClick={() => onSelect(game)}>
                                    <img className="search-img" src={game.cover_url} alt={game.name} />
                                    {game.name}
                                </p>
                                ): (
                                    <Link to={`/game/${game.id}`} className="search-item">
                                    <img className="search-img" src={game.cover_url}></img> 
                                    {game.name}
                                    </Link>
                                )}
                                
                                
                            </div>
                        </div>
                        
                        
                        
                    ))}
                </div>

            )}

        </div>
        
    )
}
export default SearchBar;