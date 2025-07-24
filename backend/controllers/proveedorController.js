import Proveedor from "../models/Proveedor.js";

// Creacion de Proveedor
export const crearProveedor = async (req, res) => {
  try {
    const nuevo = new Proveedor(req.body);
    console.log(req.body);
    console.log(nuevo);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos los Proveedores
export const obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener Proveedor por ID
export const obtenerProveedorPorId = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor)
      return res.status(404).json({ msg: "Proveedor no encontrado" });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar Proveedor Expecifico
export const actualizarProveedor = async (req, res) => {
  try {
    console.log(req.body)
    const actualizado = await Proveedor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar Proveedor Expecifico
export const eliminarProveedor = async (req, res) => {
  try {
    await Proveedor.findByIdAndDelete(req.params.id);
    res.json({ msg: "Proveedor eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Validar proveedor (cambiar estado)
/*export const validarProveedor = async (req, res) => {
  try {
    const { estado } = req.body;
    if (!["Aprobado", "Rechazado"].includes(estado)) {
      return res.status(400).json({ msg: "Estado inválido" });
    }

    const proveedor = await Proveedor.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );

    if (!proveedor)
      return res.status(404).json({ msg: "Proveedor no encontrado" });

    res.json(proveedor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; */
