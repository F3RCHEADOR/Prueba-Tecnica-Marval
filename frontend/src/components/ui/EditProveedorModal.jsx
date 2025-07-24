import { useState, useEffect } from "react";
import { updateProveedor } from "../../lib/fetchs";

export default function EditProveedorModal({
  proveedor,
  setOpen,
  open,
  onSave,
}) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    tipo_proveedor: "",
    tipo_persona: "",
    estado: "",
    datos_bancarios: { banco: "", numero_cuenta: "", tipo_cuenta: "" },
    beneficiarios: [],
    nit: "",
  });

  const userInfo = JSON.parse(localStorage.getItem("user"));
  console.log(userInfo.rol);

  useEffect(() => {
    if (proveedor) setForm(proveedor);
  }, [proveedor]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBancoChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      datos_bancarios: { ...prev.datos_bancarios, [name]: value },
    }));
  };

  const handleBeneficiarioChange = (i, e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const beneficiarios = [...prev.beneficiarios];
      beneficiarios[i] = { ...beneficiarios[i], [name]: value };
      return { ...prev, beneficiarios };
    });
  };

  const addBeneficiario = () => {
    setForm((prev) => ({
      ...prev,
      beneficiarios: [...prev.beneficiarios, { nombre: "", cedula: "" }],
    }));
  };

  const removeBeneficiario = (i) => {
    setForm((prev) => {
      const beneficiarios = prev.beneficiarios.filter((_, idx) => idx !== i);
      return { ...prev, beneficiarios };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const actualizado = await updateProveedor(form);
      setForm(actualizado);
      onSave(actualizado); 
    } catch (error) {
      console.error("Error al actualizar el proveedor:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Editar Proveedor</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="border-2 rounded-md focus:scale-105 transform p-1 w-full flex-1"
            />
            <input
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              placeholder="Apellido"
              className="border-2 rounded-md focus:scale-105 transform p-1 w-full flex-1"
            />
          </div>
          <input
            name="cedula"
            value={form.cedula}
            onChange={handleChange}
            placeholder="Cédula"
            className="border-2 rounded-md focus:scale-105 transform p-1  w-full"
          />
          <input
            name="nit"
            value={form.nit}
            onChange={handleChange}
            placeholder="NIT"
            className="border-2 rounded-md focus:scale-105 transform p-1  w-full"
          />
          <div className="flex gap-2">
            <input
              name="tipo_proveedor"
              value={form.tipo_proveedor}
              onChange={handleChange}
              placeholder="Tipo Proveedor"
              className="border-2 rounded-md focus:scale-105 transform p-1 w-full flex-1"
            />
            <input
              name="tipo_persona"
              value={form.tipo_persona}
              onChange={handleChange}
              placeholder="Tipo Persona"
              className="border-2 rounded-md focus:scale-105 transform p-1 w-full flex-1"
            />
          </div>
          {userInfo.rol === "admin" && (
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="border-2 rounded-md focus:scale-105 transform p-1 w-full"
            >
              <option value="">Estado</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          )}
          <div className="border rounded p-3">
            <div className="font-medium mb-2">Datos Bancarios</div>
            <input
              name="banco"
              value={form.datos_bancarios.banco}
              onChange={handleBancoChange}
              placeholder="Banco"
              className="border-2 rounded-md focus:scale-105 transform p-1  w-full mb-2"
            />
            <input
              name="numero_cuenta"
              value={form.datos_bancarios.numero_cuenta}
              onChange={handleBancoChange}
              placeholder="Número de Cuenta"
              className="border-2 rounded-md focus:scale-105 transform p-1 w-full mb-2"
            />
            <input
              name="tipo_cuenta"
              value={form.datos_bancarios.tipo_cuenta}
              onChange={handleBancoChange}
              placeholder="Tipo de Cuenta"
              className="border-2 rounded-md focus:scale-105 transform p-1 w-full"
            />
          </div>
          <div className="border rounded p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Beneficiarios</span>
              <button
                type="button"
                onClick={addBeneficiario}
                className="text-blue-500 hover:underline text-sm"
              >
                + Agregar
              </button>
            </div>
            {form.beneficiarios.map((b, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <input
                  name="nombre"
                  value={b.nombre}
                  onChange={(e) => handleBeneficiarioChange(i, e)}
                  placeholder="Nombre"
                  className="border-2 rounded-md focus:scale-105 transform p-1 w-full flex-1"
                />
                <input
                  name="cedula"
                  value={b.cedula}
                  onChange={(e) => handleBeneficiarioChange(i, e)}
                  placeholder="Cédula"
                  className="border-2 rounded-md focus:scale-105 transform p-1 w-full flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeBeneficiario(i)}
                  className="text-red-400 hover:text-red-600 text-lg"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
