import { Link } from "react-router-dom"
import "./NavBar.css"
import SearchBar from "/src/components/SearchBar/SearchBar"

const NavBar = ({searchTerm, setSearchTerm}) => {
    return (

        <nav className="navbar">
            <text>Good Game</text>
            <Link className="link-to" to="/">Home</Link>
            <text> | </text>
            <Link className="link-to" to="/library">Library</Link>
            <text> | </text>
            <Link className="link-to" to="/profile">Profile</Link>
            <text> | </text>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}> </SearchBar>
        </nav>   
    )
}

export default NavBar