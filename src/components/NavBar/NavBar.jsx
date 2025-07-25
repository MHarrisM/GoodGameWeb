import { Link } from "react-router-dom"
import React from "react"
import "./NavBar.css"
import SearchBar from "/src/components/SearchBar/SearchBar"

const NavBar = ({searchTerm, setSearchTerm}) => {
    return (

        <nav className="navbar">
            <img className="logo" src="GoodGameWeb/src/assets/GameImages/GG_Logo_1.0.png" alt="Good Game Logo" />
            <Link className="link-to" to="/Home">Home</Link>
            <p> | </p>
            <Link className="link-to" to="/library">Library</Link>
            <p> | </p>
            <Link className="link-to" to="/profile">Profile</Link>
            <p> | </p>
            <Link className="link-to" to="/login">Login</Link>
            <p> | </p>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}> </SearchBar>
        </nav>   
    )
}

export default NavBar