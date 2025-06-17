import React, { useState } from "react";
import './Register.css';
import { FaUser, FaLock, FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const RegisterForm = () => {
    const [formData, setFormData] = useState({
        user:'',
        contr:'',
        rcont:''
    })

    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    const [valid, setValid] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();
        let isvalid = true;
        let validationErrors = {}
        if(formData.user === "" || formData.user === null){
            isvalid = false;
            validationErrors.user = "Se requiere un usuario"
        }
        if(formData.contr === "" || formData.contr === null){
            isvalid = false;
            validationErrors.contr = "Se requiere una contraseña"
        }
        if(formData.rcont !== formData.contr){
            isvalid = false;
            validationErrors.rcont = "Las contraseñas no son iguales"
        }

        setErrors(validationErrors)
        setValid(isvalid)

        if (Object.keys(validationErrors).length === 0) {
        fetch("http://localhost:3000/register", {
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
                alert("Se ha registrado con éxito!");
                // opcional: limpiar form
                //setFormData({ user: "", contr: "", rcont: "" });
                navigate('/');
            } else {
                alert(data.message || "Error al registrar usuario");
            }
        })
        .catch(err => {
            console.error(err);
            alert("Error al conectar con el servidor");
        });
    }


    }


    return (
        <div className="wrapper">  
            <form onSubmit={handleSubmit}>
                <h1>Registrate!</h1>
                {
                    valid ? <></> :
                    <span className="text-danger">
                        {errors.user} {errors.contr} {errors.rcont}
                    </span>
                }
                <div className="input-box">
                    <input type="text" name="user" placeholder="Usuario" onChange={(event) => setFormData({ ...formData, user: event.target.value })} required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" name="contr" placeholder="Contraseña" onChange={(event) => setFormData({...formData, contr: event.target.value})} required />
                    <FaLock className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" name="rcont" placeholder="Repetir Contraseña" onChange={(event) => setFormData({...formData, rcont: event.target.value})} required />
                    <FaKey className="icon" />
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