import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom'
import './App.css'
import Home from './Home'

function App() {
  const [characters, setCharacters] = useState(null);
  

  const fetchCharacters = async () => {
    const response = await fetch('http://localhost:3000/api/characters');
    const data = await response.json();
    setCharacters(data)
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home characters={characters}/>} />
      </Routes>
    </Router>
  )
}

export default App
