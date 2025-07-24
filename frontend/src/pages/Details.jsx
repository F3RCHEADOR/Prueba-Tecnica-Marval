import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProveedorExpecifico } from "../lib/fetchs";
import { deleteProveedor } from "../lib/fetchs";
import EditProveedorModal from "../components/ui/EditProveedorModal";

export default function Details() {
  const [proveedor, setProveedor] = useState(null);
  const [open, setOpen] = useState(false);
  const onSave = (actualizado) => {
    setProveedor(actualizado);
    setOpen(false);
  };
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProveedorDetails = async () => {
      try {
        const data = await getProveedorExpecifico(id);
        setProveedor(data);
        console.log("Detalles del proveedor:", data);
      } catch (error) {
        console.error("Error al obtener los detalles del proveedor:", error);
      }
    };

    fetchProveedorDetails();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar este proveedor?")) {
      try {
        await deleteProveedor(id);
        alert("Proveedor eliminado exitosamente");
        navigate("/");
      } catch (error) {
        console.error("Error al eliminar el proveedor:", error);
        alert("Error al eliminar el proveedor");
      }
    }
  };

  if (!proveedor) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-600">Cargando detalles...</span>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Detalles del Proveedor
        </h1>
        <article className="flex flex-col md:flex-row items-center gap-8">
          <img
            src="/images/proveedor-de-ayuda.png"
            alt="imagen-proveedor"
            className="aspect-square object-cover object-center p-4 rounded-lg w-48 h-48 "
          />
          <section className="flex-1">
            <h2 className="text-2xl font-bold mb-4">
              Información del Proveedor
            </h2>
            <ul className="px-1  list-disc">
              <li>
                <span className="font-semibold">Nombre:</span>{" "}
                {proveedor.nombre} {proveedor.apellido}
              </li>
              <li>
                <span className="font-semibold">NIT:</span> {proveedor.nit}
              </li>
              <li>
                <span className="font-semibold">Cédula:</span>{" "}
                {proveedor.cedula}
              </li>
              <li>
                <span className="font-semibold">Tipo de Proveedor:</span>{" "}
                {proveedor.tipo_proveedor}
              </li>
              <li>
                <span className="font-semibold">Tipo de Persona:</span>{" "}
                {proveedor.tipo_persona}
              </li>
              <li>
                <span className="font-semibold">Estado:</span>{" "}
                <span
                  className={
                    proveedor.estado === "Aprobado"
                      ? "bg-green-100 text-green-700 px-2 py-1 rounded"
                      : proveedor.estado === "Pendiente"
                      ? "bg-yellow-100 text-yellow-700 px-2 py-1 rounded"
                      : "bg-red-100 text-red-700 px-2 py-1 rounded"
                  }
                >
                  {proveedor.estado}
                </span>
              </li>
            </ul>

            <div className="mt-4">
              <h3 className="font-semibold">Datos Bancarios</h3>
              <ul className="list-disc list-inside">
                <li>
                  <span className="font-semibold">Banco:</span>{" "}
                  <span className="uppercase">
                    {proveedor.datos_bancarios.banco}
                  </span>
                </li>
                <li>
                  <span className="font-semibold">Número de Cuenta:</span>{" "}
                  {proveedor.datos_bancarios.numero_cuenta} (
                  {proveedor.datos_bancarios.tipo_cuenta})
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Beneficiarios</h3>
              <ul className="list-disc list-inside">
                {proveedor.beneficiarios?.map((b, i) => (
                  <li key={i}>
                    {b.nombre} - {b.cedula}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>
        <div className="flex items-center justify-evenly gap-4 mt-4">
          <button
            onClick={() => setOpen(true)}
            className="border-2 p-2 w-24 text-md font-bold hover:cursor-pointer hover:scale-105 my-2.5 rounded-md "
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(proveedor._id)}
            className="border-2 p-2 w-24 text-md font-bold hover:cursor-pointer hover:scale-105 my-2.5 rounded-md "
          >
            Eliminar{" "}
          </button>
        </div>
      </div>

      {open && (
        <EditProveedorModal
          open={open}
          setOpen={setOpen}
          proveedor={proveedor}
          onSave={onSave}
        />
      )}
    </>
  );
}
