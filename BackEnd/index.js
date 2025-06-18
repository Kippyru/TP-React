import express from "express";
import dbOptions from "./config/dbconfig.js";
import router from "./routes/rutas.js";
import cors from "cors";
import Product from "./models/productModel.js";
import loginRoutes from "./login/loginRoutes.js";

const app = express();
const PORT = 3000;

// Conexión a la base de datos

  try {
    await dbOptions.authenticate();
    console.log("Database connected..."); 
  } catch (error) {
    console.error("Connection error:", error);
  }
 
 
//connectDB();
await Product.sync();
// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/products", router);

app.use("/", loginRoutes);  // Rutas de login/register

// Iniciar servidor
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
