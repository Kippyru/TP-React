import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      if (!title || !price) {
        alert("Completa todos los campos.");
        return;
      }

      await axios.post("http://localhost:3000/productos", {
        title,
        PRICE: price, // Verifica si es PRICE o price según lo espera tu backend
      });

      navigate("/");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={saveProduct}>
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
            <button className="button is-primary">Guardar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
