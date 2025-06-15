import Product from "../models/productModel.js";

// Obtener todos los productos
export const getAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por ID
export const getById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo producto
export const create = async (req, res) => {
  try {
    await Product.create(req.body);
    res.json({ message: "Producto creado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto
export const update = async (req, res) => {
  try {
    const result = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (result[0] === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto actualizado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un producto
export const remove = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
