import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import proveedorRoutes from "./routes/proveedorRoutes.js";
import proyectosRoutes from "./routes/proyectosRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/proyectos", proyectosRoutes);

// la primera parte sirva mas para railway
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
    );
  })
  .catch((error) => {
    console.error("❌ Error al conectar con MongoDB:", error);
  });
