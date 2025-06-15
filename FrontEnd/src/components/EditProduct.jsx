import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/productos/${id}`);
      setTitle(response.data.title);
      setPrice(response.data.PRICE || response.data.price); // Asegura compatibilidad con el backend
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    if (!title || !price) {
      alert("Por favor completá todos los campos.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/productos/${id}`, {
        title,
        PRICE: price, // asegurate que sea 'PRICE' si tu backend así lo espera
      });

      navigate("/");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={updateProduct}>
        <div className="field">
          <label className="label">Título</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Precio</label>
          <div className="control">
            <input
              className="input"
              type="number"
              placeholder="Precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-primary">Actualizar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
