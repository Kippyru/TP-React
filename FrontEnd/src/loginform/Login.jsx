import React from "react";
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";


const LoginForm = () => {
    return (
        <div className="wrapper">
            <form actions="">
                <h1>Iniciar Sesion!</h1>
                <div className="input-box">
                    <input type="text" placeholder="Usuario" required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Contraseña" required />
                    <FaLock className="icon" />
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                    <a href="#">Forgot password?</a>
                </div>

                <button type="submit">Login</button>

                <div className="register-link">
                    <p>No tienes cuenta? <a href="/registro">Registrate!</a></p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm