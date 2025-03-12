import { useNavigate } from "react-router-dom";

function Home({characters}) {
    const navigate = useNavigate()
    return (
        <>
        <h1>Choose a Character</h1>
        <div className="characters-flex-container">
            {characters?.map(character =>
                <div  className="character-tile" key={character.id} onClick={() => navigate(`/characters/${character.id}`)}>{character.name}</div>
            )}
        </div>
        </>
    )
}

export default Home;