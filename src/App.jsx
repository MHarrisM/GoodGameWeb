import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Library from './pages/Library'
import Home from './pages/Home'
import Auth from './components/Auth/Auth';
import Profile from './pages/Profile'
import NavBar from "./components/NavBar/NavBar";
import GameInfoPage from "./pages/GameInfoPage";
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    
    <Router>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></NavBar>
      <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/game/:gameId" element={<GameInfoPage />} />
      </Routes>
      
    </Router> 
  );
}

export default App


