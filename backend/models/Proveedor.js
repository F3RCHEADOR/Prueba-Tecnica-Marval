import mongoose from 'mongoose'

const beneficiarioSchema = new mongoose.Schema({
  nombre: String,
  cedula: String
}, { _id: false })

const datosBancariosSchema = new mongoose.Schema({
  banco: String,
  numero_cuenta: String,
  tipo_cuenta: String
}, { _id: false })

const proveedorSchema = new mongoose.Schema({
  nit: { type: String, required: true },
  nombre: String,
  apellido: String,
  cedula: String,
  tipo_proveedor: { type: String, enum: ['Nacional', 'Internacional'] },
  tipo_persona: { type: String, enum: ['Natural', 'Jurídica'] },
  beneficiarios: [beneficiarioSchema],
  datos_bancarios: datosBancariosSchema,
  estado: { type: String, enum: ['Pendiente', 'Aprobado', 'Rechazado'], default: 'Pendiente' }
})

export default mongoose.model('Proveedor', proveedorSchema)
