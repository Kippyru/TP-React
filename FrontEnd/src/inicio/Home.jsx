import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("loggedIn");
        navigate("/");
    };

    return (
        <header className='header'>
            
            <a href='/Home' className='logo'>Logo</a>
            
            <nav className='navbar'>
                <a href='/Home'>🏠 Home</a>
                <a href='/'>Mundo</a>
                <a href='/'>Local</a>
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Cerrar Sesión</a>
            </nav>
        </header>
    );
};

export default Home;
