import { useNavigate } from "react-router-dom";

function Home({characters}) {
    const navigate = useNavigate()
    return (
        <div className="characters-flex-container">
            {characters?.map(character =>
                <div  className="character-tile" key={character.id} onClick={() => navigate(`/character/${character.id}`)}>{character.name}</div>
            )}
        </div>
    )
}

export default Home;