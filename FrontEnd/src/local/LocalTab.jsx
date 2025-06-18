import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LocalTab.css";

const LocalTab = () => {
  const [localidades, setLocalidades] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [esAdmin, setEsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (rol === "admin") setEsAdmin(true);

    fetch("http://localhost:3000/products/productos")
      .then((res) => res.json())
      .then((data) => setLocalidades(data))
      .catch((err) => console.error("Error al obtener datos:", err));
  }, []);

  const localidadesFiltradas = localidades.filter((loc) => {
    const valor = filtro.toLowerCase();
    return (
      loc.Localidad?.toLowerCase().includes(valor) ||
      loc.Pais?.toLowerCase().includes(valor) ||
      loc.Region?.toLowerCase().includes(valor)
    );
  });

  return (
    <div className="localtab-container">
      <div className="localtab-header">
        <h2>Localidades Registradas</h2>
        {esAdmin && (
          <button className="admin-btn" onClick={() => navigate("/admin")}>
            ➕ Administrar
          </button>
        )}
      </div>

      <div className="filtro-container">
        <input
          type="text"
          placeholder="Filtrar por localidad, país o región"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="filtro-input"
        />
      </div>

      <div className="card-grid">
        {localidadesFiltradas.map((loc) => (
          <div key={loc.id} className="local-card">
            <h3>{loc.Localidad}</h3>
            <p><strong>País:</strong> {loc.Pais}</p>
            <p><strong>Región:</strong> {loc.Region}</p>
            <p><strong>Habitantes:</strong> {loc.Habitantes}</p>
            <p><strong>Idiomas:</strong> {loc.Idiomas}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalTab;