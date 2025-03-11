import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'


const Character = ({films}) => {

    const params = useParams()
    const id = params.id

    const [character, setCharacter] = useState(null)
    const [planet, setPlanet] = useState(null)
    const [characterFilms, setCharacterFilms] = useState([])

    useEffect(() => { 
        fetchCharacter(id) 
    }, [])

    useEffect(() => { 
        if(character?.homeworld){
            fetchPlanet(character.homeworld) 
        }
    }, [character])

    useEffect(()=>{
        if(!films) return;
        fetchFilm(id)
    },[films])




    async function fetchCharacter(id) {
        const response = await fetch(`http://localhost:3000/api/characters/${id}`)
        const data = await response.json()
        setCharacter(data)
    }

    async function fetchPlanet(id) {
        const response = await fetch(`http://localhost:3000/api/planets/${id}`)
        const data = await response.json()
        setPlanet(data)
    }

    async function fetchFilm(id) {
        const response = await fetch(`http://localhost:3000/api/characters/${id}/films`)
        const data = await response.json()
        let filteredFilms =[];
        for(let item of data){
            const found = films.find(film => film.id === item.film_id)
            filteredFilms.push(found)
        }
        setCharacterFilms(filteredFilms)
    }

    return (
        <>
            <h1 id="name"></h1>
            <section id="generalInfo">
                <p>Height: <span id="height">{character?.height}</span> cm</p>
                <p>Mass: <span id="mass">{character?.mass}</span> kg</p>
                <p>Born: <span id="birth_year">{character?.birth_year}</span></p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <p><span id="homeworld">{planet?.name}</span></p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <div>
                    {characterFilms?.map(
                        film => <div key={film.id}>{film?.title}</div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Character