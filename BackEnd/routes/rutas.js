import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove
} from "../controllers/Productos.js";

const router = express.Router();

// manejo de Rutas 
router.get("/productos", getAll);
router.get("/productos/:id", getById);
router.post("/productos", create);
router.put("/productos/:id", update);
router.delete("/productos/:id", remove);

export default router;
