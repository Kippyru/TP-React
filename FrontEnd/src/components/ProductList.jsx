import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/productos");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/productos/${id}`);
      getProducts(); // refresca la lista
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <div className="container mt-4">
      <Link to="/add" className="button is-primary mb-4">
        Agregar Producto
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.PRICE}</td>
              <td>
                <Link
                  to={`/edit/${product.id}`}
                  className="button is-small is-info mr-2"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="button is-small is-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
