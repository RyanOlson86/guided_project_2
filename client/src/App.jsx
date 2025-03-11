import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Character from './compnents/Character';


function App() {
  const [characters, setCharacters] = useState(null);
  const [films, setFilms] = useState(null)

  const fetchCharacters = async () => {
    const response = await fetch('http://localhost:3000/api/characters');
    const data = await response.json();
    setCharacters(data)
  }

  const fetchFilms = async () => {
    const response = await fetch('http://localhost:3000/api/films');
    const data = await response.json();
    setFilms(data)
  }  

  useEffect(() => {
    fetchCharacters()
    fetchFilms()
  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home characters={characters}/>} />
        <Route exact path="/character/:id" element={<Character films={films}/>} />
      </Routes>
    </Router>
  )
}

export default App
