import express from "express";
import { obtenerProtectosExternos } from "../controllers/proyectosController.js";

const router = express.Router();


//Ruta para obtener proyectos de marval de la api protegida
router.get('/', obtenerProtectosExternos)

export default router