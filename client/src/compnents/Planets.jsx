import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


function Planets({ films }) {

    const navigate = useNavigate()
    const id = useParams().id

    const [planet, setPlanet] = useState(null)
    const [character, setCharacter] = useState(null)
    const [planetFilms, setPlanetFilms] = useState(null)

    async function fetchPlanet () {
        const response = await fetch(`http://localhost:3000/api/planets/${id}`)
        const data = await response.json()
        setPlanet(data)
    }

    async function fetchCharacter () {
        const response = await fetch(`http://localhost:3000/api/planets/${id}/characters`)
        const data = await response.json()
        console.log(data);
        setCharacter(data)       
    }

    async function fetchFilms() {
        const response = await fetch(`http://localhost:3000/api/planets/${id}/films`)
        const data = await response.json()
        let filteredFilms = [];
        for(let item of data){
            const found = films.find(film => film.id === item.film_id)
            filteredFilms.push(found)
        }
        setPlanetFilms(filteredFilms)
    }

    useEffect(() => {
        fetchPlanet()
        fetchCharacter()
    }, [])

    useEffect (() => {
        if(films) {
            fetchFilms()
        }
    }, [films])

    return (
        <div>
            <h1 id="name">{planet?.name}</h1>
            <section id="generalInfo">
                <p>Climate: <span id="climate">{planet?.climate}</span></p>
                <p>Surface Water: <span id="surface_water">{planet?.surface_water}</span></p>
                <p>Diameter: <span id="diameter">{planet?.diameter}</span></p>
                <p>Rotation Period: <span id="rotation_period">{planet?.rotation_period}</span></p>
                <p>Terrain: <span id="terrain">{planet?.terrain}</span></p>
                <p>Gravity: <span id="gravity">{planet?.gravity}</span></p>
                <p>Orbital Period: <span id="orbital_period">{planet?.orbital_period}</span></p>
                <p>Population: <span id="population">{planet?.population}</span></p>
            </section>
            <section id="characters">
                <h2>Characters:</h2>
                <div className="characters-flex-container">
                    {character?.map(
                        char => <div className="character-tile" key={char.id} onClick={() => navigate(`/characters/${char.id}`)}>{char?.name}</div>
                    )}
                </div>
            </section>
            <section id="films">
                <h2>Planets:</h2>
                <div className="characters-flex-container">
                    {planetFilms?.map(
                        film => <div className="character-tile" key={film.id} onClick={() => navigate(`/films/${film.id}`)}>{film?.title}</div>
                    )}
                </div> 
            </section>
        </div>
    )
}

export default Planets
