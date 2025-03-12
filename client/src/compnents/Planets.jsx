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
        <div className="info-container">
            <h1 id="name">{planet?.name}</h1>
            <section id="generalInfo">
                <div className="attribute">Climate: {planet?.climate}</div>
                <div className="attribute">Surface Water: {planet?.surface_water}</div>
                <div className="attribute">Diameter: {planet?.diameter}</div>
                <div className="attribute">Rotation Period: {planet?.rotation_period}</div>
                <div className="attribute" >Terrain: {planet?.terrain}</div>
                <div className="attribute">Gravity: {planet?.gravity}</div>
                <div className="attribute">Orbital Period: {planet?.orbital_period}</div>
                <div className="attribute">Population: {planet?.population}</div>
            </section>
            <section id="characters">
                <h2>Characters:</h2>
                <div className="grid-container" >
                    {character?.map(
                        char => <div className="character-tile" key={char.id} onClick={() => navigate(`/characters/${char.id}`)}>{char?.name}</div>
                    )}
                </div>
            </section>
            <section id="films">
                <h2>Planets:</h2>
                <div className="grid-container" >
                    {planetFilms?.map(
                        film => <div className="character-tile" key={film.id} onClick={() => navigate(`/films/${film.id}`)}>{film?.title}</div>
                    )}
                </div> 
            </section>
        </div>
    )
}

export default Planets
