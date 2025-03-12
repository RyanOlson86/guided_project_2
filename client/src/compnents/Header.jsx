import { useNavigate } from "react-router-dom"

function Header (){
    const navigate = useNavigate();
    return(
        <h1 style={{cursor: 'pointer', textAlign: 'center'}} onClick={()=> navigate('/')}>Star Wars</h1>
    )
}

export default Header;