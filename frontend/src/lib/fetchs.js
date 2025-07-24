import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Obtenemos el usuario autenticado desde localStorage
const userData = JSON.parse(localStorage.getItem("user") || "{}");
const { username, password } = userData;

// Config común de headers
const authHeaders = {
  headers: {
    "Content-Type": "application/json",
    username,
    password,
  },
};

// Obtener todos los proveedores
export const getProveedores = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/proveedores`,
      authHeaders
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.msg || "Error al obtener proveedores"
    );
  }
};

// Obtener todos los proveedores
export const getProveedorExpecifico = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/proveedores/${id}`,
      authHeaders
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.msg || "Error al obtener proveedores"
    );
  }
};

// Obtener todos los proveedores
export const getAllProyects = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/proyectos`,
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.msg || "Error al obtener proyectos"
    );
  }
};


// Crear proveedor
export const createProveedor = async (proveedor) => {
  if (!username || !password) {
    throw new Error("Usuario no autenticado");
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/proveedores`,
      proveedor,
      authHeaders
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error al crear proveedor");
  }
};

// Eliminar proveedor
export const deleteProveedor = async (id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/proveedores/${id}`,
      authHeaders
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error al eliminar proveedor");
  }
};

// Actualizar proveedor
export const updateProveedor = async (data) => {
  try {
    console.log(data);
    const response = await axios.put(
      `${API_BASE_URL}/proveedores/${data._id}`,
      data,
      authHeaders
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.msg || "Error al actualizar proveedor"
    );
  }
};
