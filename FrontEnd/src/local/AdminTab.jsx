import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './AdminTab.css';

const AdminTab = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (rol !== "admin") {
      alert("Acceso denegado. No sos administrador.");
      navigate("/Home");
    }
  }, []);
  

  const [datos, setDatos] = useState([]);
  const [form, setForm] = useState({
    ID_COD: '',
    Localidad: '',
    Pais: '',
    Region: '',
    Habitantes: '',
    Idiomas: ''
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    fetchDatos();
  }, []);

  const fetchDatos = async () => {
    const res = await fetch("http://localhost:3000/products/productos");
    const data = await res.json();
    setDatos(data);
  };

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = modoEdicion
      ? `http://localhost:3000/products/productos/${idEditar}`
      : "http://localhost:3000/products/productos";

    const method = modoEdicion ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message || "Operación realizada");

    setForm({
      ID_COD: '',
      Localidad: '',
      Pais: '',
      Region: '',
      Habitantes: '',
      Idiomas: ''
    });
    setModoEdicion(false);
    setIdEditar(null);
    fetchDatos();
  };

  const handleEdit = (dato) => {
    setForm(dato);
    setModoEdicion(true);
    setIdEditar(dato.id); // asegurate de que Sequelize devuelve `.id`
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Seguro que querés eliminar este registro?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:3000/products/productos/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    alert(data.message);
    fetchDatos();
  };

  return (
    <div className="admin-container">
      <h2>Gestión de Localidades</h2>

      <form onSubmit={handleSubmit} className="form-admin">
        <input name="ID_COD" placeholder="ID_COD" value={form.ID_COD} onChange={handleChange} required />
        <input name="Localidad" placeholder="Localidad" value={form.Localidad} onChange={handleChange} required />
        <input name="Pais" placeholder="País" value={form.Pais} onChange={handleChange} required />
        <input name="Region" placeholder="Región" value={form.Region} onChange={handleChange} />
        <input name="Habitantes" placeholder="Habitantes" value={form.Habitantes} onChange={handleChange} />
        <input name="Idiomas" placeholder="Idiomas" value={form.Idiomas} onChange={handleChange} />
        <button type="submit">{modoEdicion ? "Actualizar" : "Agregar"}</button>
      </form>

      <table className="tabla-admin">
        <thead>
          <tr>
            <th>ID_COD</th>
            <th>Localidad</th>
            <th>País</th>
            <th>Región</th>
            <th>Habitantes</th>
            <th>Idiomas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item.id}>
              <td>{item.ID_COD}</td>
              <td>{item.Localidad}</td>
              <td>{item.Pais}</td>
              <td>{item.Region}</td>
              <td>{item.Habitantes}</td>
              <td>{item.Idiomas}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Editar</button>
                <button onClick={() => handleDelete(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTab;
