import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Character from './compnents/Character';
import Films from './compnents/Films';
import Planets from './compnents/Planets';
import Header from './compnents/Header';


function App() {
  const [characters, setCharacters] = useState(null);
  const [films, setFilms] = useState(null)
  const [planets, setPlanets] = useState(null)

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

  const fetchPlanets = async () => {
    const response = await fetch('http://localhost:3000/api/planets');
    const data = await response.json();
    setPlanets(data)
  } 

  useEffect(() => {
    fetchCharacters()
    fetchFilms()
    fetchPlanets()
  }, [])

  return (
    <Router>
      <Header />
      <hr></hr>
      <Routes>
        <Route exact path="/" element={<Home characters={characters} />} />
        <Route  path="/characters/:id" element={<Character films={films} />} />
        <Route  path="/films/:id" element={<Films characters={characters} planets={planets} />} />
        <Route  path="/planets/:id" element={<Planets films={films}/>} />
      </Routes>
    </Router>
  )
}

export default App
