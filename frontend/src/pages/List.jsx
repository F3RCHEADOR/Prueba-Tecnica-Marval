import { useEffect, useState } from "react";
import { getProveedores } from "../lib/fetchs.js";
import CardProveedor from "../components/ui/CardProveedor.jsx";

function List() {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const data = await getProveedores();
        setProveedores(data);
      } catch (error) {
        console.error("Error al obtener los proveedores:", error);
      }
    };

    fetchProveedores();
  }, []);

  return (
    <div>
      <h1>Lista de Proveedores</h1>
      {proveedores.length === 0 ? (
        <div>No Hay Proveedores</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {proveedores.map((proveedor) => (
            <CardProveedor key={proveedor.id} proveedor={proveedor} />
          ))}
        </div>
      )}
    </div>
  );
}

export default List;
