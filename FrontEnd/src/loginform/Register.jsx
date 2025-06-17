import React, { useState } from "react";
import './Register.css';
import { FaUser, FaLock, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";


const RegisterForm = () => {
    const [formData, setFormData] = useState({
        user:'',
        contr:'',
        rcont:''
    })


const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
}


    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Registrate!</h1>
                <div className="input-box">
                    <input type="text" name="user" placeholder="Usuario" onChange={(event) => setFormData({ ...formData, user: event.target.value })} required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" name="contr" placeholder="Contraseña" onChange={(event) => setFormData({...formData, contr: event.target.value})} required />
                    <FaLock className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" name="rcontr" placeholder="Repetir Contraseña" onChange={(event) => setFormData({...formData, rcontr: event.target.value})} required />
                    <FaKey className="icon" />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />Acepto Terminos y Servicios</label >
                    
                </div>

                <button type="submit">Registrarse</button>

                <div className="register-link">
                    <p>Ya tienes cuenta? <a href="/">Inicia Sesion!</a></p>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm