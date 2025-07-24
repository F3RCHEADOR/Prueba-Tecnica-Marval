import { useState } from "react";
import { getAllProyects } from "../lib/fetchs";

const PAGE_SIZE = 42;

export default function Proyectos() {
  const [pagina, setPagina] = useState(1);
  const [proyectos, setProyectos] = useState([]);

  const fetchProyectos = async () => {
    try {
      const response = await getAllProyects();
  
      setProyectos(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPaginas = Math.ceil(proyectos.length / PAGE_SIZE);
  const proyectosPagina = proyectos.slice(
    (pagina - 1) * PAGE_SIZE,
    pagina * PAGE_SIZE
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow rounded-xl p-6 mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => fetchProyectos()}
        >
          Traer proyectos
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {proyectosPagina.map((proyecto, index) => (
          <div
            key={index}
            className="bg-gray-900 text-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              HC #{(pagina - 1) * PAGE_SIZE + index + 1}
            </h2>
            <p className="text-gray-300 break-all">{proyecto.hc}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          onClick={() => setPagina((p) => Math.max(1, p - 1))}
          disabled={pagina === 1}
        >
          Anterior
        </button>
        <span className="mx-2 text-lg font-semibold">
          Página {pagina} de {totalPaginas}
        </span>
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
          disabled={pagina === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
