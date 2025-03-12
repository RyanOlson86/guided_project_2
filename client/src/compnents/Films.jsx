import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function Films({ characters, planets }) {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [planetsInFilm, setPlanetsInFilm] = useState(null);
    const [characterForFilm, setCharactersForFilm] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        fetchFilmById()
    }, [])
    useEffect(() => {
        if(!characters) return;
        fetchCharacterByFilm()
    }, [characters])
    useEffect(() => {
        if(!planets) return;
        fetchPlanetsByFilm()
    }, [planets])

    async function fetchFilmById() {
        try {
            const response = await fetch(`http://localhost:3000/api/films/${id}`);
            const data = await response.json();
            setFilm(data)
        } catch (error) {
            console.error(error)
            console.log('Error fetching film by Id');
        }
    }

    async function fetchCharacterByFilm() {
        try {
            const response = await fetch(`http://localhost:3000/api/films/${id}/characters`);
            const data = await response.json();
            let filteredCharacters = [];
            for (let item of data) {
                const found = characters.find(char => char.id === item.character_id)
                filteredCharacters.push(found)
            }
            setCharactersForFilm(filteredCharacters)
        } catch (error) {
            console.error(error)
            console.log('Error fetching film by Id');
        }
    }

    async function fetchPlanetsByFilm() {
        try {
            const response = await fetch(`http://localhost:3000/api/films/${id}/planets`);
            const data = await response.json();
            let filteredPlanets = [];
            for (let item of data) {
                const found = planets.find(planet => planet.id === item.planet_id)
                filteredPlanets.push(found)
            }
            setPlanetsInFilm(filteredPlanets)
        } catch (error) {
            console.error(error)
            console.log('Error fetching film by Id');
        }
    }



    return (
        <>
            <h1 id="name">{film?.title}</h1>
            <section id="generalInfo">
                <div>Director: {film?.director}</div>
                <div>{`Producer(s): `+ film?.producer}</div>
                <div>Release Date: {film?.release_date}</div>
            </section>
            <section id="planets">
                <h2>Planets</h2>
                <div className="left-flex-container">
                    {planetsInFilm?.map(
                        planet => <div className="character-tile" key={planet.id} onClick={() => navigate(`/planets/${planet.id}`)}>{planet?.name}</div>
                    )}
                </div>
            </section>
            <section id="characters">
                <h2>Characters in Film</h2>
                <div className="left-flex-container">
                    {characterForFilm?.map(
                        char => <div className="character-tile" key={char.id} onClick={() => navigate(`/characters/${char.id}`)}>{char?.name}</div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Films