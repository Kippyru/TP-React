import React, { useState } from "react";
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        user: '',
        contr: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate(); // <-- Agregamos esto

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.user.trim() === '' || formData.contr.trim() === '') {
            setError("Completa ambos campos");
            return;
        }

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: formData.user,
                password: formData.contr
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Inicio de sesión exitoso!");
                localStorage.setItem("loggedIn", "true");
                navigate('/Home'); // ⬅️ Redirección al login exitoso
            } else {
                setError("Usuario o contraseña incorrectos");
            }
        })
        .catch(err => {
            console.error(err);
            setError("Error al conectar con el servidor");
        });
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Iniciar Sesion!</h1>
                <div className="input-box">
                    <input type="text" name="user" placeholder="Usuario" onChange={(event) => setFormData({ ...formData, user: event.target.value })} required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" name="contr" placeholder="Contraseña" onChange={(event) => setFormData({...formData, contr: event.target.value})} required />
                    <FaLock className="icon" />
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
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