import { useState } from "react";
import EditProveedorModal from "./EditProveedorModal";
import { useNavigate } from "react-router-dom";

export default function ProveedorCard({ proveedor: initialProveedor }) {
  const [proveedor, setProveedor] = useState(initialProveedor);
  const navigate = useNavigate();

  const navigateToDetails = (id) => {
    navigate("/details/" + id);
  };

  return (
    <>
      <div className=" shadow-lg rounded-2xl p-6 my-6 max-w-md mx-auto border border-blue-100 hover:shadow-2xl transition-shadow duration-200 group">
        <div className="flex items-center mb-4">
          <div className="bg-blue-200 text-blue-700 rounded-full h-14 w-14 flex items-center justify-center font-bold text-2xl mr-4 shadow group-hover:scale-105 transition-transform duration-200">
            {proveedor.nombre[0]}
          </div>
          <div>
            <h2
              className="text-xl font-semibold cursor-pointer hover:underline hover:text-blue-700 transition-colors duration-150"
              onClick={() => navigateToDetails(proveedor._id)}
              title="Ver detalles"
            >
              {proveedor.nombre} {proveedor.apellido}
            </h2>
            <span className="text-sm text-gray-500">
              {proveedor.tipo_proveedor} - {proveedor.tipo_persona}
            </span>
          </div>
        </div>

        <div className="mb-2">
          <span className="font-medium">Estado:</span>
          <span
            className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold shadow-sm
            ${
              proveedor.estado === "Aprobado"
                ? "bg-green-100 text-green-700"
                : proveedor.estado === "Pendiente"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {proveedor.estado}
          </span>
        </div>
        <div className="mb-2">
          <span className="font-medium">Banco:</span>{" "}
          <span className="text-blue-900">{proveedor.datos_bancarios.banco}</span>
          <br />
          <span className="font-medium">Cuenta:</span>{" "}
          <span className="text-blue-900">
            {proveedor.datos_bancarios.numero_cuenta} (
            {proveedor.datos_bancarios.tipo_cuenta})
          </span>
        </div>

        <div className="flex items-center justify-evenly gap-2 mt-4">
          <button
            onClick={() => navigateToDetails(proveedor._id)}
            className="px-3 py-2 border-2 border-green-200 bg-green-100 text-green-800 rounded-lg w-28 font-semibold shadow hover:bg-green-200 transition-all duration-150 inline-flex items-center justify-center"
          >
            Detalles
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
