import express from 'express'
import {
  crearProveedor,
  obtenerProveedores,
  obtenerProveedorPorId,
  actualizarProveedor,
  eliminarProveedor,
  
} from '../controllers/proveedorController.js'

import { verificarUsuario } from '../middleware/authMiddleware.js'

const router = express.Router()


//Ruta del endpoint
router.post('/', verificarUsuario, crearProveedor)

//Ruta del endpoint
router.get('/', verificarUsuario, obtenerProveedores)

//Ruta del endpoint
router.get('/:id', verificarUsuario, obtenerProveedorPorId)

//Ruta del endpoint
router.put('/:id', verificarUsuario, actualizarProveedor)

//Ruta del endpoint
router.delete('/:id', verificarUsuario, eliminarProveedor)

//Ruta del endpoint
/*
router.put('/:id/validar', verificarAdmin, validarProveedor)
*/


export default router
