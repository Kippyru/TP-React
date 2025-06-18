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
            
            <a href='/Home' className='logo'>TurboPascal</a>
            
            <nav className='navbar'>
                <a href='/Home'>🏠 Home</a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate("/mundo"); }}>🌎 Mundo</a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate("/local"); }}>🧉 Local</a>
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>🔐 Cerrar Sesión</a>
            </nav>
        </header>
    );
};

export default Home;
