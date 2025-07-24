import { useState } from "react";
import { createProveedor } from "../lib/fetchs";
import { useNavigate } from "react-router-dom";

function FormPage() {
  const [form, setForm] = useState({
    nit: "",
    nombre: "",
    apellido: "",
    cedula: "",
    tipo_proveedor: "Nacional",
    tipo_persona: "Natural",
    beneficiarios: [{ nombre: "", cedula: "" }],
    datos_bancarios: { banco: "", numero_cuenta: "", tipo_cuenta: "" },
    estado: "Pendiente",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBeneficiarioChange = (idx, e) => {
    const beneficiarios = [...form.beneficiarios];
    beneficiarios[idx][e.target.name] = e.target.value;
    setForm({ ...form, beneficiarios });
  };

  const addBeneficiario = () => {
    setForm({
      ...form,
      beneficiarios: [...form.beneficiarios, { nombre: "", cedula: "" }],
    });
  };

  const handleDatosBancariosChange = (e) => {
    setForm({
      ...form,
      datos_bancarios: {
        ...form.datos_bancarios,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createProveedor(form);
      console.log("Proveedor creado:", result);
      alert("Proveedor creado exitosamente.");
      navigate("/");
    } catch (error) {
      console.error("Error al crear proveedor:", error);
      alert("Error al enviar el formulario.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-gradient-to-br shadow-lg rounded-2xl p-8 mt-10 border border-blue-200"
    >
      <h2 className="text-2xl font-bold mb-8 text-center text-blue-700">
        Crear Proveedor
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 text-blue-700 font-medium">NIT:</label>
          <input
            name="nit"
            value={form.nit}
            onChange={handleChange}
            required
            className="w-full border border-blue-200 bg-white text-blue-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-150"
          />
        </div>
        <div>
          <label className="block mb-1 text-blue-700 font-medium">Nombre:</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border border-blue-200 bg-white text-blue-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-150"
          />
        </div>
        <div>
          <label className="block mb-1 text-blue-700 font-medium">Apellido:</label>
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            className="w-full border border-blue-200 bg-white text-blue-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-150"
          />
        </div>
        <div>
          <label className="block mb-1 text-blue-700 font-medium">Cédula:</label>
          <input
            name="cedula"
            value={form.cedula}
            onChange={handleChange}
            className="w-full border border-blue-200 bg-white text-blue-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-150"
          />
        </div>
        <div>
          <label className="block mb-1 text-blue-700 font-medium">Tipo de proveedor:</label>
          <select
            name="tipo_proveedor"
            value={form.tipo_proveedor}
            onChange={handleChange}
            className="w-full border border-blue-200 bg-white text-blue-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-150"
          >
            <option value="Nacional">Nacional</option>
            <option value="Internacional">Internacional</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-blue-700 font-medium">Tipo de persona:</label>
          <select
            name="tipo_persona"
            value={form.tipo_persona}
            onChange={handleChange}
            className="w-full border border-blue-200 bg-white text-blue-900 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-150"
          >
            <option value="Natural">Natural</option>
            <option value="Jurídica">Jurídica</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 text-purple-700 font-medium">Beneficiarios:</label>
          {form.beneficiarios.map((b, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                name="nombre"
                placeholder="Nombre"
                value={b.nombre}
                onChange={(e) => handleBeneficiarioChange(idx, e)}
                className="border border-purple-200 bg-white text-purple-900 rounded px-2 py-1 w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all duration-150"
              />
              <input
                name="cedula"
                placeholder="Cédula"
                value={b.cedula}
                onChange={(e) => handleBeneficiarioChange(idx, e)}
                className="border border-purple-200 bg-white text-purple-900 rounded px-2 py-1 w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all duration-150"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addBeneficiario}
            className="text-purple-600 hover:text-purple-800 underline text-sm transition-all duration-150"
          >
            + Agregar beneficiario
          </button>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 text-green-700 font-medium">Datos bancarios:</label>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              name="banco"
              placeholder="Banco"
              value={form.datos_bancarios.banco}
              onChange={handleDatosBancariosChange}
              className="border border-green-200 bg-white text-green-900 rounded px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-all duration-150"
            />
            <input
              name="numero_cuenta"
              placeholder="Número de cuenta"
              value={form.datos_bancarios.numero_cuenta}
              onChange={handleDatosBancariosChange}
              className="border border-green-200 bg-white text-green-900 rounded px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-all duration-150"
            />
            <input
              name="tipo_cuenta"
              placeholder="Tipo de cuenta"
              value={form.datos_bancarios.tipo_cuenta}
              onChange={handleDatosBancariosChange}
              className="border border-green-200 bg-white text-green-900 rounded px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-all duration-150"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full  text-blue-900 font-bold px-6 py-3 rounded-xl shadow hover:cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 mt-8"
      >
        Enviar
      </button>
    </form>
  );
}

export default FormPage;
