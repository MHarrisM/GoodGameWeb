import { Link } from "react-router-dom"
import React from "react"
import "./NavBar.css"
import SearchBar from "/src/components/SearchBar/SearchBar"

const NavBar = ({searchTerm, setSearchTerm}) => {
    return (

        <nav className="navbar">
            <p>Good Game</p>
            <Link className="link-to" to="/GoodGameWeb">Home</Link>
            <p> | </p>
            <Link className="link-to" to="/GoodGameWeb/library">Library</Link>
            <p> | </p>
            <Link className="link-to" to="/GoodGameWeb/profile">Profile</Link>
            <p> | </p>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}> </SearchBar>
        </nav>   
    )
}

export default NavBar